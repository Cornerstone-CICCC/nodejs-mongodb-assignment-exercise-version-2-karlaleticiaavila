import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;
mongoose
  .connect("mongodb+srv://<db_user>:<db_password>@ciccc.o8yo3tc.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<cluster_name>")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));