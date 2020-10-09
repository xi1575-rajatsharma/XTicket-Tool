import React, { useRef } from 'react'

const Reply = ({ onCancel, onSubmit }) => {

  const formRef = useRef(null)

  const onSubmitHandler = e => {
    e.preventDefault()

    let { current: formData } = formRef
    let data = { reply: formData.reply.value }

    /** Validate */
    if (!data.reply) {
      alert('Reply field can\' be empty')
      return
    }
    onSubmit(data)
  }

  return (
    <form ref={formRef} onSubmit={onSubmitHandler} id="reply-form">
      <div className="comment-box-wrapper">
        <textarea name="reply" form="reply-form" id="reply" cols="95" rows="8" placeholder="Please add a reply.&#10;Note: This will send an email to the user who raised the ticket"></textarea>
      </div>

      <div className="buttons-wrapper">
        <span> <input type="submit" id="reply-send" value="Send" />
          <button type="button" onClick={onCancel} id="cancel-reply">Cancel</button>
        </span>
      </div>
    </form>
  )
}

export default Reply