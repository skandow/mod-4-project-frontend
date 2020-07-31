# Welcome to FlatNote!

This SPA is designed to allow individuals to create notes of their choosing. The user will
be able to create a profile and write notes for any purpose. These notes can be saved, edited,
and emailed to the address the user has submitted for their profiles. 

Flatnote allows individuals to create accounts providing the following data:

# User Data: 
  1.  User Name
  2.  Password
  3.  Email address
  4.  Age
  5.  Gender
  6.  Avatar image url  

# Menu Highlights:

FlatNote utilizes a menu NavBar that allows users to accomplish the following:

  1.  View a user's profile
  2.  Edit a user's profile (the profile can also be deleted on this page)
  3.  View a user's notes
        a. Users can see the 'Notes' page, which lists the title and date created for each note.
        b. Users can filter out notes by title or content and can choose to have only starred 
           notes displayed or have the display based on most recent note first or oldest note first
  4.  Create a new note
        a. Users can create a new note with title and content
        b. Users have the option to mark the note as important with a star
        c. Users can also click an option to have the note emailed to them upon saving it to the
           database
  5.  A 'log-out' button

# NotePage Highlights:

When visiting a particular note page, users can acccomplish the following

  1.  View the note
  2.  Edit the note
  3.  Delete the note

# Installation:
  1.  Clone this repo and the corresponding back-end repo
  2.  In your terminal, go to the 'mod-4-project-backend' directory and run 'bundle install'
  3.  Run 'rails db:create'
  4.  Run 'rails db:migrate'
  5.  Run 'rails db:seed'
  6.  Run 'rails s -p 3001' to start the back-end server
  7.  In your terminal, go to the 'mod-4-project-frontend' directory and run 'npm install'
  8.  Run 'npm start' to start the front-end server