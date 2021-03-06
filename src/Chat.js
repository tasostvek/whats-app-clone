import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import {useEffect,useState} from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachedFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import { useParams } from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(
                    (doc) => 
                        doc.data()
                    )
                )
            ))
        }
    }, [roomId])

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    }

    return (
        <div className = "chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}/>

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p> Last seen {" "}
                        { new Date(
                            messages[messages.length - 1]
                            ?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachedFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat_body">
                {messages.map(message=> (
                    <div key={Math.floor(Math.random() * 1000000)}>
                        <p 
                            className={`chat_message ${message.name===user.displayName &&  'chat_reciever'}`}
                        > 
                            <span className="chat_name"> 
                                {message.name}
                            </span>
                            {message.message}
                            <span className="chat_timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} 
                        onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"
                    />
                    <button 
                        onClick={sendMessage} type="submit">
                            Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
