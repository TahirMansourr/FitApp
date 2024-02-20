import React from 'react'

const MyProfile = async ({params} : {params : {id : string}}) => {
    
  return (
    <div>this is {params.id} profile </div>
  )
}

export default MyProfile