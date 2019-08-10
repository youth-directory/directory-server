const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
// Create an instance of the http server to handle HTTP requests\
app.use(express.static('../garo-estate-master'));
app.get('/', (req, res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))