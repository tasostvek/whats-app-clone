import React from 'react'
import "./SidebarChat.css";
import { Avatar } from '@material-ui/core';
import {useEffect,useState} from "react";

function SidebarChat({addNewChat}) {
    const [seed, setSeed] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName){
            //
        }
    };
    
    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>Last message...</p>
            </div>
        </div>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
