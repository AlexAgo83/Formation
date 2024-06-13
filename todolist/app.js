import { createElement, createAlertElement, createSuccessElement } from "./dom.js"

const settings = {
    url_todoList: 'https://jsonplaceholder.typicode.com/todos',
    url_comments: 'https://jsonplaceholder.typicode.com/comments',
    fetchLimit_todoList: 10,
    fetchLimit_commentList: 50,
    lsdb_TodoList: 'tododbs',
    lsdb_Comments: 'commentdbs',
    cookies: {
        nohttp: 'nohttp',
        testhttp: "testhttp"
    }
}

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
        localStorage.setItem(settings.lsdb_TodoList, JSON.stringify(this._todosBulk))
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
 * Fetch data from URL with options
 * @param {string} url
 * @returns {JSON}
 */
async function fetchJSON(url, options={}) {
    const headers = {
        Accept: 'application/json', 
        ...options.headers
    }
    const r = await fetch(url, {...options, headers})
    if (r.ok) {
        return r.json()
    }
    throw new Error('Error server', {cause:r})
}

function initView() {
    const tpl = document.getElementById('template-layout')
    document.querySelector('#todolist').append(tpl.content.cloneNode(true))

    const btnReset = document.getElementById('btn-reset')
    btnReset.addEventListener('click', e => {
        localStorage.clear()
        location.reload()
    })
    const observerBtn = new IntersectionObserver((entries) => {
        for (const e of entries) {
            // Add opacity animation to btnReset (when intersecting)
            if (e.target === btnReset && e.isIntersecting) {
                btnReset.animate([
                    {opacity: 0},
                    {opacity: 1}
                ], {
                    duration: 1000,
                    threshold: 1
                })
                observerBtn.unobserve(btnReset)
            }
        }
    })
    observerBtn.observe(btnReset)

    const listBtnSection = document.querySelectorAll('nav-link')
    const y = Math.round(window.innerHeight * .75)
    const limits = {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    }
    const observerSection = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                const anchor = document.querySelector(`a[href="#${e.target.id}"]`)
                if (anchor !== null) {
                    anchor.parentElement
                        .querySelectorAll('.active-section')
                        .forEach(node => node.classList.remove('active-section'))
                    anchor.classList.add('active-section')
                }
            }
        }
    }, limits)
    
    document.querySelectorAll('.custom-section')?.forEach((section) => {
        observerSection.observe(section)
    })
}

/**
 * Fetch todoList from Jsonplaceholder
 */
async function fetchJSON_TodoList() {
    const sectionTodoList = document.querySelector('#todolist')
    let strLimit = ""
    if (settings.fetchLimit_todoList > 0) 
        strLimit = "?_limit=" + settings.fetchLimit_todoList

    try {
        let tdList = []
        const dbList = localStorage.getItem(settings.lsdb_TodoList)?.toString()

        if (dbList)
            tdList = JSON.parse(dbList)
        else {
            console.log('First load !')
            tdList = await fetchJSON(settings.url_todoList + strLimit)
        }

        const todos = new TodoList(tdList)
        todos.appendTo(sectionTodoList)
    } catch (e) {
        console.log(e)
        sectionTodoList.prepend(createAlertElement('Impossible de charger la todoList'))
        console.error(e)
    }
}

async function fetchJSON_Comments() {
    const sectionComments = document.querySelector('#coms')
    let strLimit = ""
    if (settings.fetchLimit_todoList > 0) 
        strLimit = "?_limit=" + settings.fetchLimit_commentList

    try {
        let commentList = []
        const dbList = localStorage.getItem(settings.lsdb_Comments)?.toString()

        if (dbList)
            commentList = JSON.parse(dbList)
        else {
            console.log('First load !')
            commentList = await fetchJSON(settings.url_comments + strLimit)
        }

        // const todos = new TodoList(tdList)
        // todos.appendTo(sectionTodoList)
    } catch (e) {
        console.log(e)
        sectionTodoList.prepend(createAlertElement('Impossible de charger les commentaires'))
        console.error(e)
    }
}

/**** TEST COOKIES */
// if (getCookie(settings.cookies.testhttp) === null) {
//   setCookie(settings.cookies.testhttp, "testX", 5)
// }
// console.log(getCookie(settings.cookies.testhttp))

/**** MAIN */
initView()
fetchJSON_TodoList()
fetchJSON_Comments()