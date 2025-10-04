# BinaryBlossoms

♻️ Open Waste Exchange (OWE)
Open Waste Exchange (OWE) is a community-driven digital marketplace designed to solve the problem of opaque waste management and low community participation in recycling. It directly connects sources of recyclable waste (individuals, hostels, offices) with organizations ready to collect it (NGOs, recyclers, volunteers).

The entire application is built as a highly performant Single-Page Application (SPA) using Next.js and Tailwind CSS, making it ideal for rapid development and demonstration (e.g., a hackathon).

✨ Key Features
This application features a professional, responsive UI and core functional prototypes for collaboration and tracking:

Single-Page Experience: All views (Landing, Auth, Dashboard, Postings, Map) are managed via state, ensuring fast, smooth navigation without page reloads.

Real-Time Map View: Integrates Leaflet.js and React-Leaflet to visually display the geographic location of all available waste postings, enabling efficient logistics for claimers.

Gamification Prototype: Dedicated Badges and Leaderboard views to encourage sustained community contribution.

Intuitive Posting: A simple form for users to post items (Plastic, E-Waste, Clothes) with simulated image upload capabilities.

User Tracking: Dashboard view summarizing contribution stats (Items, Kilograms Saved, Leaderboard Rank).

🛠️ Technology Stack
Framework: Next.js (App Router, JavaScript/JSX)

Styling: Tailwind CSS (Utility-first framework for professional, responsive design)

Mapping: Leaflet.js and React-Leaflet

🚀 Setup and Installation
Follow these steps to get the project running locally.

Prerequisites
Node.js (LTS version recommended)

npm or yarn

1. Clone or Initialize Project
If you are starting from scratch, you must install Next.js, Tailwind, and the mapping libraries:

# Install core dependencies
npm install next react react-dom
npm install -D tailwindcss postcss autoprefixer

# Install mapping dependencies
npm install leaflet react-leaflet

2. Configure Files
Ensure the following three critical files exist and contain the correct configuration to prevent build errors:

File

Purpose

Key Content

app/page.jsx

The main app component.

Must start with "use client";

postcss.config.js

Enables stable Tailwind compilation.

Must export plugins: { tailwindcss: {}, autoprefixer: {} }

app/globals.css

Imports Tailwind base styles.

Must start with the three @tailwind directives.

3. Run the Development Server
Navigate to the project root and start the server:

npm run dev

The application will be accessible at http://localhost:3000.

🗺️ Mapping Note
The MapView component uses direct links to the Leaflet marker images to ensure they display correctly. These links rely on the Leaflet CDN:

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '...',
  iconUrl: '...',
  shadowUrl: '...',
});

This is a necessary workaround when using react-leaflet with Webpack/Next.js and is already included in the app/page.jsx file.
