import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState();
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      let user = [];
      data.docs.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      console.log(user);
    };

    getUsers();
  }, []);

  return <div className="App">Hello World</div>;
}

export default App;
