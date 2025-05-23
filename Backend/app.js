const dotenv = require('dotenv');
const express = require('express');

const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();



const app = express();
app.use(express.json());

app.use(cors());

connectDB();


app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/appointments',require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
