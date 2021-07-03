import { $, $$ } from './js/utils.js';
import { load, save } from './js/storage.js';

export function create_task(task, complete) {
  const el = document.createElement('task-item');
  el.task = task;
  el.complete = complete;

  el.addEventListener('complete', save);
  el.addEventListener('change', save);
  el.addEventListener('delete', save);

  return el;
}

function add_task() {
  const new_task = $('#new-task');
  const task = new_task.value.trim();
  if (task !== '') {
    $('#complete-all').checked = false;
    $('task-list').appendChild(create_task(task, false));
  }
  new_task.value = '';
  save();
}

// Event handling
$('#complete-all').addEventListener('change', () => {
  const value = $('#complete-all').checked;
  for (const el of $$('task-item')) {
    el.complete = value;
  }
  save();
});

$('#new-task').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    add_task();
  }
});

$('#add-task').addEventListener('click', add_task);

$('#filter').addEventListener('change', () => {
  $('main').dataset.filter = $('input[name="filter"]:checked').value;
  save();
});

$('#clear-completed').addEventListener('click', () => {
  for (const el of $$('task-item.complete')) {
    el.remove();
  }
  save();
});

// Load saved state from localStorage.
load();
