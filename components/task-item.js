import { $ } from '../js/utils.js';

// A place to store element references contained within closed shadowRoots.
const ELEMENTS = new WeakMap();

// Module-level constants for element references that are reused.
const TASK_TEMPLATE = $('#task-item');

class TaskItem extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(TASK_TEMPLATE.content.cloneNode(true));

    // Cache static element references contained within the closed shadowRoot.
    ELEMENTS.set(this, new Map([ '#complete', '#task-name', '#delete' ].map((id) => [
      id,
      shadowRoot.querySelector(id),
    ])));
  }

  connectedCallback() {
    const els = ELEMENTS.get(this);

    // Toggle the "complete" class on the task.
    els.get('#complete').addEventListener('change', () => {
      TaskItem.reflectClass.bind(this)();
      this.dispatchEvent(new CustomEvent('complete'));
    });

    // Update task.
    els.get('#task-name').addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('change'));
    });

    // Delete task.
    els.get('#delete').addEventListener('click', () => {
      this.remove();
      this.dispatchEvent(new CustomEvent('delete'));
    });

    // Properties may be added before the element is added to the DOM.
    // These are lazily fixed here.
    const lazyProperty = TaskItem.lazyProperty.bind(this);
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
    return ELEMENTS.get(this).get('#task-name').value;
  }

  set task(value) {
    ELEMENTS.get(this).get('#task-name').value = value;
  }

  // Getter/setter for the completion state.
  get complete() {
    return ELEMENTS.get(this).get('#complete').checked;
  }

  set complete(value) {
    ELEMENTS.get(this).get('#complete').checked = Boolean(value);
    TaskItem.reflectClass.bind(this)();
  }

  // Reflect the `complete` property to the host class list.
  static reflectClass() {
    if (this.classList.contains('complete') !== this.complete) {
      this.classList.toggle('complete');
    }
  }
}

customElements.define('task-item', TaskItem);
