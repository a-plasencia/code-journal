/* global data */
/* exported data */

var $createEntry = document.querySelector('#create-entry');
var $photoUrl = document.querySelector('#photo-entry');
var $img = document.querySelector('img');
var $p = document.querySelector('.p-entries');
function photoChange(event) {
  $img.src = event.target.value;
}

function submitEntryForm(event) {
  event.preventDefault();
  var titleValue = $createEntry.elements.title.value;
  var photoUrlValue = $createEntry.elements.photoUrl.value;
  var notesValue = $createEntry.elements.notes.value;

  var newEntryObject = {
    title: titleValue,
    photoUrl: photoUrlValue,
    notes: notesValue
  };

  newEntryObject.EntryId = data.nextEntryId;
  data.entries.unshift(newEntryObject);
  var renderNewObject = renderEntries(data.entries[0]);
  $ul.prepend(renderNewObject);
  data.nextEntryId++;
  $img.src = 'images/placeholder-image-square.jpg';
  $entries.className = '';
  $entryForm.className = 'hidden';
  $p.className = 'hidden';
  data.view = 'entries';
  $createEntry.reset();
}

var $entryForm = document.querySelector('[data-entry]');
var $entries = document.querySelector('[data-view]');
var $hrefEntries = document.querySelector('.href-entries-list');
var $hrefNewEntries = document.querySelector('.href-new-entries');

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
  divColumn2.setAttribute('class', 'column-half justify-between');
  divRow.appendChild(divColumn2);

  var h1Title = document.createElement('h1');
  h1Title.textContent = dataEntries.title;
  divColumn2.appendChild(h1Title);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa fa-solid fa-pen');
  divColumn2.appendChild(icon);

  var divColumn3 = document.createElement('div');
  divColumn3.setAttribute('class', 'column-half');
  divRow.appendChild(divColumn3);

  var pNotes = document.createElement('p');
  pNotes.textContent = dataEntries.notes;
  divColumn3.appendChild(pNotes);

  return listedElement;
}

var $ul = document.querySelector('ul');

function renderEntriesLoading(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderEntriesAppear = renderEntries(data.entries[i]);
    $ul.appendChild(renderEntriesAppear);
  }
}

window.addEventListener('DOMContentLoaded', renderEntriesLoading);

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

}

$hrefEntries.addEventListener('click', viewChange);
$hrefNewEntries.addEventListener('click', viewChange);

if (data.view === 'entry-form') {
  $entryForm.className = '';
  $entries.className = 'hidden';
} else {
  $entries.className = '';
  $entryForm.className = 'hidden';
}

if (data.entries.length !== 0) {
  $p.className = 'hidden';
}

$createEntry.addEventListener('submit', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);
