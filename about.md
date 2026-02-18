# About CQI Project (Course Course Quality Improvement)

This document outlines the development journey and features of the CQI web application, migrated from a static prototype to a full-stack automated system.

## 🚀 Project Overview

The goal of this project was to modernize an existing static HTML/JS prototype into a robust, scalable web application. The new system features a **Clean Architecture** with a clear separation between the frontend user interface and the backend API, utilizing modern technologies to deliver a premium user experience.

## 🏗 Architecture

The project is structured into two main components:

1.  **Frontend (`cqi/frontend`)**:
    -   Built with **React** and **Vite** for high performance.
    -   Uses **Glassmorphism** design principles for a modern, Apple-inspired aesthetic.
    -   Features complex state management for dependent dropdown filters.
    -   Visualizes data using **Recharts**.

2.  **Backend (`cqi/backend`)**:
    -   Built with **Node.js** and **Express**.
    -   Serves as a REST API to provide course data and handle authentication.
    -   Replaces direct file access with secure API endpoints.
    -   Manages data JSONs (`data.json`, course details).

## ✨ Key Features

### 1. Robust Authentication
-   **Role-Based Access**: Supports "Teacher" and "Admin" roles.
-   **Security**: Backend validation of credentials.

### 2. Advanced Course Selection
-   **Hierarchical Filtering**:
    -   **Department**: (IT, CSE) - *Newly added*
    -   **Programme**: Updates dynamically based on Department (e.g., B.Tech IT, M.Tech IT).
    -   **Regulation**: (2021, 2024, 2025)
    -   **Batch**: (2021-2025, etc.)
    -   **Type**: (Theory, Lab, Project, TCP)
    -   **Course**: Filters based on all previous selections.
-   **Persistence**: Changing high-level filters (like Batch) preserves other selections where possible.

### 3. Data Visualization & Analytics
-   **Pass Percentage Stats**: Key performance indicators displayed prominently.
-   **Interactive Charts**:
    -   **Batch Comparison**: A bar chart comparing pass percentages across 2021-2025, 2022-2026, and 2023-2027 batches.
    -   **Dynamic Highlighting**: The chart automatically highlights the currently selected batch for better context.
-   **Conditional Display**: Stats and charts only appear when a specific course is selected to reduce clutter.

### 4. Detailed Course Insights
-   **Course Outcomes (COs)**: Displayed with clear descriptions.
-   **CO-PO Mapping**: A color-coded matrix mapping Course Outcomes to Program Outcomes (Green) and Program Specific Outcomes (Blue).
-   **Assessment Methods**: Detailed breakdown of assessment strategies.

## 🛠 Tech Stack

-   **Runtime**: [Bun](https://bun.sh) (Fast JavaScript runtime)
-   **Frontend**: React, Vite, Recharts, CSS Variables.
-   **Backend**: Express.js, CORS.
-   **Data**: JSON-based storage (scalable to database).

## 📝 Usage

1.  **Start Backend**: `cd cqi/backend && bun start`
2.  **Start Frontend**: `cd cqi/frontend && bun run dev`
3.  **Login**: Use `admin` / `password123`.
4.  **Explore**: Select Department -> Programme -> ... -> Course to view analytics.
