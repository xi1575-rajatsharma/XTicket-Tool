import React from 'react';
import xebia from '../images/xebia_logo.png'

const ReplyNav = () => {
    return (
        <div className="ticket-reply-nav-wrapper">
            <div className="ticket-reply-nav-left-side">
                <img src={xebia} alt="Xebia Logo Comes Here" />
            </div>

            <div className="ticket-reply-nav-right-side">
                <div className="ticket-reply-nav-home-link-wrapper">
                    Home
                </div>

                <div className="ticket-reply-nav-my-area-link-wrapper">
                    My Area
                </div>

                <div className="ticket-reply-nav-profile-identifier-wrapper">

                </div>
            </div>

        </div>
    )
}

export default ReplyNav;