import { $, $$ } from './utils.js';
import { create_task } from './index.js';

export function load() {
  try {
    // Load tasks.
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const fragment = document.createDocumentFragment();
    for (const [task, complete] of Object.entries(tasks)) {
      fragment.appendChild(create_task(task, complete));
    };
    $('task-list').appendChild(fragment);

    // Load filter.
    $(`#filter-${localStorage.getItem('filter')}`).click();
  } catch(e) {}
}

export function save() {
  // Save tasks.
  const tasks = {};
  for (const el of $$('task-item')) {
    tasks[el.task] = el.complete;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Save filter.
  const filter = $('input[name="filter"]:checked').value;
  localStorage.setItem('filter', filter);
}
