const templateTodo = document.createElement('template');
templateTodo.innerHTML = `
    <section>
        <todo-input></todo-input>
        <ul id="list-container"></ul>
    </section>
`;

class MyTodo extends HTMLElement {
    constructor() {
        super();
        // initial state
        this._list = [
            { text: 'Prepare a notes on Components', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
    }

    connectedCallback() {
        this.appendChild(templateTodo.content.cloneNode(true));
        this.$input = this.querySelector('todo-input');
        this.$listContainer = this.querySelector('#list-container');
        this.$input.addEventListener('onSubmit', this.addItem.bind(this));
        this._render();
    }

    addItem(e) {
        this._list.push({ text: e.detail, checked: false });
        this._render();
    }

    removeItem(e) {
        this._list.splice(e.detail, 1);
        this._render();
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this._render();
    }
    _render() {
        if(!this.$listContainer) return;

        this.$listContainer.innerHTML = '';
        this._list.forEach((item, index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item.text);
            $item.checked = item.checked;
            $item.index = index;

            $item.addEventListener('onRemove', this.removeItem.bind(this));
            $item.addEventListener('onToggle', this.toggleItem.bind(this));

            this.$listContainer.appendChild($item);
        });
    }
}

window.customElements.define('my-todo', MyTodo);