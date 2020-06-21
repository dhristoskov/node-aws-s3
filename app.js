const express = require('express');

const dataRoutes = require('./routes/data-route')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/data', dataRoutes)


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));