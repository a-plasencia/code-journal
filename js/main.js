/* global data */
/* exported data */

var $createEntry = document.querySelector('#create-entry');
var $photoUrl = document.querySelector('#photo-entry');
var $img = document.querySelector('img');
var $newH1 = document.querySelector('.new-entry');
var $p = document.querySelector('.p-entries');
var $hrefEntries = document.querySelector('.href-entries-list');
var $hrefNewEntries = document.querySelector('.href-new-entries');

function photoChange(event) {
  $img.src = event.target.value;
}

function renderEntries(dataEntries) {
  var listedElement = document.createElement('li');
  listedElement.setAttribute('data-entry-id', dataEntries.EntryId);

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
    viewChange('entry-form');
    $newH1.textContent = 'Edit Entry';
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

function submitEntryForm(event) {
  event.preventDefault();
  var titleValue = $createEntry.elements.title.value;
  var photoUrlValue = $createEntry.elements.photoUrl.value;
  var notesValue = $createEntry.elements.notes.value;
  var $liList = document.querySelectorAll('[data-entry-id]');

  var newEntryObject = {
    title: titleValue,
    photoUrl: photoUrlValue,
    notes: notesValue
  };

  newEntryObject.EntryId = data.nextEntryId;
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].EntryId) {
        data.entries[i].title = titleValue;
        data.entries[i].photoUrl = photoUrlValue;
        data.entries[i].notes = notesValue;
        var getAttributeLi = $liList[i].getAttribute('data-entry-id');
        getAttributeLi = JSON.parse(getAttributeLi);
        if (data.editing === getAttributeLi) {
          var getUpdatedEntry = renderEntries(data.entries[i]);
          $liList[i].replaceWith(getUpdatedEntry);
        }
      }
    }
  } else {
    data.entries.unshift(newEntryObject);
    var renderNewObject = renderEntries(data.entries[0]);
    $ul.prepend(renderNewObject);
    data.nextEntryId++;
  }
  $img.src = 'images/placeholder-image-square.jpg';
  $p.className = 'hidden';
  data.view = 'entries';
  data.editing = null;
  viewChange('entries');
  $createEntry.reset();
}

$ul.addEventListener('click', chooseToEdit);
$createEntry.addEventListener('click', chooseToEdit);

function viewChange(entryView) {
  var $views = document.querySelectorAll('[data-view]');
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === entryView) {
      $views[i].className = '';
    } else { $views[i].className = ' hidden'; }
  }
}

$hrefEntries.addEventListener('click', function () {
  data.view = 'entries';
  viewChange('entries');
});

$hrefNewEntries.addEventListener('click', function () {
  $createEntry.reset();
  $newH1.textContent = 'New Entry';
  $img.src = 'images/placeholder-image-square.jpg';
  data.view = 'entry-form';
  viewChange('entry-form');
});

if (data.view === 'entry-form') {
  viewChange('entry-form');
}

if (data.view === 'entries') {
  viewChange('entries');
}
if (data.entries.length !== 0) {
  $p.className = 'hidden';
}

$createEntry.addEventListener('submit', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);
