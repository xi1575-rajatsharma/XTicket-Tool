import React from 'react';
import { isEmpty, toString } from 'lodash';
import xebiaLogo from '../images/xebia_logo.png';

export const loginView = (payload) => {

    const { email, password, onInputChange, onSubmitHandler, isValid, isLoading } = payload;

    const isDisabledButton = (isEmpty(toString(email)) || isEmpty(toString(password)));

    return (
        <div className='background-container'>
            <div className='container'>
                <div className='form-wrapper'>
                    <div className='container-brand-wrapper'>
                        <img src={xebiaLogo} alt='nothing going on here' />
                    </div>
                    <div className='vertical-line'></div>
                    <form onSubmit={onSubmitHandler}>

                        <div className='heading-wrapper'>
                            <span id='sign-in-heading'>
                                Sign in
                            </span>

                            <span id='text-wrapper'>
                                to access HDesk
                            </span>
                        </div>

                        {isValid ? null : <div className='login-error'><p>Please Enter the Correct Credentials</p></div>}
                        <div className='input-wrapper'>
                            <div className='email-input-wrapper'>
                                <input type='text' placeholder='Username' value={email} onChange={(e) => onInputChange({ email: e.currentTarget.value })}
                                />
                            </div>

                            <div className='password-input-wrapper'>
                                <input type='password' placeholder='Password' value={password} onChange={(e) => onInputChange({ password: e.currentTarget.value })}
                                />
                            </div>
                            <div className='button-wrapper'>
                                <button type='submit' id="login-form-submit" disabled={isDisabledButton || isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}