const express = require('express');
const app = express();

Array.prototype.keySort = function (keys) {

  keys = keys || {};

  var obLen = function (obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key))
        size++;
    }
    return size;
  };

  var obIx = function (obj, ix) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (size == ix)
          return key;
        size++;
      }
    }
    return false;
  };

  var keySort = function (a, b, d) {
    d = d !== null ? d : 1;
    // a = a.toLowerCase(); // this breaks numbers
    // b = b.toLowerCase();
    if (a == b)
      return 0;
    return a > b ? 1 * d : -1 * d;
  };

  var KL = obLen(keys);

  if (!KL)
    return this.sort(keySort);

  for (var k in keys) {
    // asc unless desc or skip
    keys[k] =
      keys[k] == 'desc' || keys[k] == -1 ? -1
        : (keys[k] == 'skip' || keys[k] === 0 ? 0
        : 1);
  }

  this.sort(function (a, b) {
    var sorted = 0, ix = 0;

    while (sorted === 0 && ix < KL) {
      var k = obIx(keys, ix);
      if (k) {
        var dir = keys[k];
        sorted = keySort(a[k], b[k], dir);
        ix++;
      }
    }
    return sorted;
  });
  return this;
};

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
  let sortMapper = {};

  if (req.param('sort')) {
    let sort = req.param('sort').split(',');

    sort.map((e) => {
      let tmpE = e.split('.');

      sortMapper[tmpE[1]] = tmpE[0];
    });
  }

  let response = {
    items: [],
    totalCount: projects.data.items.length,
    itemsPerPage: parseInt(req.param('itemsPerPage')) || 10,
    currentPage: parseInt(req.param('currentPage')) || 1
  };

  projects.data.items = projects.data.items.keySort(sortMapper);

  response.items = projects.data.items.slice(((response.currentPage - 1) * response.itemsPerPage),
    ((response.currentPage) * response.itemsPerPage));



  setTimeout(() => {
    res.send(response)
  }, 100);
});


app.get('/api/elements/options', (req, res) => {
  setTimeout(() => res.send(projects.grid), 300);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
