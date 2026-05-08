import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link to={destination} className='btn-secondary'>
        <BsArrowLeft className='text-lg' />
        Back
      </Link>
    </div>
  )
}

export default BackButton