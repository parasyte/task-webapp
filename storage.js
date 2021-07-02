import { $, $$ } from './utils.js';
import { create_task } from './index.js';

export function load() {
  try {
    // Load tasks.
    const todo = JSON.parse(localStorage.getItem('todo'));
    const fragment = document.createDocumentFragment();
    for (const [task, complete] of Object.entries(todo)) {
      fragment.appendChild(create_task(task, complete));
    };
    $('todo-list').appendChild(fragment);

    // Load filter.
    $(`#filter-${localStorage.getItem('filter')}`).click();
  } catch(e) {}
}

export function save() {
  // Save tasks.
  const todo = {};
  for (const el of $$('todo-task')) {
    todo[el.task] = el.complete;
  }
  localStorage.setItem('todo', JSON.stringify(todo));

  // Save filter.
  const filter = $('input[name="filter"]:checked').value;
  localStorage.setItem('filter', filter);
}
