import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminMessages() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/messages", {
      headers: { Authorization: token }
    }).then(res => setMsgs(res.data));
  }, []);

  return (
    <div className="p-10 text-white">
      <h1>Messages</h1>

      {msgs.map((m) => (
        <div key={m._id} className="bg-gray-800 p-3 mt-3">
          <p>{m.name} - {m.email}</p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}