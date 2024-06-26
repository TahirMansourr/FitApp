import React from 'react'
import CommentForm from '../forms/commentForm'

interface Props{
    currentUserImage : string,
    currentPostId : string,
    currentUserId : string
}

const CommentComponent = ({
    currentUserImage,
    currentPostId,
    currentUserId
} : Props
) => {
  return (
    <div className='w-[80%] mt-3'>
        <CommentForm
             currentUserImage = {currentUserImage}
             currentPostId = {currentPostId}
             currentUserId = { currentUserId}
        />
    </div>
  )
}

export default CommentComponent