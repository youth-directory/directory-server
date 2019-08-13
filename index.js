const express = require('express');
const fs = require('fs');
const path = require('path');
// requiring elasticsearch
const app = express();
const port = 3000;
// Create an instance of the http server to handle HTTP requests\
app.use(express.static('../directory-client'));

app.get('/', (req, res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))