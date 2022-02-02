require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');


const port = process.env.PORT || 5000;

const app = express();


const { setupRoutes } = require('./routes');

app.use(cookieParser());

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
setupRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
