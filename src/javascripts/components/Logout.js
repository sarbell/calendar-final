import { use } from 'passport'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

export default function Logout(){
    const history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    // removeCookie('token')
    // document.location = '/'
    function logout(){
        removeCookie('token')
        document.location = '/'
    }
    function goHome(){
        document.location = '/'
    }

    return <>

        <div className="container">
            <div className="row justfiy-content-center">
                <div className="col-3"></div>
                <div className="col-6 text-center shadow py-4">
                    <h1 className="text-secondary display-4">
                        Are you sure you want to log out?
                    </h1>
                    <br></br>
                    <a onClick={()=> logout()} id="_sign_user_out" className="btn btn-danger mr-2" >Yes</a>
                    <span className="mx-3"></span>
                    <a  onClick={()=> goHome()} type="button" className="btn btn-secondary ml-2">Cancel</a>
                </div>
                <div className="col-5"></div>
            </div>
        </div>
    
    
    
    </>
}