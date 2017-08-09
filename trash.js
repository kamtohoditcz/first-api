const _ = require('lodash');
const mongo = require('./mongo');
const buildQuery = require('./search-query-builder');

const collectionName = 'trash';

function sortByOccurence(trash) {
  if (!trash.occurence) return 2;
  return { 'CLICHE': 1, 'NORMAL': 2, 'RARE': 3 }[trash.occurence];
}

module.exports = mytrash = {
  listAll: function (text) {
    const query = buildQuery(text);
    return mongo.find(collectionName, { query: query })
      .then((arr) => _.map(arr, (a) => _.pick(a, ['name', 'description', 'imagePath'])))
      .then((arr) => _.sortBy(arr, [sortByOccurence, 'name']));
  },
}
