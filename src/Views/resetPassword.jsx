import React, { useState, useEffect } from 'react';
import { fetch } from '../modules/httpServices'
import { constants } from '../modules/constants';
import eye from '../images/eye.png';
import closedEye from '../images/eye-closed.png'

const ResetPassword = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [didPasswordReset, setdidPasswordReset] = useState(false)
    const [isPasswordVisible, setIfPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIfConfirmPasswordVisible] = useState(false)
    useEffect(() => {
        const userInfo = JSON.parse(window.localStorage.getItem('_userInfo'));
        setEmail(userInfo.contactInfo.email);
        props.setIsTicketLoading();
    }, [])

    const isPasswordVisibleHandler = (e) => {
        e.preventDefault()
        setIfPasswordVisible(!isPasswordVisible)
    }
    const iConfirmPasswordVisibleHandler = (e) => {
        e.preventDefault()
        setIfPasswordVisible(!isPasswordVisible)
    }
    const formSubmitHandler = (e) => {
        e.preventDefault()
        console.log("hello from pass")
        password === confirmPassword ?
            fetch.post({
                url: constants.SERVICE_URLS.RESET_PASSWORD,
                requestBody: {
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                },
                callbackHandler: (response) => {
                    const { status } = response;

                    if (status === constants.SUCCESS) {
                        console.log(response)
                        setdidPasswordReset(true)
                        setTimeout(() => {
                            window.localStorage.removeItem('_token');
                            window.localStorage.removeItem('_listingData')
                            window.location = '/'
                        }, 2000)
                    }
                }
            }) : alert("Passwords Don't Match!")
    }

    return (
        <div className="reset">
            <form className="reset__form" >
                <div className="reset__email--input">
                    <input className="reset__emailInput reset--input" value={email} type="email" disabled onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>
                <div className="reset__password--input">
                    <input className="reset__passwordInput reset--input u-margin-left--small" type={isPasswordVisible ? "text" : "password"} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="New Password" />
                    <span className="reset__password--visible">
                        <span className="reset__eye-cross--visible"></span>
                        {isPasswordVisible ? <img className="reset__password-eye--open" onClick={(e) => isPasswordVisibleHandler(e)} src={eye} /> :
                            <img className="reset__password-eye--closed" onClick={(e) => isPasswordVisibleHandler(e)} src={closedEye} />
                        }
                    </span>
                </div>
                <div className="reset__confirm-password--input">
                    <input className="reset__passwordInput reset--input" type="password" onChange={(e) => setConfirmPassword(e.currentTarget.value)} placeholder="Confirm Password" />
                </div>
                {didPasswordReset ?
                    <div className="reset__did-Password-Reset">
                        <p className="reset__did-Password-Reset--blink">Password Reset Successfuly! Redirecting to Login... </p>
                    </div> :
                    null}

                <a href="#" className="reset__btn reset__btn--white" onClick={(e) => formSubmitHandler(e)}>Reset</a>
            </form>
        </div>
    )
}

export default ResetPassword;
