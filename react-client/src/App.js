import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const connection = useRef();

  useEffect(() => {
    connection.current = new HubConnectionBuilder()
      .withUrl("http://localhost:5268/chathub")
      .withAutomaticReconnect()
      .build();

    connection.current
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to hub:", err));

    connection.current.on("ReceiveMessage", (message) => {
      setData((prev) => [...prev, message]);
    });

    connection.current.on("ServerMessage", (message) => {     
      console.log('Received message from Server:', message);
    });

    return () => {
      connection.current.off("ReceiveMessage");
      connection.current.off("ServerMessage");
    };
  }, []);


  const sendChatHandler = () => {
      connection.current.invoke("SendMessage", text);
  }

  const fetchChatHistoryHandler = () => {
    async function fetchHistory() {
      const response = await fetch('http://localhost:5268/chat');
      const data = await response.json();
      setData(data);
    }

    fetchHistory();
  }

  return (
    <div className="App">
      <h3>SignalR Chat Communication</h3>
      <input
        type="text"
        placeholder="Type something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendChatHandler}>Send Chat</button>
      <br /> <br />
      <div>
        <button onClick={fetchChatHistoryHandler}>Fetch Chat History</button>
      </div>
      <div>
        <h4>Chat History</h4>
        <ul>
          {data?.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
