import { createElement, createAlertElement, createSuccessElement } from "../dom.js"
import { settings, fetchJSON_toModels } from "../tools.js"

/**
 * @param {string} name 
 * @returns {string}
 */
function getCookie(name) {
    const cookies = document.cookie.split("; ")
    const value = cookies
        .find(c => c.startsWith(name))
        ?.split("=")[1]

    if (value === undefined) {
        console.log(name + " is not registered as a Cookie")
        return null
    }

    return decodeURIComponent(value)
}

/**
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function setCookie(name, value, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expire=${date.toUTCString()};`
}

function clearCookie() {
    document.cookie = ""
}

class TodoList {

    /** @type {Todo[]} */
    _todosBulk = []

    /** @type {HTMLUListElement} */
    _lstGrp = []

    constructor(todos) {
        this._todosBulk = todos
        this.save()
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
        
        e.querySelector('form').addEventListener('submit', e => this._onSubmit(e))
        e.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this._toggleFilter(e))
        });

        this._lstGrp.addEventListener('delete-item', e => this._onRemove(e))
        this._lstGrp.addEventListener('update-item', e => this._onUpdate(e))
    }

    save() {
        localStorage.setItem(settings.localStorage.todos, JSON.stringify(this._todosBulk))
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
            // console.log("=> Todo")
            this._lstGrp.classList.add('hide-completed')
            this._lstGrp.classList.remove('hide-todo')
        } else if (filter === 'done') {
            // console.log("=> Done")
            this._lstGrp.classList.remove('hide-completed')
            this._lstGrp.classList.add('hide-todo')
        } else {
            // console.log("=> Other")
            this._lstGrp.classList.remove('hide-completed')
            this._lstGrp.classList.remove('hide-todo')
        }
    }

    _onRemove(e) {
        const index = this._todosBulk.indexOf(e.detail)
        if (index > -1) {
            this._todosBulk.splice(index, 1)
            this.save()
            document.querySelector('#todolist').prepend(createSuccessElement('"'+e.detail.title+'" is removed!'))
        }
    }

    _onUpdate(e) {
        const index = this._todosBulk.indexOf(e.detail)
        if (index > -1) {
            this._todosBulk[index] = e.detail
            this.save()
            document.querySelector('#todolist').prepend(createSuccessElement('"'+e.detail.title+'" is updated!'))
        }
    }

    _onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if (title === '') {
            return
        } else {
            // --> Model
            const todo = {
                id: Date.now(),
                title,
                completed: false
            }
            this._todosBulk.unshift(todo)
            this.save()

            // <-- View
            const t = new TodoListItem(todo)            
            this._lstGrp.prepend(t.getElement())
            form.reset()
            document.querySelector('#todolist').prepend(createSuccessElement('"'+todo.title+'" is added!'))
        }
    }
}

class TodoListItem {

    _todo
    _element

    constructor(todo) {
        this._todo = todo
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

        button.addEventListener('click', e => this._remove(e))
        checkBox.addEventListener('change', e=> this._toggle(e.currentTarget))

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
    _remove(e) {
        e.preventDefault()
        this._element.dispatchEvent(
            new CustomEvent('delete-item', {
                detail: this._todo,
                bubbles: true
            })
        )
        this._element.remove(e)
        
    }

    /**
     * 
     * @param {HTMLInputElement} e 
     */
    _toggle(cb) {
        if (cb.checked) 
            this.getElement().classList.add('is-completed')
        else 
            this.getElement().classList.remove('is-completed')
        this._todo.completed = cb.checked

        this._element.dispatchEvent(
            new CustomEvent('update-item', {
                detail: this._todo,
                bubbles: true
            })
        )
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
 * Fetch todoList from Jsonplaceholder
 */
export async function fetchJSON_TodoList() {
    const sectionTodos = document.querySelector('#todolist')
    fetchJSON_toModels(settings.url.todos, settings.fetchLimit.todos, settings.localStorage.todos, 
        // onLoad
        (objectList) => {
            const todos = new TodoList(objectList)
            todos.appendTo(sectionTodos)
        },
        // onError
        (error) => {
            sectionTodos.prepend(createAlertElement('Impossible de charger la todoList'))
        }
    )
}