import React from 'react'

const Replies = ({ items, displayName }) => (
  <>
    <div className="ticketDetails-reply">
      <ul className="ticketDetails-reply-list">
        {
          items.map(item => (
            <li className={`${item.createdBy.includes(displayName) ? 'reply-own' : ''}`}>
              <div className="reply-item">
                <p><strong>{item.createdBy}</strong></p>
                <p>{item.text}</p>
                <p className="reply-footer">24 September at 9:00 AM</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
    {/* <form id="reply-form">
      <div className="comment-box-wrapper">
        <textarea name="reply" form="reply-form" id="reply" cols="95" rows="8" placeHolder="Please add a reply.&#10;Note: This will send an email to the user who raised the ticket"></textarea>
      </div>

      <div className="buttons-wrapper">
        <span> <input type="submit" id="reply-send" value="Send" />
          <button type="button" id="cancel-reply">Cancel</button></span>
      </div>
    </form> */}
  </>
)

export default Replies