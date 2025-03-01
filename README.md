# GIS Cuaca: Real-time Weather Information and Mapping for Indonesia

## Overview

GIS Cuaca is a web application providing real-time weather information and interactive mapping for locations across Indonesia. It leverages the Open-Meteo API to deliver current weather conditions, hourly forecasts, and daily summaries. The application is built with React, Leaflet, and Tailwind CSS, offering a responsive and user-friendly experience.

## Features

*   **Interactive Weather Map:** Displays current weather conditions for various cities in Indonesia on an interactive map powered by Leaflet.
*   **Real-time Data:** Fetches and displays live weather data, including temperature, wind speed, and weather codes, using the Open-Meteo API.
*   **Location Selection:** Allows users to select specific cities or regions to view detailed weather information.
*   **Weather Details:** Provides comprehensive weather data, including hourly forecasts, daily summaries, humidity, pressure, and wind details.
*   **Informative Weather Facts:** Presents interesting facts about Indonesian weather patterns and climate.
*   **Responsive Design:** Built with Tailwind CSS for optimal viewing on various devices.
*   **Map Type Selection:** Offers different map types (street, satellite, terrain) for enhanced visualization.

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **Leaflet:** Open-source JavaScript library for mobile-friendly interactive maps.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **Open-Meteo API:** Provides weather data for locations worldwide.
*   **React Router:** For navigation between different views (map and data).
*   **Vite:** Build tool for fast development.

## Setup Instructions

Follow these steps to set up the GIS Cuaca application locally:

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:AnggaPuspa/CuacaNesia.git
    cd cuaca
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the application in development mode. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite).

## Project Structure

The project structure is organized as follows:
