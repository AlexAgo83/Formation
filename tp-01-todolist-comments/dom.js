/**
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes) {
    const e = document.createElement(tagName)
    for (const [att, value] of Object.entries(attributes)) {
        if (value !== null)
            e.setAttribute(att, value)
    }
    return e
}

/**
 * 
 * @param {string} alertMsg 
 * @returns {HTMLElement}
 */
export function createAlertElement(alertMsg) {
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-2 alert-dismissible fade show alertbox',
        role: 'alert'
    })
    alertElement.innerText = alertMsg
    return alertElement
}

/**
 * 
 * @param {string} successMsg 
 * @returns {HTMLElement}
 */
export function createSuccessElement(successMsg) {
    const successElement = createElement('div', {
        class: 'alert alert-success m-2 alert-dismissible fade show',
        role: 'alert'
    })
    successElement.innerText = successMsg
    return successElement
}