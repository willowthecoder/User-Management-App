# 👤 User Management App

A simple user management system built with **Node.js**, **Express**, **MySQL**, **EJS**, and **Faker.js**.  
This app lets you create, edit, delete, and view users with clean UI and password confirmation for edits and deletions.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templates + custom CSS
- **Database:** MySQL
- **Other:** Faker.js for fake user data, Method-Override for HTTP verbs

---

## 📁 Project Structure

```├── public/ │ └── style.css # Global styles for all HTML pages ├── views/ │ ├── home.ejs # Landing page with user count │ ├── newuser.ejs # Form to create a new user │ ├── edituser.ejs # Form to edit existing user info │ ├── delete.ejs # Password confirmation before delete │ └── showusers.ejs # Table displaying all users ├── routes/ │ └── users.js # (Optional: if you separate routing logic) ├── app.js # Main Express server ├── schema.sql # SQL to create 'user' table in MySQL ├── package.json └── README.md```

---

## 🚀 Features

- Create new users with UUID, username, email, and password
- View all users in a table
- Edit a user’s username (with password verification)
- Delete a user (with password confirmation)
- Styled using a global `style.css`

---
