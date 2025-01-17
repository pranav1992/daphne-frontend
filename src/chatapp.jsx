import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatSocket = useRef(null)
    // const chatSocket = new WebSocket(
    //     'ws://' + '127.0.0.1:8000' + '/ws/chat/' + roomName + '/'
    // );

    useEffect(() => {
        chatSocket.current = new WebSocket(
            'ws://127.0.0.1:8000/ws/socket-server/general/'
        )
        chatSocket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        // return () => chatSocket.close();
    }, [chatSocket]);

    const sendMessage = () => {
        chatSocket.current.send(JSON.stringify({ message }));
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
