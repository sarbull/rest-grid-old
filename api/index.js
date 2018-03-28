const express = require('express');
const app = express();


// {
//   last: false,                                 // isLastPage() infinite scroll(if needed)
//   first: true                                  // isFirstPage()
//   totalPages: 16,                              // total pages calculated in the backend "per page"

//   sort: 'asc.column1,asc.column2,desc.column3' // on output is not needed
//   totalElements: 5000,                         // all items in database
//   numberOfElements: 500                        // number of elements brought
//   size: 500                                    // number of elements requests
//   number: 2                                    // current page
// }

const projects = {
  data: require('./elements/data.json'),
  grid: require('./elements/grid.json')
};

app.get('/api/elements', (req, res) => {
  let response = {
    items: [],
    totalCount: projects.data.items.length,
    itemsPerPage: parseInt(req.param('itemsPerPage')) || 10,
    currentPage: parseInt(req.param('currentPage')) || 1
  };

  response.items = projects.data.items.slice(((response.currentPage-1)*response.itemsPerPage),
    ((response.currentPage)*response.itemsPerPage));

  setTimeout(() => {
    res.send(response)
  }, 2000);
});


app.get('/api/elements/options', (req, res) => {
  setTimeout(() => res.send(projects.grid), 3000);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
