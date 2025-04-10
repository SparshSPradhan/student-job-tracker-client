import React, { useState } from 'react';

const AddJobForm = ({ onAddJob, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    link: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddJob(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Job Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="applicationDate">Application Date</label>
          <input
            type="date"
            id="applicationDate"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Job Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/job-posting"
          />
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;