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
$input.addEventListener('blur', handleEntry);

function handleSubmit(event) {
  event.preventDefault();

  if (data.editing !== null) {
    data.editing.title = $form.title.value;
    data.editing.url = $form.url.value;
    data.editing.notes = $form.notes.value;

    for (var i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryID.toString() === data.editing.entryID.toString()
      ) {
        data.entries[i] = data.editing;
        data.editing = null;
        var oldEntry = document.querySelector(
          `li[data-entry-id="${data.entries[i].entryID}"]`
        );
        var newEdit = createEntry(data.entries[i]);
        oldEntry.replaceWith(newEdit);
        return;
      }
    }
  }

  var obj = {
    title: $form.title.value,
    url: $form.url.value,
    notes: $form.notes.value,
    entryID: data.nextEntryId++
  };
  data.entries.unshift(obj);
  $img.src = $imgSrc;

  $ul.prepend(createEntry(obj));

  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function createEntry(entry) {
  var li = document.createElement('li');
  li.setAttribute('data-entry-id', entry.entryID);

  var row = document.createElement('div');
  row.className = 'row';
  li.appendChild(row);

  var half = document.createElement('div');
  half.className = 'column-half';
  row.append(half);

  var img = document.createElement('img');
  img.setAttribute('src', entry.url);
  half.appendChild(img);

  var otherHalf = document.createElement('div');
  otherHalf.className = 'column-half';
  row.append(otherHalf);

  var title = document.createElement('h3');
  title.textContent = entry.title;
  title.className = 'title-edit';
  otherHalf.appendChild(title);

  var edit = document.createElement('i');
  edit.className = 'fas fa-pen';
  title.appendChild(edit);

  var p = document.createElement('p');
  p.textContent = entry.notes;
  otherHalf.appendChild(p);

  return li;
}

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newLi = createEntry(data.entries[i]);

    $ul.appendChild(newLi);
  }
}
window.addEventListener('DOMContentLoaded', handleLoad);

var $view = document.querySelectorAll('.view');

function switchView(view) {
  for (var i = 0; i < $view.length; i++) {
    var views = $view[i];
    if (views.getAttribute('data-view') === view) {
      views.className = 'view';
    } else {
      views.className = 'view hidden';
    }
  }
}
function handleViewNavigation(event) {
  if (!event.target.getAttribute('data-view')) {
    return;
  }
  var views = event.target.getAttribute('data-view');
  switchView(views);
}

document.addEventListener('click', handleViewNavigation);

var $name = document.querySelector('#name');
var $photo = document.querySelector('#photo');
var $notes = document.querySelector('#notes');

function handleEdit(event) {
  var entryID = event.target.closest('li').getAttribute('data-entry-id');
  if (event.target.className !== 'fas fa-pen') {
    return;
  }
  switchView(data.view);

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID.toString() === entryID.toString()) {
      var name = data.entries[i].title;
      var notes = data.entries[i].notes;
      var photo = data.entries[i].url;
      $name.value = name;
      $photo.value = photo;
      $notes.textContent = notes;
      data.editing = data.entries[i];
    }
  }
  handleEntry();
}
$ul.addEventListener('click', handleEdit);
