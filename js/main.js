/* global data */
/* exported data */

var $createEntry = document.querySelector('#create-entry');
var $photoUrl = document.querySelector('#photo-entry');
var $img = document.querySelector('img');
var $editH1 = document.querySelector('.edit-entry');
var $newH1 = document.querySelector('.new-entry');
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
  listedElement.setAttribute('data-entry-id', 'entry-id');

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

  var divJustify = document.createElement('div');
  divJustify.setAttribute('class', 'justify-between');
  divColumn2.appendChild(divJustify);

  var h1Title = document.createElement('h1');
  h1Title.textContent = dataEntries.title;
  divJustify.appendChild(h1Title);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa fa-solid fa-pen');
  divJustify.appendChild(icon);

  var divNoJustify = document.createElement('div');
  divColumn2.appendChild(divNoJustify);

  var pNotes = document.createElement('p');
  pNotes.textContent = dataEntries.notes;
  divNoJustify.appendChild(pNotes);

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

function chooseToEdit(event) {
  if (event.target && event.target.matches('i')) {
    var getEntry = event.target.closest('[data-entry-id]');

    var $liList = document.querySelectorAll('[data-entry-id]');

    for (var i = 0; i < $liList.length; i++) {
      if ($liList[i] === getEntry) {
        var titleEdit = data.entries[i].title;
        var photoUrlEdit = data.entries[i].photoUrl;
        var notesEdit = data.entries[i].notes;
        data.editing = data.entries[i].EntryId;
        $createEntry.elements.title.value = titleEdit;
        $createEntry.elements.photoUrl.value = photoUrlEdit;
        $createEntry.elements.notes.value = notesEdit;
        $img.src = photoUrlEdit;
      }
    }
  }
}
$ul.addEventListener('click', chooseToEdit);
$createEntry.addEventListener('click', chooseToEdit);

function viewChange(event) {
  if (event.target && event.target.matches('.href-new-entries')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }

  if (event.target && event.target.matches('.href-entries-list')) {
    $entries.className = '';
    $entryForm.className = 'hidden';
    $editH1.className = 'edit-entry hidden';
    $newH1.className = 'new-entry ';
    $createEntry.reset();
    $img.src = 'images/placeholder-image-square.jpg';
    data.view = 'entries';
  }

  if (event.target && event.target.matches('i')) {
    $entries.className = 'hidden';
    $entryForm.className = '';
    $editH1.className = 'edit-entry ';
    $newH1.className = 'new-entry hidden';
    data.view = 'edit';
  }
}

$ul.addEventListener('click', viewChange);
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
