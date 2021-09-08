/* global data */
/* exported data */
var $input = document.querySelector('#photo');
var $img = document.querySelector('.update-img');
var $form = document.querySelector('form');
var $imgSrc = './images/placeholder-image-square.jpg';

function handleEntry(event) {
  if ($input.value === '') {
    $img.src = $imgSrc;
  } else {
    $img.src = $input.value;
  }

}
$input.addEventListener('input', handleEntry);

function handleSubmit(event) {
  event.preventDefault();

  var obj = {
    name: $form.name.value,
    url: $form.url.value,
    notes: $form.notes.value,
    nextEntryId: data.nextEntryId++
  };
  data.entries.unshift(obj);
  $img.src = $imgSrc;

  $form.reset();
}

$form.addEventListener('submit', handleSubmit);
