# YouApp - Find Your Match

This is a web application project designed to simulate a social or dating platform. Users can register, log in, and manage their personal profiles in a comprehensive way. The project is built with a focus on a modern, interactive user interface and a robust frontend architecture using Next.js.

## Key Features

* **User Authentication:** Secure sign-up (`Register`) and login (`Login`) flow for users.
* **Public Landing Page:** An elegant welcome page for new and returning users, guiding them to log in or register.
* **Comprehensive Profile Management:**

  * **Edit Personal Information:** Users can view and update details such as Display Name, Date of Birth, Height, and Weight.
  * **Upload Profile Photo:** Functionality to upload and display a custom profile picture.
  * **Gender Selection:** Option to choose and display gender.
  * **Automatic Zodiac & Horoscope:** The system automatically calculates and displays the user's Zodiac and Horoscope based on their birth date.
* **Dynamic Interests Editor:** A separate page that allows users to add and remove personal interests using an interactive *chip-based* interface.
* **Persistent Data:**

  * Core profile data (name, birthdate, etc.) is saved and fetched through a backend API.
  * Profile photo and gender are stored in the browser's `localStorage` as a solution for persisting unsupported data.
* **Protected Routes:** Middleware ensures that pages requiring authentication (e.g., `/profile`) are not accessible to unauthenticated users.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **UI Library:** [React](https://reactjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

To run this project locally, follow these steps:

### 1. Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/husnifatah/youapp.git
cd youapp
```

### 3. Install Dependencies

Run one of the following commands to install all required packages:

```bash
npm install
```

or

```bash
yarn install
```

### 4. Configure Environment Variables

Create a new file in the project root named `.env.local` and add the following variable. This file will store the base URL for the API.

```env
NEXT_PUBLIC_API_BASE_URL=https://techtest.youapp.ai/api
```

### 5. Run the Development Server

You're now ready to start the application.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

* `src/app/`: Contains all page routes of the application (e.g., `/`, `/login`, `/profile`).
* `src/components/`: Collection of reusable React components (e.g., `ProfileCard`, `AboutForm`, `InterestCard`).
* `src/lib/`: Helper functions, including `api.ts` for backend API interaction.
* `src/middleware.ts`: Handles logic to protect routes and redirect users based on authentication status.

## Author

This project was developed by **husnifatah**.

---

