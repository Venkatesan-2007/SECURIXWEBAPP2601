# Securix React Web App

This project is a React-based web application, likely designed for a security-related service or company, featuring various public-facing pages and an administrative dashboard.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides a lightning-fast development experience.
*   **React Router DOM:** Declarative routing for React.
*   **GSAP (GreenSock Animation Platform):** A robust JavaScript animation library used for smooth animations.
*   **ESLint:** For linting and maintaining code quality.

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd securix-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs ESLint to identify and report on patterns found in ECMAScript/JavaScript code.

### `npm run preview`

Serves the `dist` folder locally for a production preview.

## File Structure

```
/data/data/com.termux/files/home/SECURIXWEBAPP26/securix-react/
├───.env.production
├───.gitignore
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───vite.config.js
├───node_modules/...
├───public/
│   ├───index.html
│   └───vite.svg
└───src/
    ├───App.jsx
    ├───main.jsx
    ├───styles.css
    ├───components/
    │   ├───AnimatedBackground.jsx
    │   ├───CurrentTime.jsx
    │   ├───Footer.jsx
    │   ├───Navbar.jsx
    │   ├───ScrollAnimation.jsx
    │   ├───Splash.jsx
    │   └───TextReveal.jsx
    ├───context/
    │   └───AuthContext.jsx
    ├───hooks/
    │   ├───useMagneticHover.js
    │   └───useScrollAnimation.js
    └───pages/
        ├───About.jsx
        ├───contact.jsx
        ├───Events.jsx
        ├───Home.jsx
        ├───Projects.jsx
        ├───services.jsx
        ├───SplashPage.jsx
        ├───Team.jsx
        └───admin/
            ├───AdminDashboard.jsx
            └───AdminLogin.jsx
```