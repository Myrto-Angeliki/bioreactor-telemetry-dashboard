# Bioreactor Telemetry Dashboard
The project is 85% complete. The only functionality that I didn't manage to implement on time, is the Threshold Configuration Form 
in the Next.js Frontend Application. 

## Prerequisites

Before running the project locally, ensure you have the following installed on your machine:
* **Node.js** (v18+ recommended)
* **npm** (comes with Node.js) or **yarn** / **pnpm**

---

## Local Installation & Running Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bioreactor-telemetry-dashboard-backend
   ```
2. Install the required dependencies:
    ```bash 
    npm install
    ```
3. Start the backend development server:
    ```bash
    npm run start:dev
    ```
    The backend server will run on http://localhost:3001

### 2. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd bioreactor-telemetry-dashboard-frontend
    ```
2. Install the required dependencies:
    ```bash 
    npm install
    ```
3. Start the frontend development server:
    ```bash 
    npm run dev
    ```
    The frontend will run on http://localhost:3000

<br />

---

## Tech Stack & Key Dependencies

### Frontend
* **Next.js** (Initialized with standard framework defaults)
* **TypeScript** (`^5`)
* **Tailwind CSS** (`^4`)
* **Recharts** (`^3.10.1`) – Explicitly installed for rendering interactive sensor telemetry and data visualization charts.

### Backend
* **NestJS** (Modular backend framework)
* **class-validator** (`^0.15.1`) – Explicitly installed for robust schema and DTO validation.
* **class-transformer** (`^0.5.1`) – Explicitly installed for object serialization and payload transformation.

---

### Code Structure
The codebase is structured around a modular architecture for both the backend and the frontend. The complexities of each problem were broken up into smaller, more manageable parts. The backend uses class-validator for clean data-transfer-object validation. The frontend custom components seperate concerns into smaller and more managable structures. Tailwind CSS and Recharts are integrated into the components to display live telemetry streams and metrics. 

### Challenges Encountered
I had not worked with neither NestJS nor Next.js before, so I spent a significant portion of my time trying to become familiar with these frameworks. Some noteworthy challenges that I faced include: trying to use the fields of a DTO to produce a constraint for the same DTO (e.g. min has to be less than max) while the DTO was yet undefined, understanding the importance of imports and exports inside modules in NestJS in order to achieve Dependency Injection (e.g. my singleton service was not automatically shared between controllers of different modules), understanding the difference between Server and Client Components in Next.js and lastly, maintaining Type Safety in both frontend and backend.
I would also like to note that I did not use any LLMs for code generation, so that I would have a more in-depth understanding on how to use these technologies. This choice, however, made the process of completing the project slower and less optimized.
