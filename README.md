# React Native Client

## 📌 Project Overview
This is the **React Native** client for the medical application, built using **Expo** for easy development and deployment. The app leverages **React Native Paper** for UI components, **@react-navigation** for navigation, and **Redux** for state management. Code consistency is ensured using **ESLint** and **Prettier**.

## 🛠️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **npm**
- **Expo CLI** (install with `npm install -g expo-cli`)

### 1️⃣ Clone the Repository
```bash
git clone <repository_url>
cd <project_directory>
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Application
To start the development server, run:
```bash
npm run start
```
This will launch the Expo developer tools, allowing you to run the app on an emulator or a physical device.

### 4️⃣ Running on a Device
- Install the **Expo Go** app on your Android/iOS device.
- Scan the QR code from the Expo developer tools to launch the app.

### 5️⃣ Code Formatting and Linting
To maintain code quality, the project uses **ESLint** and **Prettier**.

#### Run ESLint
```bash
npm run lint
```

#### Fix ESLint Issues Automatically
```bash
npm run lint:fix
```

#### Run Prettier
```bash
npm run prettier:write
```

## 🏛️ Architecture Decisions
- **Expo Managed Workflow**: Chosen for fast development and deployment.
- **React Native Paper**: Used for a consistent and accessible UI.
- **Redux**: Centralized state management for better maintainability.
- **@react-navigation** (Stack Navigation): Used for handling screen transitions.
- **Modular Code Structure**: Components and features are organized into separate folders.

## ✨ Features Implemented
### Navigation
- Implemented **Stack Navigation** using **@react-navigation**.

### Authentication
- Phone-based login integrated with the backend API.
- **Logout functionality** implemented.

### Appointments
- View upcoming and past appointments.
- Book a new appointment.
- Cancel an existing appointment.
- Update the time of an appointment.
- option to add reminder in calendar for upcoming appointments.

### Appointment Booking Flow
1. **Select a Medical Field** - The user first selects the type of medical service they need.
2. **Select a Doctor** - Based on the selected medical field, a list of available doctors is displayed.
3. **Select a Time Slot** - The user chooses an available appointment slot based on the doctor’s working days and available slots.
4. **Confirm Appointment** - A summary dialog is displayed where the user can approve the appointment before finalizing.

## 🚀 Deployment Details
### 🌐 Running in Production
To create a production build:
```bash
expo build:android
# OR
expo build:ios
```
You can then distribute the build via Google Play or the App Store.


