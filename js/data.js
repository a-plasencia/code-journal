/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

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

var $entryForm = document.querySelector('[data-entry]');
var $entries = document.querySelector('[data-view]');
var $hrefEntries = document.querySelector('.href-entries-list');
var $hrefNewEntries = document.querySelector('.href-new-entries');
var $button = document.querySelector('button');

function viewChange(event) {
  if (event.target && event.target.matches('.href-new-entries')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }

  if (event.target && event.target.matches('.href-entries-list')) {
    $entries.className = '';
    $entryForm.className = 'hidden';
    data.view = 'entries';
  }

  if (event.target && event.target.matches('button')) {
    $entries.className = '';
    $entryForm.className = 'hidden';
    data.view = 'entries';
    renderEntries(data);
    window.addEventListener('submit', renderEntreesLoading);
  }
}

$button.addEventListener('click', viewChange);
$hrefEntries.addEventListener('click', viewChange);
$hrefNewEntries.addEventListener('click', viewChange);

function renderEntreesLoading(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderEntriesAppear = renderEntries(data.entries[i]);
    $ul.appendChild(renderEntriesAppear);
  }
}

window.addEventListener('DOMContentLoaded', renderEntreesLoading);

function grabLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('cj-entry', dataJSON);
}

var previousDataJSON = localStorage.getItem('cj-entry');
if (previousDataJSON !== null) {
  previousDataJSON = JSON.parse(previousDataJSON);
  data.entries = previousDataJSON.entries;
  data.nextEntryId = previousDataJSON.nextEntryId;
  data.view = previousDataJSON.view;
}

if (previousDataJSON.view === 'entry-form') {
  $entryForm.className = '';
  $entries.className = 'hidden';
} else {
  $entries.className = '';
  $entryForm.className = 'hidden';
}

window.addEventListener('beforeunload', grabLocalStorage);
