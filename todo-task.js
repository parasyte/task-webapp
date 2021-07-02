import { $ } from './utils.js';

// A place to store closed shadowRoots.
const shadowRoots = new WeakMap();

class ToDoTask extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoots.set(this, shadowRoot);
    shadowRoot.appendChild(
      $('#todo-task').content.cloneNode(true)
    );
  }

  connectedCallback() {
    let shadowRoot = shadowRoots.get(this);

    // Toggle the "complete" class on the task.
    shadowRoot.querySelector('#complete').addEventListener('change', () => {
      ToDoTask.reflectClass.bind(this)();
      this.dispatchEvent(new CustomEvent('complete'));
    });

    // Update task.
    let task = shadowRoot.querySelector('#task-name');
    task.addEventListener('change', () => {
      this.task = task.value;
      this.dispatchEvent(new CustomEvent('change'));
    });

    // Delete task.
    shadowRoot.querySelector('#delete').addEventListener('click', () => {
      this.remove();
      this.dispatchEvent(new CustomEvent('delete'));
    });

    // Properties may be added before the element is added to the DOM.
    // These are lazily fixed here.
    const lazyProperty = ToDoTask.lazyProperty.bind(this);
    lazyProperty('task');
    lazyProperty('complete');
  }

  // Static methods can be used for private APIs. Kind of. ;)
  static lazyProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  // Getter/setter for the task text.
  get task() {
    return shadowRoots.get(this).querySelector('#task-name').value;
  }

  set task(value) {
    shadowRoots.get(this).querySelector('#task-name').value = value;
  }

  // Getter/setter for the completion state.
  get complete() {
    return shadowRoots.get(this).querySelector('#complete').checked;
  }

  set complete(value) {
    shadowRoots.get(this).querySelector('#complete').checked = Boolean(value);
    ToDoTask.reflectClass.bind(this)();
  }

  // Reflect the `complete` property to the host class list.
  static reflectClass() {
    if (this.classList.contains('complete') !== this.complete) {
      this.classList.toggle('complete');
    }
  }
}

customElements.define('todo-task', ToDoTask);
