import React from 'react'
import Tilt from 'react-tilt'

import robot from '../imgs/robot.png'

const Logo = () => {
	return (
		<div className='center mt0 mb3'>
			<Tilt
				className='Tilt br2 shadow-2'
				options={{ max: 55 }}
				style={{ height: 150, width: 150 }}
			>
				<div className='Tilt-inner pa3'>
					<img alt='logo' src={robot} />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo
