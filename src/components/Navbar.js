import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Navbar = ({ onAddClick }) => {
  return (
    <nav className="navbar">
      <h1>Student Job Tracker</h1>
      <button className="add-button" onClick={onAddClick}>
        <FaPlus /> Add Job
      </button>
    </nav>
  );
};

export default Navbar;