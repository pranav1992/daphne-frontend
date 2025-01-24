import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const Chat = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatSocket = useRef(null)
    const dispatch = useDispatch();
    const { connected } = useSelector((state) => state.socket);

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NDkzNDg3LCJpYXQiOjE3Mzc0ODYyODcsImp0aSI6IjIwNDQ1N2M5NThlNzQwMDg4Y2RjM2U3ZGNiYjBiMTRkIiwidXNlcl9pZCI6MX0.Hz6K8CRtHFxcA0TOVCkLYdbRvitppKsNW6gj3uc8Vlk"
        // chatSocket.current = new WebSocket(
        //     `ws://127.0.0.1:8000/ws/socket-server/general/?token=${token}`
        // )
        dispatch({ type: "websocket/connect", payload: `ws://127.0.0.1:8000/ws/socket-server/general/?token=${token}`});
  
        // chatSocket.current.onmessage = (e) => {
        //     console.log(e.data)
        //     const data = JSON.parse(e.data);
        //     setMessages((prevMessages) => [...prevMessages, data.message]);
        // };
        // return () => chatSocket.close();
    }, [chatSocket]);
    const sendMessage = () => {
        // chatSocket.current.send(JSON.stringify({ message }));
        setMessage('');
    };
    return (
        <div>
            <h2>Room: {roomName}</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
export default Chat;
