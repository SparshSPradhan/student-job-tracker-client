// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './components/Navbar';
// import AddJobForm from './components/AddJobForm';
// import JobList from './components/JobList';
// import FilterOptions from './components/FilterOptions';
// import './App.css';

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [filters, setFilters] = useState({
//     status: '',
//     startDate: '',
//     endDate: '',
//   });

//   // Fetch jobs on component mount and when filters change
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
        
//         // Build query string based on active filters
//         let queryParams = new URLSearchParams();
//         if (filters.status) queryParams.append('status', filters.status);
//         if (filters.startDate) queryParams.append('startDate', filters.startDate);
//         if (filters.endDate) queryParams.append('endDate', filters.endDate);
        
//         const response = await axios.get(`/api/jobs?${queryParams.toString()}`);
//         setJobs(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch job applications');
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [filters]);

//   // Add new job
//   const addJob = async (jobData) => {
//     try {
//       const response = await axios.post('/api/jobs', jobData);
//       setJobs([response.data, ...jobs]);
//       setShowAddForm(false);
//     } catch (err) {
//       setError('Failed to add job application');
//     }
//   };

//   // Update job status
//   const updateJobStatus = async (id, newStatus) => {
//     try {
//       const response = await axios.put(`/api/jobs/${id}`, { status: newStatus });
//       setJobs(jobs.map(job => job._id === id ? response.data : job));
//     } catch (err) {
//       setError('Failed to update job status');
//     }
//   };

//   // Delete job
//   const deleteJob = async (id) => {
//     try {
//       await axios.delete(`/api/jobs/${id}`);
//       setJobs(jobs.filter(job => job._id !== id));
//     } catch (err) {
//       setError('Failed to delete job application');
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="app">
//       <Navbar onAddClick={() => setShowAddForm(!showAddForm)} />
      
//       <main className="container">
//         {error && <div className="error-message">{error}</div>}
        
//         <FilterOptions 
//           filters={filters} 
//           onFilterChange={handleFilterChange} 
//         />
        
//         {showAddForm && (
//           <AddJobForm onAddJob={addJob} onCancel={() => setShowAddForm(false)} />
//         )}
        
//         {loading ? (
//           <div className="loading">Loading job applications...</div>
//         ) : (
//           <JobList 
//             jobs={jobs} 
//             onStatusChange={updateJobStatus} 
//             onDelete={deleteJob} 
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import AddJobForm from './components/AddJobForm';
import FilterOptions from './components/FilterOptions';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  
  // Fetch jobs from backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          setFilteredJobs(data);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    
    fetchJobs();
  }, []);
  
  // Handle adding a new job
  const handleAddJob = async (newJob) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      
      if (response.ok) {
        const addedJob = await response.json();
        setJobs([...jobs, addedJob]);
        setFilteredJobs([...filteredJobs, addedJob]);
        setShowAddForm(false);
      } else {
        console.error('Failed to add job');
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  
  // Handle canceling add job form
  const handleCancel = () => {
    setShowAddForm(false);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Apply filters to jobs
    let result = [...jobs];
    
    // Filter by job type
    if (newFilters.jobType && newFilters.jobType.length > 0) {
      result = result.filter(job => 
        newFilters.jobType.includes(job.type)
      );
    }
    
    // Filter by location
    if (newFilters.location) {
      result = result.filter(job => 
        job.location && job.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }
    
    // Filter by remote
    if (newFilters.remote) {
      result = result.filter(job => job.remote === true);
    }
    
    // Filter by status
    if (newFilters.status && newFilters.status.length > 0) {
      result = result.filter(job => 
        newFilters.status.includes(job.status)
      );
    }
    
    // Apply more filters as needed...
    
    setFilteredJobs(result);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <div className="container">
          <div className="main-content">
            <div className="header-actions">
              <h1>Job Application Tracker</h1>
              {!showAddForm && (
                <button 
                  className="add-job-button" 
                  onClick={() => setShowAddForm(true)}
                >
                  Add New Job
                </button>
              )}
            </div>
            
            {showAddForm ? (
              <AddJobForm 
                onAddJob={handleAddJob} 
                onCancel={handleCancel} 
              />
            ) : (
              <div className="job-tracker-content">
                <div className="sidebar">
                  <FilterOptions onFilterChange={handleFilterChange} />
                </div>
                <div className="job-list-container">
                  <JobList jobs={filteredJobs} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;