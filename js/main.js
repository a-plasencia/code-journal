/* global data */
/* exported data */

var $createEntry = document.querySelector('#create-entry');
var $photoUrl = document.querySelector('#photo-entry');
var $img = document.querySelector('img');
function photoChange(event) {
  $img.src = event.target.value;
}

function submitEntryForm(event) {

}

$createEntry.addEventListener('input', submitEntryForm);
$photoUrl.addEventListener('input', photoChange);
// console.log('the value of $img is: ', $img.src);
// var photoUrlValue = $createEntry.elements.photoUrl.value;
// console.log('the value of the photourlvalue is: ', photoUrlValue);
// console.log('the value of $createEntry is:', $createEntry);
