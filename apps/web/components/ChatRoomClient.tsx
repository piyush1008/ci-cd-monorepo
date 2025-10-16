"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";


export function ChatRoomClient({
    messages,
    id
}:{
    messages:{messages:string}[];
    id:string
}){
    const {socket, loading}=useSocket();
    const [chats, setChats]=useState(messages)
    const [currentMessage, setCurrentMessage]=useState("")



    useEffect(()=>{
        if(socket && !loading)
        {

            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id

            }))
            socket.onmessage=(event)=>{
                const parseData=JSON.parse(event.data);
                if(parseData.type==='chat')
                {

                    setChats(c => [...c, parseData.chatmessage])
                }

            }
        }
    },[socket,loading,id])

    return(
        <div>
             

             <input type="text" value={currentMessage} onChange={e =>{
                setCurrentMessage(e.target.value)
             }} />
             <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:"chat",
                    roomId:id,
                    messages:currentMessage
                }))

                setCurrentMessage("")
             }}>Send Message </button>
        </div>
    )
}