# Todo List Application

Welcome to the Todo List Application! This project is a full-stack web application designed for managing tasks with a focus on user authentication, responsive design, and modern web technologies. 

## Features

- **Sign Up**: Users can create a new account to start managing their tasks.
- ![signupview](https://github.com/user-attachments/assets/83e31dca-23ea-4e85-9f30-8557d5337ea2)
- **Login**: Existing users can log in to access their personal task list.
- ![loginview jpeg](https://github.com/user-attachments/assets/fa45a82d-6f0c-43cf-b6b1-4e0fd8a7924d)
- **Responsive Design**: The application is fully responsive and works seamlessly on various devices.
- ![mobile](https://github.com/user-attachments/assets/aefa40bd-72d8-4696-9d70-66a2604069cc)
- ![tablet](https://github.com/user-attachments/assets/506e881f-81be-49a2-b00c-312612f89ed0)
- **Dark Mode**: Users can switch between light and dark mode for a better viewing experience.
- ![darkmode](https://github.com/user-attachments/assets/d7b0b86c-a76e-4b14-878f-c75c38fb454a)
- ![lightmode](https://github.com/user-attachments/assets/3da5b452-5447-44b5-9560-7cfd3e21c106)
- **Auth Error Handling**: Graceful handling of authentication errors.
- ![authentcationstatussuccess](https://github.com/user-attachments/assets/77f457f2-1620-44b1-ac42-27d77be95cec)
- ![authentcationstatuslougout](https://github.com/user-attachments/assets/a2c26366-b04c-49dc-9caf-70c3c6da7a0d)
- ![eachuserhasitsowntasks](https://github.com/user-attachments/assets/4de1404d-9624-4928-bf98-9682b76de275)
- **Mode Persistence**: Dark/light mode preference is saved in `localStorage`.
- **CRUD Operations**: Users can Create, Read, Update, and Delete their tasks.
- **Session Management**: User sessions are saved in `localStorage` for persistent login.
- **Access Tokens**: Secured access using JWT tokens.
## Technologies Used

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **Vite**: Build tool for fast development.
  - **TypeScript**: Superset of JavaScript adding type safety.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Shadcn UI**: Component library for modern UI elements.

- **Backend**:
  - **Django**: High-level Python web framework for building the backend.
  - **Django Rest Framework (DRF)**: Toolkit for building Web APIs.
  - **Simple JWT**: JSON Web Token authentication for Django.
  - **CORS Headers**: Middleware to handle Cross-Origin Resource Sharing.

- **Database**:
  - **PostgreSQL**: Powerful, open-source relational database.

## Setup and Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

## API Endpoints

- **Sign Up**: `POST /api/auth/register/`
- **Login**: `POST /api/auth/login/`
- **Tasks**: with ViewSet


## Authentication

- **JWT Tokens**: Used for securing API endpoints.
- **Session Storage**: User sessions are managed using `localStorage`.

## Handling Authentication Errors

- Display user-friendly error messages for login and registration issues.
- Handle expired or invalid tokens gracefully.

## Dark Mode and Responsiveness

- **Dark Mode**: Toggle between light and dark modes, with the preference saved in `localStorage`.
- **Responsive Design**: Ensure compatibility with various screen sizes using responsive design principles.
