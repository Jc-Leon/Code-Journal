/* global data */
/* exported data */
var $input = document.querySelector('#photo');
var $img = document.querySelector('.update-img');
var $form = document.querySelector('form');
var $imgSrc = './images/placeholder-image-square.jpg';
var $ul = document.querySelector('ul');

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
    title: $form.title.value,
    url: $form.url.value,
    notes: $form.notes.value,
    nextEntryId: data.nextEntryId++
  };
  data.entries.unshift(obj);
  $img.src = $imgSrc;

  $ul.prepend(createEntry(obj));
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function createEntry(entry) {
  var li = document.createElement('li');
  var row = document.createElement('div');
  row.className = ('row');
  li.appendChild(row);

  var half = document.createElement('div');
  half.className = ('column-half');
  row.append(half);

  var img = document.createElement('img');
  img.setAttribute('src', entry.url);
  half.appendChild(img);

  var otherHalf = document.createElement('div');
  otherHalf.className = ('column-half');
  row.append(otherHalf);

  var title = document.createElement('h3');
  title.textContent = entry.title;
  otherHalf.appendChild(title);

  var p = document.createElement('p');
  p.textContent = entry.notes;
  otherHalf.appendChild(p);

  return li;
}
window.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var newLi = createEntry(data.entries[i]);

    $ul.appendChild(newLi);
  }
});

var $view = document.querySelectorAll('.view');

function handleContainer(view) {
  if (!event.target.matches('.click')) {
    return;
  }
  for (var i = 0; i < $view.length; i++) {
    var views = $view[i];
    if (views.getAttribute('data-view') === event.target.getAttribute('data-view')) {
      views.className = 'view';
    } else {
      views.className = 'view hidden';
    }
  }
}
document.addEventListener('click', handleContainer);
