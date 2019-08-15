import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

const ChatRoom = () => {
    const [chatConnection, setChatConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [user, setUser] = useState('');

    const sendMessage = () => {
        chatConnection.invoke('SendMessage', user, currentMessage);
        setCurrentMessage('');
    };

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:8888/api/teste/chat-hub')
            .build()

        connection.on('ReceiveMessage', (user, message) => {
            setMessages(m => [...m, { user, message }]);
        });

        connection.start();

        setChatConnection(connection);
    }, []);

    return (
        <div>
            <div>
                <label htmlFor="user">User:</label>
                <input name="user" value={user} onChange={({ target }) => setUser(target.value)} />
                <br />
                <label htmlFor="message">Message:</label>
                <textarea name="message" value={currentMessage} onChange={(({ target }) => setCurrentMessage(target.value))} />
                <br />
                <button onClick={sendMessage}>Enviar</button>
            </div>
            <div>
                {messages.map(({ user, message }, idx) => <div key={idx}>{`${user}: ${message}`}</div>)}
            </div>
        </div>
    );
}

export default ChatRoom;