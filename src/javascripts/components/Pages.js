import React from 'react'
import { Link } from 'react-router-dom'


export function ErrorNotFound(){
    return (
        <div className="container">
            <h1 className="bg-danger">ERROR! Not found</h1>
            <p></p>
        </div>

    )
}

export function WelcomeMessage(){
    function goLogin(){
        document.location = '/login'
    }
    function goSignup(){
        document.location = '/signup'
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center py-5">
                    <h2 className="display-3">Welcome to DailyCalendar!</h2>
                    <h2 className="pb-4"> Please log in or sign up to add, edit, or delete events.</h2>
                    <a onClick={()=>goLogin()} className="btn btn-info btn-lg px-5 welcome loginBtn">Login</a>
                    <a onClick={()=>goSignup()}  className="btn btn-outline-info btn-lg px-5 welcome signupBtn">Sign Up</a>
                </div>
            </div>
        </div>

    )
}