const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => res.json({ success: true }));

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
