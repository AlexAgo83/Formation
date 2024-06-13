import { createElement, createAlertElement, createSuccessElement } from "../dom.js"
import { settings, fetchJSON_toModels } from "../tools.js"

class CommentList {

    _bulkComments 
    _cache
    
    constructor(comments) {
        this._bulkComments = comments
        this.save()
    }

    /**
     * 
     * @param {HTMLElement} e 
     */
    appendTo(e) {
        const section = e.querySelector('.comments')
        for (let com of this._bulkComments) {
            const item = new CommentListItem(com)
            item.appendTo(section)
        }
    }

    save() {
        localStorage.setItem(
            settings.localStorage.comments, 
            JSON.stringify(this._bulkComments))
    }
}

class CommentListItem {

    _comment
    _element

    constructor(comment) {
        this._comment = comment

        const tpl = document.getElementById('comment')
        this._element = tpl.content.cloneNode(true)

        console.log(this._element.querySelector('article'))
        this._element.querySelector('strong').innerHTML = 
            this._comment.name 
            + " (" + this._comment.email 
            + ")"
        this._element.querySelector('p').innerHTML = this._comment.body
    }

    appendTo(e) {
        e.append(this._element)
    }
}

export async function fetchJSON_Comments() {
    const sectionComments = document.querySelector('#coms')
    fetchJSON_toModels(settings.url.comments, settings.fetchLimit.comments, settings.localStorage.comments, 
        // onLoad
        (objectList) => {
            const comments = new CommentList(objectList)
            comments.appendTo(sectionComments)
        },
        // onError
        (error) => {
            sectionComments.prepend(createAlertElement('Impossible de charger les commentaires'))
        }
    )
}