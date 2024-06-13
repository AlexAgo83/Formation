import { createElement, createAlertElement, createSuccessElement } from "../dom.js"
import { settings, fetchJSON_toModels } from "../tools.js"

export async function fetchJSON_Comments() {
    const sectionComments = document.querySelector('#coms')
    fetchJSON_toModels(settings.url.todos, settings.fetchLimit.todos, settings.localStorage.todos, 
        // onLoad
        (objectList) => {
            // const todos = new TodoList(objectList)
            // todos.appendTo(sectionTodoList)
        },
        // onError
        (error) => {
            sectionComments.prepend(createAlertElement('Impossible de charger les commentaires'))
        }
    )
}