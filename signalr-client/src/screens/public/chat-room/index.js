import { HubConnectionBuilder } from '@aspnet/signalr';
import React, { useEffect, useState } from 'react';

const ChatRoom = () => {
    const [chatConnection, setChatConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [user, setUser] = useState('');
    const [isHubConnected, setIsHubConnected] = useState(false);
    const [connectTries, setConnectTries] = useState(0);

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

        connection.onclose(() => {
            setIsHubConnected(false);
            setConnectTries(connectTries + 1);
        });

        connection.start()
            .then(() => setIsHubConnected(true))
            .catch(() => {
                setIsHubConnected(false);
                setTimeout(() => setConnectTries(connectTries + 1), 2000);
                console.log(connectTries);
            });


        setChatConnection(connection);
    }, [connectTries]);

    return (
        <div>
            <div>
                <label htmlFor="user">User:</label>
                <input name="user" value={user} onChange={({ target }) => setUser(target.value)} />
                <br />
                <label htmlFor="message">Message:</label>
                <textarea name="message" value={currentMessage} onChange={(({ target }) => setCurrentMessage(target.value))} />
                <br />
                <button onClick={sendMessage} disabled={!isHubConnected}>Enviar</button>
            </div>
            <div>
                {messages.map(({ user, message }, idx) => <div key={idx}>{`${user}: ${message}`}</div>)}
            </div>
        </div>
    );
}

export default ChatRoom;