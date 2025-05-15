const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const fs = require('fs');
const cors = require('cors');
app.use(cors());
// Middleware to handle JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API route to send booking.json data
app.post('/api/bookings', (req, res) => {
  const { message } = req.body;
  // You can use the message for filtering or logging if needed
  console.log("Received message from chatbot:", message);

  const bookingPath = path.join(__dirname, './data/booking.json');
  fs.readFile(bookingPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read booking data' });
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
