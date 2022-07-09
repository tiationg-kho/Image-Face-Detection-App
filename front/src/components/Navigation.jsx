import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"

import { setUser } from '../redux/userSlice'

const Navigation = () => {
  const navi = useNavigate()
	const dispatch = useDispatch()
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p className='f4 link dim black underline pa3 pointer' onClick={()=>{
        dispatch(
          setUser({})
        )
        navi('/signin')
        }}>Sign Out</p>
    </nav>
  )
}

export default Navigation