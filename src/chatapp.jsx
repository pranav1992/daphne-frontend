import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatSocket = useRef(null)
    // const chatSocket = new WebSocket(
    //     'ws://' + '127.0.0.1:8000' + '/ws/chat/' + roomName + '/'
    // );

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NDQ2NjczLCJpYXQiOjE3Mzc0Mzk0NzMsImp0aSI6ImE1ZThkOGQ5MTVmNDRjODc5OWRlNzI2NmM1ZjA5YjVmIiwidXNlcl9pZCI6MX0.3TtwGUQ9hDJS0ydPMBvPhn32wT6wj4KnJZWNcMq7th8"
        chatSocket.current = new WebSocket(
            `ws://127.0.0.1:8000/ws/socket-server/general/?token=${token}`
        )
        chatSocket.current.onmessage = (e) => {
            console.log(e.data)
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
