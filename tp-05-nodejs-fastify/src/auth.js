import { getUser } from "./database.js"
import { hash, verify } from '@phc/argon2'

export const loginAction = async (req, res) => {
    const params = {}
    if (req.method === 'POST') {
        const {password, username} = req.body
        params.username = username
        const user = getUser(username)
        if (user !== undefined
            && (await verify(user.password, req.body.password))) {
            req.sessionCookie.set('user', {
                id: user.user_id,
                username: user.username
            })
            return res.redirect('/')
        }
        params.error = "Identifiants invalides"
    }
    return res.view('templates/login.ejs', params)
}

export const logoutAction = (req, res) => {
    // return res.view('templates/logout.ejs')
    req.sessionCookie.delete()
    res.redirect('/')
}