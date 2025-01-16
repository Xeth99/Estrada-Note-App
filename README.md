# Estrada Note App

A simple note-taking application that allows users to create, edit, and delete their notes.

## Clone the repository
"git clone https://github.com/Xeth99/Estrada-Note-App.git"

## To start this app, in the terminal, run:
### 'npm install'
### `npm start`

## Approach
The application was built using React.js for the frontend, Redux for state management, and CSS for styling. Its core feature is the ability to add, edit, and delete notes. Here's a quick overview of the approach:

State Management using Redux: The app utilizes Redux manage the state of notes such as "addNote", "editNote", "deleteNote" and "deleteAllNotes" actions. These actions are dispatched to modify the notes in the store. This approach ensures that any updates made to the notes are reflected in real-time throughout the UI. 

Reducer: The application uses a central reducer (notesReducer) to manage the state of notes. This reducer handles different actions that modify the state, updating it based on the action type and payload. As a result, the application reflects changes in real-time, ensuring a seamless user experience.

## Additional Ui
Clear Notes Button: The app features a dedicated "Clear All Notes" button that allows users to efficiently remove all notes from the list with a single click. This intuitive feature provides a quick way to clear the workspace without the need to delete notes individually, enhancing user experience and productivity.

Responsive Layout: The application is designed with a fully responsive layout that ensures optimal usability across various devices and screen sizes. It automatically adjusts its layout based on the screen dimensions, providing an excellent viewing experience on both desktop and mobile devices.
