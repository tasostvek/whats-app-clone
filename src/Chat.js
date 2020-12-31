import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import {useEffect,useState} from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachedFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"

function Chat() {
    const[input, setInput] = useState("");
    const[seed,setSeed] = useState("");

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);
        setInput("");
    }

    return (
        <div className = "chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
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
                <p className={`chat_message ${false &&  'chat_reciever'}`}> 
                    <span className="chat_name"> Tasos Tzivekis</span>
                    Hey guys
                    <span className="chat_timestamp">3:52 PM</span>
                 </p>
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
