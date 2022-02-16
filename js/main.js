/* global data */
/* exported data */

var $createEntry = document.querySelector('#create-entry');
var $photoUrl = document.querySelector('#photo-entry');
var $img = document.querySelector('img');

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
  data.nextEntryId++;
  $img.src = 'images/placeholder-image-square.jpg';
  $createEntry.reset();
}

$createEntry.addEventListener('submit', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);
