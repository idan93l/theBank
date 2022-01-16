import { useState, useEffect } from "react";
import axios from "axios";

export default function GetData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/users`);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const addUser = () => {
    try {
      axios.post(`/users`, { id: "123456789", cash: 5443, credit: 6593});
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);

  return (
    <div>
      <button onClick={addUser}>Add user</button>
      {data.map((user) => {
        return (
          <div key={user.id}>
            <br />
            <h1>User ID: {user.id}</h1>
            <h3>Cash: {user.cash}</h3>
            <h3>Credit: {user.credit}</h3>
            <button>Edit</button>
          </div>
        )
      })}
    </div>
  );
}
