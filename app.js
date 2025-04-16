const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes); 
// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Item CRUD API',
      version: '1.0.0',
      description: 'A simple CRUD API using Node.js and MongoDB',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Make sure your route files have Swagger comments
};


const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js + MongoDB CRUD API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
