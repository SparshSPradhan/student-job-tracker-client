import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const JobItem = ({ job, onStatusChange, onDelete }) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status color mapping
  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'status-applied';
      case 'Interview':
        return 'status-interview';
      case 'Offer':
        return 'status-offer';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(job._id, newStatus);
    setShowStatusOptions(false);
  };

  return (
    <div className="job-item">
      <div className="job-header">
        <h3 className="company-name">{job.company}</h3>
        <p className="job-role">{job.role}</p>
      </div>

      <div className="job-details">
        <div className={`job-status ${getStatusClass(job.status)}`}>
          {job.status}
        </div>
        <p className="job-date">
          Applied on: {formatDate(job.applicationDate)}
        </p>
        {job.link && (
          <p className="job-link">
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              View Job Posting
            </a>
          </p>
        )}
      </div>

      <div className="job-actions">
        <div className="status-update-container">
          <button
            className="status-update-button"
            onClick={() => setShowStatusOptions(!showStatusOptions)}
          >
            Update Status
          </button>
          {showStatusOptions && (
            <div className="status-options">
              <div
                className="status-option"
                onClick={() => handleStatusChange('Applied')}
              >
                Applied
              </div>
              <div
                className="status-option"
                onClick={() => handleStatusChange('Interview')}
              >
                Interview
              </div>
              <div
                className="status-option"
                onClick={() => handleStatusChange('Offer')}
              >
                Offer
              </div>
              <div
                className="status-option"
                onClick={() => handleStatusChange('Rejected')}
              >
                Rejected
              </div>
            </div>
          )}
        </div>
        <button
          className="delete-job-button"
          onClick={() => onDelete(job._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default JobItem;
