export const indexPage = (req, res, next) => {
    res.render('layout', {content:'index', title: ''})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content:'about', title: 'About Daily Calendar'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content:'contact', title: 'Contact Us'})
}

export const loginPage = (req, res, next) => {
    res.render('layout', {content: 'login', title: 'Log In'})
}

export const logoutPage = (req, res, next) => {
    res.render('layout', {content: 'logout', title: ''})
}

export const signupPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Sign Up'})
}