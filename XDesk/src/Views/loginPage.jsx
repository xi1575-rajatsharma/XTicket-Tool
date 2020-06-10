import React from 'react';
import { isEmpty, toString } from 'lodash';
import Loader from 'react-loader-spinner';


export const loginPages = (payload) => {

    const { email, password, onInputChange, onSubmitHandler, isValid, isLoading } = payload;
    const isDisabledButton = (isEmpty(toString(email)) || isEmpty(toString(password)));

    return (
        <div className="login-container">
            <div className="logo-container"></div>
            <div className="login-text-container">Help Desk Login</div>
            <div className="login-form-container">
                <form onSubmit={onSubmitHandler}>
                    {isValid ? null : <div className='login-error'><p>Please Enter the Correct Credentials</p></div>}
                    <input type="text" id="username" placeholder="Username" value={email} onChange={(e) => onInputChange({ email: e.currentTarget.value })} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => onInputChange({ password: e.currentTarget.value })} />
                    <button type='submit' id="submit" disabled={isDisabledButton || isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
                </form>


            </div>
            {isLoading ?
                <div className="loader-wrapper">
                    <div className="loader-icon">
                        <Loader
                            type="Puff"
                            color="rgb(72, 28, 64)"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs

                        /> </div>
                </div>

                : null
            }
            <div className="footer-logo-container"></div>
            <div className="footer-text-container">Xebia Group © 2020. All rights reserved.</div>
        </div>
    )
}
