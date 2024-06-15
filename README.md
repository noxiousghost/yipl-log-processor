# Event Management Application

This is an event management application built using the MERN stack, specifically utilizing Next.js for the client side and Express.js for the backend. The application allows authenticated users to create, read, update, and delete events.

## Features

- User authentication (signup, login, logout)
- Event management (create, read, update, delete)
- Protected routes for authenticated users
- JSON-based data storage
- Client-side validation using React Hook Form
- Server-side validation using Express
- Styling with Tailwind CSS

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Data Storage:** JSON file

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://narayansapkota-admin@bitbucket.org/narayansapkota/yipl-log-processor.git
   cd yipl-log-processor
   ```

2. **Install dependencies for both client and server:**

   ```bash
   # For client
   cd client
   npm install

   # For server
   cd ../server
   npm install
   ```

### Running the Application

1. **Start the server:**

   ```bash
   cd server
   npm start
   ```

   The server runs on `http://localhost:4000`.

2. **Start the client:**

   ```bash
   cd ../client
   npm run dev
   ```

   The client runs on `http://localhost:3000`.

## Usage

### Authentication

1. **Signup:** Navigate to `http://localhost:3000/auth/signup` to create a new account.
2. **Login:** Navigate to `http://localhost:3000/auth/login` to log in.

### Event Management

1. **View Events:** Navigate to `http://localhost:3000/events` to see a list of events.
2. **Create Event:** Only logged-in users can navigate to `http://localhost:3000/events/create` to create an event.
3. **Edit Event:** Only logged-in users can edit events by navigating to the specific event's edit page.
4. **Delete Event:** Only logged-in users can delete events.

## API Endpoints

### Authentication

- **POST** `/auth/signup` - Create a new user
- **POST** `/auth/login` - Log in a user and return a JWT token

### Events

- **GET** `/api/events` - Get a list of events
- **GET** `/api/events/:id` - Get details of a specific event
- **POST** `/api/events` - Create a new event (authenticated users only)
- **PUT** `/api/events/:id` - Update an event (authenticated users only)
- **DELETE** `/api/events/:id` - Delete an event (authenticated users only)

## Project Details

### Authentication

- **JWT-based Authentication:** Securely authenticate users with JSON Web Tokens.
- **Protected Routes:** Ensure only authenticated users can perform create, update, and delete operations.

### Event Management

- **CRUD Operations:** Perform create, read, update, and delete operations on events.
- **Client-Side Validation:** Ensure forms are validated on the client using React Hook Form.
- **Server-Side Validation:** Validate data on the server using middleware.

## Future Improvements

- Add unit tests for client and server.
- Implement user roles and permissions.
- Migrate from JSON file storage to a database (e.g., MongoDB).

## Contact

For any questions or suggestions, please reach out to the project maintainer at [sapkota.king@gmail.com].

---
