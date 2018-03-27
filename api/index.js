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
  setTimeout(() => {
    let page = 0;
    let pageSize;

    if(req.params.pageSize) {
      pageSize = req.params.pageSize;
    } else {
      pageSize = 10;
    }

    if(req.params.page) {
      page = req.params.page;
    }

    projects.data.pageSize = pageSize;
    projects.data.page = page;
    projects.data.totalCount = projects.data.items.length;

    res.send(projects.data)
  }, 2000);
});


app.get('/api/elements/grid', (req, res) => {
  setTimeout(() => res.send(projects.grid), 3000);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
