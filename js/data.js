/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function grabLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('cj-entry', dataJSON);
}

var previousDataJSON = localStorage.getItem('cj-entry');
if (previousDataJSON !== null) {
  previousDataJSON = JSON.parse(previousDataJSON);
  data.entries = previousDataJSON.entries;
  data.nextEntryId = previousDataJSON.nextEntryId;
}
window.addEventListener('beforeunload', grabLocalStorage);
