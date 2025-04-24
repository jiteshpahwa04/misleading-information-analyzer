const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Counter to track request cycles
let requestCounter = 0;

// POST /analyze endpoint
app.post('/analyze', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required in the request body." });
  }

  // Determine result based on counter: 3 true, 1 false, repeat
  const isPositive = requestCounter % 4 != 0 ;

  // Increment counter for next request
  requestCounter++;

  // Return the result
  res.status(200).json({
    input: text,
    result: isPositive
  });
});

app.get("/", (req, res)=>{
  res.status(200).json({
    success: true,
    message: "Server is running"
  })
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});