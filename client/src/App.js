import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState(" ");
  const [lastname, setLastName] = useState(" ");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastname);
    const url = "http://localhost:5000/api/saveUser";
    axios
      .post(url, {
        firstName: firstName,
        lastName: lastname,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello from FleetFarming</p>
        <form onSubmit={handleSubmit}>
          <label>
            Firstname:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </label>{" "}
          <br />
          <label>
            Lastname:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>{" "}
          <br />
          <button type="submit">save</button>
        </form>
      </header>
    </div>
  );
}

export default App;
