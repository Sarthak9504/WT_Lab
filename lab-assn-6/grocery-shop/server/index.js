const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api', require('./routes/productRoutes'));

app.listen(5000, () => console.log('Server running on port 5000'));
