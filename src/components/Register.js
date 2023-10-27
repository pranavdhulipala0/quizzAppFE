import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputField from "./services/ InputField"
import LanguageSelection from "./services/selectionBox";
import toast from 'react-hot-toast';
import axios from 'axios'; // Import the axios library
import base_url from "../constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const samplelanguages = ["English", "French", "Japanese", "Portuguese"];
  const [searchedLanguages, setSearchedLanguages] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleSearchLanguages = (event) => {
    const LanguagesToSearch = event.target.value;
    setSearchedLanguages(LanguagesToSearch);
  
    // Clear search results when the search input is empty
    if (LanguagesToSearch === '') {
      setSearchResults([]);
    } else {
      // Filter the sample languages based on the search query
      const filteredlanguages = samplelanguages.filter((language) =>
        language.toLowerCase().includes(LanguagesToSearch.toLowerCase())
      );
      setSearchResults(filteredlanguages);
    }
  };

  const handleRemoveLanguages = (languageToRemove) => {
    const updatedLanguages = selectedLanguages.filter(
      (language) => language !== languageToRemove
    );
    setSelectedLanguages(updatedLanguages);
  };

  const handleAddLanguages = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
      setSearchedLanguages(""); // Clear the search input
      setSearchResults([]); // Clear search results
    }
  };


// Inside the handleSignUp function
const handleSignUp = async () => {
  const registrationData = {
    name: username,
    email: email,
    password: password,
    preferred_languages: selectedLanguages, // Assuming selectedLanguages is an array of language names
  };

  try {
    const response = await axios.post(
      `${base_url}/user/register`,
      registrationData
    );

    if (response.status === 200 && response.data.status === true) {
      // Registration successful
      toast.success("User registered successfully"); // Show a success toast
      // Redirect to the login page
      navigate('/Login'); // You'll need to use the `history` object to handle the route change
    } else {
      // Handle other responses (client-side errors, server errors)
      toast.error(response.data.message); // Display the error message from the server
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Registration failed. Please try again."); // Show an error toast
  }
};

  

  return (
  <div className="container vh-100 mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">Sign Up</h2>
          <form className="register-form">
            <InputField
              label="Username"
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="mt-3"></div>
            <LanguageSelection
                  searchedLanguages={searchedLanguages}
                  searchResults={searchResults}
                  selectedLanguages={selectedLanguages}
                  handleSearchLanguages={handleSearchLanguages}
                  handleAddLanguages={handleAddLanguages}
                  handleRemoveLanguages={handleRemoveLanguages}
                  sampleLanguages={samplelanguages}
                />
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg mt-3"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-3">
            Have an account?<span> </span>
            <Link className="text-primary" to="/Login">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Register;

