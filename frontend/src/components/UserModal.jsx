import React, { useEffect, useState } from "react";

const UserModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/users/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the user");
      } else {
        const data = await response.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPosition(data.position);
        setEmail(data.email);
        setSkills(data.skills);
        setAvatar(data.avatar);
      }
    };

    if (id) {
      getUser();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setFirstName("");
    setLastName("");
    setPosition("");
    setEmail("");
    setSkills("");
    setAvatar("");
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            Employees
          </h1>
        </header>
        <footer className="modal-card-foot has-background-primary-light">
        </footer>
      </div>
    </div>
  );
};

export default UserModal;