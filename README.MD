# RK Wigs

Welcome to **RK Wigs**, an online store that offers a variety of high-quality wigs. This project is a dynamic web application that allows users to browse, search, add, and delete wigs from an inventory stored in a JSON database.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Project Overview
RK Wigs is an interactive e-commerce platform where users can explore various wigs, search for specific styles, and manage inventory by adding or deleting products.

## Features
- Display a list of available wigs with images, descriptions, prices, and ratings.
- Search functionality to filter wigs by title.
- Add new wigs to the inventory using a form.
- Delete wigs from the inventory.
- Responsive design for a smooth user experience.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** JSON Server (for mock API)
- **Libraries:** Font Awesome (icons)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/rk-wigs.git
   ```
2. Navigate to the project folder:
   ```sh
   cd rk-wigs
   ```
3. Install dependencies:
   ```sh
   npm install json-server
   ```
4. Start the JSON Server:
   ```sh
   json-server --watch db.json --port 3000
   ```
5. Open `index.html` in a browser to view the website.

## Usage
- Browse through the available wigs displayed on the homepage.
- Use the search bar to find wigs by title.
- Add new wigs using the provided form.
- Delete a wig by clicking the "Delete" button on the item.

## API Endpoints
The project uses a mock API powered by JSON Server:
- **GET /wigs** - Retrieve all wigs.
- **POST /wigs** - Add a new wig.
- **DELETE /wigs/:id** - Remove a wig by ID.

##Project Structure

RK-Wigs/
├── css/
│   ├── style.css
├── images/
│   ├── (wig images)
├── js/
│   ├── index.js
├── db.json
├── index.html
├── README.md




