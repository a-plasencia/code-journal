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

function renderEntries(dataEntries) {
  var listedElement = document.createElement('li');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  listedElement.appendChild(divRow);

  var divColumn1 = document.createElement('div');
  divColumn1.setAttribute('class', 'column-half');
  divRow.appendChild(divColumn1);

  var entryImg = document.createElement('img');
  entryImg.setAttribute('src', dataEntries.photoUrl);
  entryImg.setAttribute('class', 'entry-image');
  divColumn1.appendChild(entryImg);

  var divColumn2 = document.createElement('div');
  divColumn2.setAttribute('class', 'column-half');
  divRow.appendChild(divColumn2);

  var h1Title = document.createElement('h1');
  h1Title.textContent = dataEntries.title;
  divColumn2.appendChild(h1Title);

  var pNotes = document.createElement('p');
  pNotes.textContent = dataEntries.notes;
  divColumn2.appendChild(pNotes);

  return listedElement;
}

var $ul = document.querySelector('ul');

function renderEntreesLoading(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderEntriesAppear = renderEntries(data.entries[i]);
    $ul.appendChild(renderEntriesAppear);
  }
}

window.addEventListener('DOMContentLoaded', renderEntreesLoading);
