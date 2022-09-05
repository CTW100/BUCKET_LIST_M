// npm modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// custom modules
const mainRouter = require('./routers/main');
const bucketRouter = require('./routers/bucket');

mongoose
	.connect('mongodb://127.0.0.1:27017')
	.then(() => console.log('DB CONNECTED!'))
	.catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', mainRouter);
app.use('/api/bucket', bucketRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
