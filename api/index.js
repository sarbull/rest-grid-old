const express = require('express');
const app = express();

const projects = {
  data: require('./elements/data.json'),
  grid: require('./elements/grid.json')
};

app.get('/api/elements', (req, res) => {
  setTimeout(() => res.send(projects.data), 2000);
});
app.get('/api/elements/grid', (req, res) => res.json(projects.grid));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
