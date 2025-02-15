const express = require('express');
const app = express();
const cards = require('./cards'); // Assuming you have a cards module

app.set('view engine', 'ejs');
app.set('views', './views');

// ...existing code...

app.get('/filter', (req, res) => {
  const type = req.query.type;
  let filteredCards = cards;

  if (type) {
    filteredCards = cards.filter(card => card.type === type);
  }

  res.render('partials/cards', { cards: filteredCards });
});

// ...existing code...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
