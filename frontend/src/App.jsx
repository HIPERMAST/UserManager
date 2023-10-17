// Import React, useEffect, useState and components
import React, { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Footer from "./components/Header.jsx";
import Table from "./components/Table";


// App component
const App = () => {
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Fetch welcome message from backend
  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:8000/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  const handleLogin = (value) => {
    setLoggedIn(value);
  };

  return (
    <>
      <Footer title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          <div className="columns">
            {!loggedIn ? (
              <div className="columns">
                <Login onLogin={handleLogin} />
              </div>
            ) : (
              <div className="columns">
                <Table />
                <button className="button" onClick={() => setLoggedIn(false)}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;
