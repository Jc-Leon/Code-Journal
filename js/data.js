/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function handleStorage(event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('values', todosJSON);
}
var previousDataJSON = localStorage.getItem('values');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', handleStorage);
