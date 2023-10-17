import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import UserModal from "./UserModal";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js"; // Import Chart.js library
import "chartjs-adapter-moment"; // Import necessary adapters if needed
import "chartjs-adapter-luxon";
import "./Table.css"; // Import your custom CSS file if needed

ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale);

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
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/users",
      requestOptions
    );

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

  const radarData = {
    labels: [
      "Python",
      "Sql",
      "Java",
      "C++",
      "C#",
      "Javascript",
      "React",
      "Angular",
      "Spark",
      "Node",
    ],
    datasets:
      loaded && users
        ? users.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            data: user.skills.split(",").map((skill) => skill.trim().length),
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgba(75,192,192,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(75,192,192,1)",
          }))
        : [],
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
        <th>Avatar</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Position</th>
        <th>Skills</th>
      </tr>
    </thead>
    <tbody>
      {loaded &&
        users &&
        users.map((user) => (
          <tr key={user.id}>
            <td>
              <figure className="image is-48x48">
                <img
                  className="is-rounded"
                  src={user.avatar}
                  alt="User avatar"
                />
              </figure>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.position}</td>
            <td>
              <Radar
                data={{
                  labels: [
                    "Python",
                    "Sql",
                    "Java",
                    "C++",
                    "C#",
                    "Javascript",
                    "React",
                    "Angular",
                    "Spark",
                    "Node",
                  ],
                  datasets: [
                    {
                      label: `${user.firstName} ${user.lastName}`,
                      data: user.skills.split(",").map((skill) => skill.trim().length),
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "rgba(75,192,192,1)",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgba(75,192,192,1)",
                    },
                  ],
                }}
                width={200}
                height={200}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </td>
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
