import { createElement, createAlertElement } from "./dom.js"

const settings = {
    url_todoList: 'https://jsonplaceholder.typicode.com/todos',
    fetchLimit: 10
}

class TodoList {

    /** @type {Todo[]} */
    _todosBulk = []

    /** @type {HTMLUListElement} */
    _lstGrp = []

    constructor(todos) {
        this._todosBulk = todos
    }

    /**
     * 
     * @param {HTMLElement} e 
     */
    appendTo(e) {
        this._lstGrp = e.querySelector('.list-group')
        for (let todo of this._todosBulk) {
            const t = new TodoListItem(todo)
            t.appendTo(this._lstGrp)
        }
        console.log(e)
        e.querySelector('form').addEventListener('submit', e => this._onSubmit(e))
        e.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this._toggleFilter(e))
        });
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    _toggleFilter(e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')

        if (filter === 'todo') {
            console.log("=> Todo")
            this._lstGrp.classList.add('hide-completed')
            this._lstGrp.classList.remove('hide-todo')
        } else if (filter === 'done') {
            console.log("=> done")
            this._lstGrp.classList.remove('hide-completed')
            this._lstGrp.classList.add('hide-todo')
        } else {
            console.log("=> other")
            this._lstGrp.classList.remove('hide-completed')
            this._lstGrp.classList.remove('hide-todo')
        }
    }

    _onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if (title === '')
            return
        else {
            const todo = {
                id: Date.now(),
                title,
                completed: false
            }
            const t = new TodoListItem(todo)            
            this._lstGrp.prepend(t.getElement())
            form.reset()
        }
    }
}

class TodoListItem {

    _element

    constructor(todo) {
        const todoId = todo.id

        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'})

        const checkBox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id: `todo-${todoId}`,
            checked: todo.completed ? '' : null
        })

        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: todoId
        })
        label.innerHTML = todo.title

        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = '<i class="bi-trash">'

        li.append(checkBox)
        li.append(label)
        li.append(button)

        button.addEventListener('click', e => this.remove(e))

        checkBox.addEventListener('change', e=> this.toggle(e.currentTarget))

        this._element = li
    }

    getElement() {
        return this._element
    }

    /**
     * Remove an item from the list
     * 
     * @param {PointerEvent} e 
     */
    remove(e) {
        e.preventDefault()
        this._element.remove(e)
    }

    /**
     * 
     * @param {HTMLInputElement} e 
     */
    toggle(cb) {
        if (cb.checked)
            this.getElement().classList.add('is-completed')
        else 
            this.getElement().classList.remove('is-completed')
    }

    /**
     * Add an item to the list
     * 
     * @param {HTMLElement} e 
     */
    appendTo(e) {
        e.append(this._element)
    }
}

/**
 * Fetch data from URL with options
 */
async function fetchJSON(url, options={}) {
    const headers = {Accept: 'application/json', ...options.headers}
    const r = await fetch(url, {...options, headers})
    if (r.ok) {
        return r.json()
    }
    throw new Error('Error server', {cause:r})
}

/**
 * Fetch todoList from Jsonplaceholder
 */
async function fetchJSON_TodoList() {
    let strLimit = ""
    if (settings.fetchLimit > 0) strLimit = "?_limit=" + settings.fetchLimit
    try {
        const todoList = await fetchJSON(settings.url_todoList + strLimit)
        const todos = new TodoList(todoList)
        todos.appendTo(document.querySelector('#todolist'))
    } catch (e) {
        console.log(e)
        document.body.prepend(createAlertElement('Impossible de charger la todoList'))
        console.error(e)
    }
}

fetchJSON_TodoList()