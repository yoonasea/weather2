# Weather App

## Project Overview

This project is a weather application that displays the current weather summary for a given city, and maintains a search history of cities. The weather data is fetched from the OpenWeather API. 

In order to maintain a clean and uncluttered user interface, especially in a context similar to modern search engines like Google, CRUD operations (Create, Read, Update, Delete) are handled within a dropdown menu. This design choice ensures that the interface remains minimal and intuitive, without overwhelming the user with too many visible options at once.

## Setup Instructions

1. **Create Environment File**

   - Create a file named `.env` in the root directory of the project.
   - Add the following line to the `.env` file:
     ```
     REACT_APP_API_KEY=your_openweather_api_key
     ```
   - Replace `your_openweather_api_key` with your actual API key from OpenWeather.

2. **Install Dependencies**

   - Run the following command in your terminal to install the required Node modules:
     - `npm install`

3. **Start the Application**

   - Run the following command in your terminal to start the development server:
     - `npm start`

   The application will open in your default web browser.
