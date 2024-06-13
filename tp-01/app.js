import { fetchJSON_TodoList } from "./todolist/app.js"
import { fetchJSON_Comments } from "./comments/app.js"

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

initView()
fetchJSON_TodoList()
fetchJSON_Comments()