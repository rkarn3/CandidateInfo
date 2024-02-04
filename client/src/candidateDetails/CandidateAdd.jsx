import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const baseUrl = import.meta.env.VITE_BASE_URL

const CandidateAdd = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    status: "",
    expected_salary: "",
    node_experience: "",
    react_experience: "",
  });
  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [loading,setLoading]= useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, // Reset error for the current field when value changes
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Node and React experience validation
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(formData.node_experience)) {
      newErrors.node_experience = 'Must be a number';
      valid = false;
    }
    if (!numberRegex.test(formData.react_experience)) {
      newErrors.react_experience = 'Must be a number';
      valid = false;
    }

    // Expected salary validation
    if (!numberRegex.test(formData.expected_salary)) {
      newErrors.expected_salary = 'Must be a number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

useEffect(() => {
  console.log(props)
  const fetchSingleCandidate = async (id) => {
    try{
      const { data } = await axios.get(`${baseUrl}/candidates/${id}`)
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        skills: data.skills,
        status: data.status,
        expected_salary: data.expected_salary,
        node_experience: data.node_experience,
        react_experience: data.react_experience,
      });
    } catch(e) {
      console.error(e)
    }
  } 
  if(props.id){
    fetchSingleCandidate(props.id)
  }

}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      setLoading(true)
      try{
        if(!props.id){
          await axios.post(`${baseUrl}/candidates`, formData);
          setFormData({
            name: '',
            email: '',
            phone: '',
            skills: '',
            status: '',
            expected_salary: '',
            node_experience: '',
            react_experience: '',
          });
        } else {
          await axios.put(`${baseUrl}/candidates/${props.id}`, formData);
        }
        setSuccessMessage('Form submitted successfully!');
        setFailureMessage(null);
      } catch (error) {
        console.log(error)
        setSuccessMessage(null);
        setFailureMessage('Form submission failed. Please check the errors.');
      } finally {
        setLoading(false);
      }
    }  else {
      setSuccessMessage(null);
      setFailureMessage('Form submission failed. Please check the errors.');
    }
    
  };
  const handleRefreshPage = () => {
    window.location.reload();
  };
  const statusOptions = ['Contacted', 'Interview Scheduled', 'Offer Extended', 'Hired', 'Rejected'];

  return (
    <div className="max-w-md mx-auto my-8">
            <div className="flex items-center justify-between mb-6">

       <button
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={handleRefreshPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>
      <h1 className="text-3xl font-bold underline text-center">
        {props.id ? 'Edit the details' : 'Add a new candidate'}
      </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="123-456-7890"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="React, JavaScript, CSS"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="node_experience"
            >
              Node JS experience
            </label>
            <input
              type="text"
              id="node_experience"
              name="node_experience"
              value={formData.node_experience}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Please enter in months"
            />
            {errors.node_experience && (
              <p className="text-red-500 text-xs italic">{errors.node_experience}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="react_experience"
            >
              React JS experience
            </label>
            <input
              type="text"
              id="react_experience"
              name="react_experience"
              value={formData.react_experience}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Please enter in months"
            />
            {errors.react_experience && (
              <p className="text-red-500 text-xs italic">{errors.react_experience}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select status</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expected_salary"
            >
              Expected Salary
            </label>
            <input
              type="text"
              id="expected_salary"
              name="expected_salary"
              value={formData.expected_salary}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="$60,000"
            />
            {errors.expected_salary && (
              <p className="text-red-500 text-xs italic">{errors.expected_salary}</p>
            )}
          </div>
        </div>
        {successMessage && (
            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
              {successMessage}
            </div>
          )}
          {failureMessage && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
              {failureMessage}
            </div>
          )}
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-blue-500 mt-4" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateAdd;
