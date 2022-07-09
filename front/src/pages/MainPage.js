import React, { useState } from 'react'

import Logo from '../components/Logo'
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import Navigation from '../components/Navigation'

const MainPage = () => {
	const [number, setNumber] = useState(0)

	const countNumber = (num) => {
		setNumber(num)
	}

	return (
		<>
			<Navigation />
			<Logo />
			<Rank number={number} />
			<ImageLinkForm countNumber={countNumber} />
		</>
	)
}

export default MainPage
