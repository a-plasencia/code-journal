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
  // console.log('the value of the data object is', data);
  $img.src = 'images/placeholder-image-square.jpg';
  $createEntry.reset();
}

$createEntry.addEventListener('submit', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);

// var data = {
//   view: 'entry-form',
//   entries: [],
//   editing: null,
//   nextEntryId: 1
// };

// console.log('the value of $img is: ', $img.src);
// var photoUrlValue = $createEntry.elements.photoUrl.value;
// console.log('the value of the photourlvalue is: ', photoUrlValue);
// console.log('the value of $createEntry is:', $createEntry);
// console.log('the value of entryfromdata is: ', entryFromData);
// console.log('the array is here', data.entries);
// The console logs below worked in the submitEntryForm function properly
// console.log('the value of titlevalue: is ', titleValue);
// console.log('the value of photoUrlValue is: ', photoUrlValue);
// console.log('the value of notesValue is: ', notesValue);
// console.log('the value of newEntryObject is', newEntryObject);
// console.log('the value of newentry object is: ', newEntryObject);
