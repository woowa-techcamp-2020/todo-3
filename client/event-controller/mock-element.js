export default class MockElement {
  constructor(parent, className) {
    this.parent = parent;
    this.$ = null;
    this.className = className;
  }

  disguise($) {
    this.$ = $.cloneNode(true);
    this.$.classList.add(this.className);
    return this;
  }

  hide() {
    this.$.classList.add('hidden');
    return this;
  }

  show() {
    this.$.classList.remove('hidden');
    return this;
  }

  attach(element) {
    element.insertBefore(this.$, null);
    return this;
  }

  attachBefore(element) {
    if (element?.parentElement) {
      element.parentElement.insertBefore(this.$, element);
    }
    return this;
  }

  dettach() {
    if (this.$?.parentElement) {
      this.$.parentElement.removeChild(this.$);
    }
    return this;
  }

  move(x, y) {
    const rect = this.parent.$.getBoundingClientRect();
    this.$.setAttribute('style', `left: ${x - rect.x}; top: ${y - rect.y};`);
    return this;
  }

  position() {
    return Array.from(this.$.parentElement.children)
      .filter((node) => node.classList.contains('note'))
      .filter((node) => !node.classList.contains('hidden')).indexOf(this.$);
  }

  getSelectedColumnID() {
    return parseInt(this.$.closest('.col').getAttribute('CID'), 10);
  }
}