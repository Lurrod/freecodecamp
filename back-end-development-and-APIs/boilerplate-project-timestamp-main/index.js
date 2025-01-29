// index.js
// where your node app starts

// Initialize project
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for remote testing by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // Legacy browsers might choke on 204

// Serve static files
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return a greeting
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// API endpoint for date handling
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Handle empty parameter (current date)
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(Number(dateParam))) {
    // If the parameter is a timestamp
    date = new Date(Number(dateParam));
  } else {
    // Otherwise, attempt to parse as a date string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
