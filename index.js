const express = require('express');
const fs = require('fs');
const path = require('path');
// mock data
const { mockDataServer } = require('./mock-data-server');
// requiring elasticsearch
const app = express();
const port = 3000;
// Create an instance of the http server to handle HTTP requests
app.use(express.static('../directory-client'));

app.get('/', (req, res) => {

});

//route created for sending mock data to client
app.get('/mock_data', (req, res) => {
    res.send(mockDataServer);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))