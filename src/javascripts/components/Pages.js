import React from 'react'

export function ErrorNotFound(){
    return (
        <div className="container">
            <h1 className="bg-danger">ERROR! Not found</h1>
            <p>loremkafdas;jf lkajdf ;lkajsflkajdf l;kajf ;lakjf ;lakjf;l kajfd;lkaj ;flka</p>
        </div>

    )
}

export function WelcomeMessage(){
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center py-5">
                    <h2 className="display-3">Welcome to DailyCalendar!</h2>
                    <h2 className="pb-4"> Please log in or sign up to add, edit, or delete events.</h2>
                    <button type="button" className="btn btn-info btn-lg px-5">Login</button>
                    <button type="button" className="btn btn-outline-info btn-lg px-5">Sign Up</button>

                </div>
            </div>
        </div>

    )
}