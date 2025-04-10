import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onStatusChange, onDelete }) => {
  if (jobs.length === 0) {
    return (
      <div className="no-jobs-message">
        No job applications found. Add your first job application!
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem
          key={job._id}
          job={job}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JobList;