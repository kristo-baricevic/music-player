const express = require('express');

const app = express();

const port = 3000;

app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/static', express.static('storage'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/songs', (req, res) => {
    // Logic to fetch songs
    res.json({ songs: ['song1', 'song2', 'song3'] });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Aw here we go.');
});
  
  