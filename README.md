# Money Manager

## Description
A personal finance tracking application to help users manage financial transactions with ease that features:
- Secure login and registration
- Easy management of incomes and expenses
- Intuitive visualization of transaction history

![Dashboard](https://github.com/jasonchen17/money_manager/blob/main/screenshots/dashboard.png?raw=true)

## Built With
- **Frontend**: React, Vite, Styled Components
- **Backend**: Node, Express
- **Database**: MongoDB

## Prerequisites
- Node
- npm
- MongoDB

## Installation
1. **Clone the repository**
    ```shell
    git clone https://github.com/jasonchen17/money_manager.git
    
    cd money_manager
    ```

2. **Create a `.env` file in the `backend` directory**
- Make sure MongoDB is running and add your connection string along with the port and JWT secret variable
&nbsp;

    ```text
    MONGO_URL=<your_mongodb_connection_string>
    PORT=3000
    JWT_SECRET=jwttokenkey
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    
    npm install
    ```

4. **Install frontend dependencies**
    ```bash
    cd frontend
    
    npm install
    ```

## Usage
1. **Start the backend server**
    ```bash
    cd backend
    
    npm start
    ```

2. **Open a second terminal and start the frontend application**
    ```bash
    cd frontend
    
    npm run dev
    ```

3. **Open your browser and go to [http://localhost:5173](http://localhost:5173) to view the application**
