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

var $entryForm = document.querySelector('[data-entry]');
var $entries = document.querySelector('[data-view]');
var $hrefEntries = document.querySelector('.href-entries-list');
var $hrefNewEntries = document.querySelector('.href-new-entries');

function viewChange(event) {
  if (event.target && event.target.matches('.href-new-entries')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
  }

  if (event.target && event.target.matches('.href-entries-list')) {
    $entries.className = '';
    $entryForm.className = 'hidden';

  }
}

$hrefEntries.addEventListener('click', viewChange);
$hrefNewEntries.addEventListener('click', viewChange);
$createEntry.addEventListener('submit', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);

// The below console logs have all been quaried properly
// console.log('the value of $entryForm is', $entryForm);
// console.log('the value of $hrefEntries is: ', $hrefEntries);
// console.log('the value of $hrefNew is: ', $hrefNew);
// console.log('the value of $entries is: ', $entries);
// console.log('event.targets value is ', event.target);
// console.log('event.target.matches current value is ', event.target.matches('.href-entries-list'));
// console.log('event.targets value is ', event.target);
// console.log('event.target.matches current value is ', event.target.matches('.href-new-entries'));
