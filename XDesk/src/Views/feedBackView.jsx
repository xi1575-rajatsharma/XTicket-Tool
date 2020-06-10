import React from 'react'

const FeedBackView = (payload) => {
    const { shouldDisplay } = payload
    return (
        <div className="feedback-container">
            <div className="feedback-header">
                <button className="cross" type="button" onClick={() => shouldDisplay('no')}>X</button>
            </div>
            <div className="feedback-body">
                <div className="hand-svg ">
                    <span className="fa fa-thumbs-up thumb" ></span>
                </div>
                <div className="star-container">
                    Rate your experience
             <div className="star">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                </div>
                <textarea></textarea>
                <button className="btn-rating">Rate</button>
            </div>
        </div>


    )
}


export default FeedBackView;
