import React from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from '../redux/userSlice'

const Rank = ({number}) => {

	const states = useSelector(selectUser)
	const username = states.user.username
	const entries = states.user.entries

	return (
		<div>
			<div className='black f3'>Hi {username}, you have detected {entries} photo(s)</div>
			<div className='black f3'>And, the number of face(s) inside below photo is...</div>
			<div className='black f1'>{number}</div>
		</div>
	)
}

export default Rank
