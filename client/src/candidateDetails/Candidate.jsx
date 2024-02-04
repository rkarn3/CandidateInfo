import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Candidate({candidate,generateRandomScore,onEdit}) {
  return (
    <div
      key={candidate.email}
      className="bg-white border border-gray-300 shadow-md rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <h3 className="text-lg font-bold mb-2 text-indigo-700">
        {candidate.name}
      </h3>
      <p className="text-gray-700 mb-2">{candidate.email}</p>
      <p className="text-gray-700 mb-2">{candidate.phone}</p>
      <p className="text-gray-700 mb-2">{candidate.skills}</p>
      <p className="text-gray-700 mb-2">
        Experience in nodejs - {candidate.node_experience} months
      </p>
      <p className="text-gray-700 mb-2">
        Experience in react js - {candidate.react_experience} months
      </p>
      <p
        className={`text-white mb-2 bg-${
          candidate.status === "employed" ? "green" : "red"
        }-500 rounded-full py-1 px-2 inline-block`}
      >
        {candidate.status}
      </p>
      <p className="text-gray-700 mb-2">
        Expected Salary: {candidate.expected_salary}
      </p>
      <p
        className={`text-white bg-blue-500 rounded-full py-1 px-2 inline-block`}
      >
        Score:{" "}
        {generateRandomScore(
          candidate.node_experience,
          candidate.react_experience
        )}
      </p>
      <div className="absolute bottom-2 right-2" onClick={()=> onEdit(candidate.id)}>
        <FontAwesomeIcon
          icon={faEdit}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Candidate