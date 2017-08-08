const _ = require('lodash');
const mongo = require('./mongo');
const buildQuery = require('./search-query-builder');

const collectionName = 'trash';

function sortByOccurence(trash) {
  if (!trash.occurence) return 2;
  return { 'CLICHE': 3, 'NORMAL': 2, 'RARE': 1 }[trash.occurence];
}

module.exports = mytrash = {
  listAll: function (text) {
    console.log('MONGO: Calling mongo.listAll');
    if (text) {
      return mytrash.findText(collectionName, text);
    } else {
      return mongo.listAll(collectionName).then((arr) => _.sortBy(arr, [sortByOccurence, 'last_edit_date']).reverse());
    }
  },

  findText: (collectionName, text) => {
    const query = buildQuery(text);
    return mongo.find(collectionName, { query: query });
  },

}
