Customer Survey React Component

Overview

This project contains a CustomerSurvey React component designed to collect user feedback through a multi-question survey. The survey includes rating-based questions (with 5 or 10-point scales) and a text-based question, featuring a clean, responsive UI with navigation, progress tracking, and session management.

Features





Dynamic Question Types: Supports rating (1-5 or 1-10 scale) and open-ended text questions.



Responsive UI: Uses Tailwind CSS for styling with a modern, gradient-themed design.



Navigation: Allows users to move between questions, skip questions, or submit the survey.



Progress Tracking: Displays a progress bar and question counter.



Session Management: Generates a unique session ID for each survey attempt.



Answer Persistence: Stores answers with timestamps and session IDs.



Confirmation Dialog: Prompts users before final survey submission.



Auto-Reset: Returns to the welcome screen after 5 seconds post-submission.

Prerequisites





Node.js: Ensure Node.js is installed to manage dependencies.



React: The component is built with React and uses hooks (useState, useRef).



React Icons: Uses react-icons for visual icons (e.g., FaStar, FaHeart).



Tailwind CSS: Requires Tailwind CSS for styling (configured via CDN or local setup).

Installation





Clone the Repository:

git clone <repository-url>
cd <repository-folder>



Install Dependencies:

npm install



Install React Icons:

npm install react-icons



Set Up Tailwind CSS (if not using CDN): Follow the Tailwind CSS installation guide to configure Tailwind in your project.

Usage





Integrate the Component: Import and use the CustomerSurvey component in your React application:

import CustomerSurvey from './CustomerSurvey';

function App() {
  return (
    <div>
      <CustomerSurvey />
    </div>
  );
}



Run the Application: Start the development server:

npm start



Access the Survey: Open your browser to http://localhost:3000 (or the configured port) to view the survey.

File Structure





CustomerSurvey.js: The main React component containing the survey logic and UI.



README.md: This documentation file.

Component Details





Questions: Defined as an array of objects with properties:





id: Unique identifier for the question.



text: The question text.



type: Either rating (for star or numerical ratings) or text (for open-ended responses).



scale: Number of options for rating questions (5 or 10).



icon: A React icon component for visual representation.



State Management:





currentScreen: Tracks the current view (welcome, survey, or thank-you).



currentQuestionIndex: Tracks the active question.



answers: Stores user responses with timestamps and session IDs.



sessionId: Unique ID for each survey session.



showConfirmDialog: Controls the visibility of the submission confirmation dialog.



Key Functions:





startSurvey: Initializes a new survey session.



saveAnswer: Saves user responses with metadata.



goToNext / goToPrevious: Navigates between questions.



skipQuestion: Skips the current question.



submitSurvey: Finalizes and logs the survey data.

Styling





Uses Tailwind CSS for responsive, utility-first styling.



Features gradient backgrounds, rounded buttons, and animated transitions.



Includes a progress bar and icon-based question headers.
