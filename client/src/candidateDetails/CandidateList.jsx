import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateAdd from "./CandidateAdd";
import Candidate from "./Candidate";

const baseUrl = import.meta.env.VITE_BASE_URL

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [id, setId] = useState(false);


  useEffect(() => {
    const fetchCandidates = async () => {
        try{

            const { data } = await axios.get(`${baseUrl}/candidates`);
            setCandidates(data);
        }
        catch (e) {
            console.error(e)
        }
    };
    fetchCandidates();
  }, []);

  const generateRandomScore = (nodeExp, reactExp) => {
    const calculateScore = (exp) => {
      if (exp < 1) return 1;
      if (exp >= 1 && exp < 2) return 2;
      return 3;
    };
  
    const nodeScore = calculateScore(nodeExp / 12);
    const reactScore = calculateScore(reactExp / 12);
  
    return nodeScore + reactScore;
  };

  const addCandidate = (e) => {
    e.preventDefault();
    setShowCandidateForm(true);
  };

  const onEdit = (id) => {
    console.log({id})
    setShowCandidateForm(true);
    setId(id)

    // return <CandidateAdd id={id}/>;
  }

  const renderCandidate = (candidate) => {
    return (<div>
        <Candidate candidate={candidate} generateRandomScore={generateRandomScore} onEdit={onEdit}/>
    </div>)
  }

  if (showCandidateForm) {
    if(id) return <CandidateAdd id={id} />
    return <CandidateAdd />;
  }

  if (candidates.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center mb-4">
            <p className="text-3xl font-bold text-gray-800">No Candidates Present</p>
            <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
        </div>
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={addCandidate}
        >
            Add Candidate
        </button>
    </div>
    
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Candidates List</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 mb-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={addCandidate}
      >
        Add Candidate
      </button>
      {
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates?.map((candidate) => renderCandidate(candidate))}
        </div>
      }
    </div>
  );
};

export default CandidateList;
