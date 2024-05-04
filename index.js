import { $, $$ } from './js/utils.js';
import { load, save } from './js/storage.js';

// Module-level constants for element references that are reused.
const MAIN = $('#main');
const COMPLETE_ALL = $('#complete-all');
const NEW_TASK = $('#new-task');
const TASK_LIST = $('#task-list');

// Create a new `task-item` element.
export function create_task(task, complete) {
  const el = document.createElement('task-item');
  el.task = task;
  el.complete = complete;

  el.addEventListener('complete', save);
  el.addEventListener('change', save);
  el.addEventListener('delete', save);

  return el;
}

// Add a task to the list.
function add_task() {
  const task = NEW_TASK.value.trim();
  if (task !== '') {
    COMPLETE_ALL.checked = false;
    TASK_LIST.appendChild(create_task(task, false));
  }
  NEW_TASK.value = '';
  save();
}

// Event handling
COMPLETE_ALL.addEventListener('change', () => {
  const value = COMPLETE_ALL.checked;
  for (const el of $$('task-item')) {
    el.complete = value;
  }
  save();
});

NEW_TASK.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    add_task();
  }
});

$('#add-task').addEventListener('click', add_task);

$('#filter').addEventListener('change', save);

$('#clear-completed').addEventListener('click', () => {
  for (const el of $$('task-item.complete')) {
    el.remove();
  }
  save();
});

// Load saved state from localStorage.
load();
