# Student Job Tracker - Client

The client-side React application for the Student Job Tracker system.

## Overview

This is the frontend portion of the Student Job Tracker application, built with React. It provides an intuitive interface for students to track and manage their job applications throughout the job search process.

## Features

- Add, view, and manage job applications
- Filter applications by multiple criteria
- Track application status changes
- Responsive design for desktop and mobile devices

## Tech Stack

- React.js
- React Router for navigation
- Fetch API for server communication
- CSS for styling

## Project Structure

```
client/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── AddJobForm.js      # Form for adding new job applications
│   │   ├── JobList.js         # List of all job applications
│   │   ├── JobItem.js         # Individual job item component
│   │   ├── FilterOptions.js   # Filter options for job list
│   │   ├── Navbar.js          # Navigation bar component
│   ├── App.js                 # Main React component
│   ├── index.js               # React entry point
│   ├── App.css                # Main CSS styles
├── package.json
├── .env                       # Environment variables for frontend
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository and navigate to the client directory
   ```
   cd student-job-tracker/client
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the client directory with the following:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server
   ```
   npm start
   ```

5. The application should now be running at http://localhost:3000

## Component Overview

### AddJobForm.js
The form component for adding new job applications. It includes fields for:
- Company name
- Role/position
- Application status
- Application date
- Job posting link

### JobList.js
Displays all job applications in a list format. It receives the list of jobs as props and maps through them to render individual JobItem components.

### JobItem.js
Renders an individual job application with its details. Each item displays the company, role, status, and application date, with options to view more details or update the status.

### FilterOptions.js
Provides filtering capabilities for the job list. Users can filter by:
- Job type (Full-time, Part-time, Internship, etc.)
- Location
- Remote options
- Status
- Date range

### Navbar.js
The navigation component displayed at the top of the application, providing links to different sections of the app.

## State Management

The application uses React's built-in state management with useState and useEffect hooks. The main state is managed in App.js, which:
- Stores the list of jobs
- Manages filter settings
- Controls the visibility of the add job form

## Communication with Backend

The client communicates with the server API using the Fetch API. API calls are made to:
- GET /api/jobs - Fetch all job applications
- POST /api/jobs - Add a new job application
- PUT /api/jobs/:id - Update a job application
- DELETE /api/jobs/:id - Delete a job application

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Future Enhancements

- User authentication
- Dashboard with statistics
- Dark mode
- Drag and drop interface for status changes
- Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
