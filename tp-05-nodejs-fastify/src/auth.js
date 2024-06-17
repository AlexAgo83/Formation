export const loginAction = (req, res) => {
    if (req.method === 'POST') {
        const user = db.prepare('SELECT * FROM users WHERE username = ?')
            .get(req.body.username)
    }
    return res.view('templates/login.ejs')
}

export const logoutAction = (req, res) => {
    return res.view('templates/logout.ejs')
}