// import React, { useState } from 'react';

// const FilterOptions = ({ applyFilters }) => {
//   const [filters, setFilters] = useState({
//     jobType: [],
//     location: '',
//     experience: [],
//     salary: { min: '', max: '' },
//     remote: false,
//     datePosted: ''
//   });

//   const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
//   const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Manager', 'Executive'];
//   const dateOptions = ['Any time', 'Past 24 hours', 'Past week', 'Past month'];

//   const handleCheckboxChange = (category, value) => {
//     if (filters[category].includes(value)) {
//       setFilters({
//         ...filters,
//         [category]: filters[category].filter(item => item !== value)
//       });
//     } else {
//       setFilters({
//         ...filters,
//         [category]: [...filters[category], value]
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFilters({
//       ...filters,
//       [field]: value
//     });
//   };

//   const handleSalaryChange = (bound, value) => {
//     setFilters({
//       ...filters,
//       salary: {
//         ...filters.salary,
//         [bound]: value
//       }
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     applyFilters(filters);
//   };

//   const clearFilters = () => {
//     setFilters({
//       jobType: [],
//       location: '',
//       experience: [],
//       salary: { min: '', max: '' },
//       remote: false,
//       datePosted: ''
//     });
//     applyFilters({});
//   };

//   return (
//     <div className="filter-options">
//       <h2>Filter Jobs</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Job Type Filter */}
//         <div className="filter-section">
//           <h3>Job Type</h3>
//           {jobTypes.map(type => (
//             <div key={type} className="checkbox-option">
//               <input
//                 type="checkbox"
//                 id={`job-type-${type}`}
//                 checked={filters.jobType.includes(type)}
//                 onChange={() => handleCheckboxChange('jobType', type)}
//               />
//               <label htmlFor={`job-type-${type}`}>{type}</label>
//             </div>
//           ))}
//         </div>

//         {/* Location Filter */}
//         <div className="filter-section">
//           <h3>Location</h3>
//           <input
//             type="text"
//             placeholder="City, state, or zip code"
//             value={filters.location}
//             onChange={(e) => handleInputChange('location', e.target.value)}
//           />
//           <div className="checkbox-option">
//             <input
//               type="checkbox"
//               id="remote-option"
//               checked={filters.remote}
//               onChange={(e) => handleInputChange('remote', e.target.checked)}
//             />
//             <label htmlFor="remote-option">Remote Only</label>
//           </div>
//         </div>

//         {/* Experience Level Filter */}
//         <div className="filter-section">
//           <h3>Experience Level</h3>
//           {experienceLevels.map(level => (
//             <div key={level} className="checkbox-option">
//               <input
//                 type="checkbox"
//                 id={`exp-${level}`}
//                 checked={filters.experience.includes(level)}
//                 onChange={() => handleCheckboxChange('experience', level)}
//               />
//               <label htmlFor={`exp-${level}`}>{level}</label>
//             </div>
//           ))}
//         </div>

//         {/* Salary Range Filter */}
//         <div className="filter-section">
//           <h3>Salary Range</h3>
//           <div className="salary-inputs">
//             <input
//               type="number"
//               placeholder="Min"
//               value={filters.salary.min}
//               onChange={(e) => handleSalaryChange('min', e.target.value)}
//             />
//             <span>to</span>
//             <input
//               type="number"
//               placeholder="Max"
//               value={filters.salary.max}
//               onChange={(e) => handleSalaryChange('max', e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Date Posted Filter */}
//         <div className="filter-section">
//           <h3>Date Posted</h3>
//           <select
//             value={filters.datePosted}
//             onChange={(e) => handleInputChange('datePosted', e.target.value)}
//           >
//             <option value="">Select timeframe</option>
//             {dateOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>

//         {/* Filter Actions */}
//         <div className="filter-actions">
//           <button type="submit" className="apply-filters-btn">Apply Filters</button>
//           <button type="button" className="clear-filters-btn" onClick={clearFilters}>
//             Clear All
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FilterOptions;
import React, { useState } from 'react';

const FilterOptions = ({ onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState({
    jobType: [],
    location: '',
    experience: [],
    salary: { min: '', max: '' },
    remote: false,
    datePosted: ''
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Manager', 'Executive'];
  const dateOptions = ['Any time', 'Past 24 hours', 'Past week', 'Past month'];

  const handleCheckboxChange = (category, value) => {
    const updatedFilters = {
      ...filters,
      [category]: filters[category].includes(value)
        ? filters[category].filter(item => item !== value)
        : [...filters[category], value]
    };
    
    setFilters(updatedFilters);
    // Optionally notify parent component of filter changes
    onFilterChange(updatedFilters);
  };

  const handleInputChange = (field, value) => {
    const updatedFilters = {
      ...filters,
      [field]: value
    };
    
    setFilters(updatedFilters);
    // Optionally notify parent component of filter changes
    onFilterChange(updatedFilters);
  };

  const handleSalaryChange = (bound, value) => {
    const updatedFilters = {
      ...filters,
      salary: {
        ...filters.salary,
        [bound]: value
      }
    };
    
    setFilters(updatedFilters);
    // Optionally notify parent component of filter changes
    onFilterChange(updatedFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If you want to only apply filters on submit, uncomment this:
    // onFilterChange(filters);
    console.log("Applied filters:", filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      jobType: [],
      location: '',
      experience: [],
      salary: { min: '', max: '' },
      remote: false,
      datePosted: ''
    };
    
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="filter-options">
      <h2>Filter Jobs</h2>
      <form onSubmit={handleSubmit}>
        {/* Job Type Filter */}
        <div className="filter-section">
          <h3>Job Type</h3>
          {jobTypes.map(type => (
            <div key={type} className="checkbox-option">
              <input
                type="checkbox"
                id={`job-type-${type}`}
                checked={filters.jobType.includes(type)}
                onChange={() => handleCheckboxChange('jobType', type)}
              />
              <label htmlFor={`job-type-${type}`}>{type}</label>
            </div>
          ))}
        </div>

        {/* Location Filter */}
        <div className="filter-section">
          <h3>Location</h3>
          <input
            type="text"
            placeholder="City, state, or zip code"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="remote-option"
              checked={filters.remote}
              onChange={(e) => handleInputChange('remote', e.target.checked)}
            />
            <label htmlFor="remote-option">Remote Only</label>
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="filter-section">
          <h3>Experience Level</h3>
          {experienceLevels.map(level => (
            <div key={level} className="checkbox-option">
              <input
                type="checkbox"
                id={`exp-${level}`}
                checked={filters.experience.includes(level)}
                onChange={() => handleCheckboxChange('experience', level)}
              />
              <label htmlFor={`exp-${level}`}>{level}</label>
            </div>
          ))}
        </div>

        {/* Salary Range Filter */}
        <div className="filter-section">
          <h3>Salary Range</h3>
          <div className="salary-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.salary.min}
              onChange={(e) => handleSalaryChange('min', e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.salary.max}
              onChange={(e) => handleSalaryChange('max', e.target.value)}
            />
          </div>
        </div>

        {/* Date Posted Filter */}
        <div className="filter-section">
          <h3>Date Posted</h3>
          <select
            value={filters.datePosted}
            onChange={(e) => handleInputChange('datePosted', e.target.value)}
          >
            <option value="">Select timeframe</option>
            {dateOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Filter Actions */}
        <div className="filter-actions">
          <button type="submit" className="apply-filters-btn">Apply Filters</button>
          <button type="button" className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterOptions;