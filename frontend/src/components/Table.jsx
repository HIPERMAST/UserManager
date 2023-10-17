import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import UserModal from "./UserModal";
import "./Table.css"; // Importa tu archivo CSS personalizado si es necesario

const Table = () => {
  const [users, setUsers] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:8000/api/users", requestOptions);

    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the users");
    } else {
      const data = await response.json();
      setUsers(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getUsers();
    setId(null);
  };

  return (
    <div className="table-container">
      <UserModal
        active={activeModal}
        handleModal={handleModal}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <ErrorMessage message={errorMessage} />
      {loaded && users ? (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Table;
