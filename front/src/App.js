import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'
import MainPage from './pages/MainPage'
import SigninPage from './pages/SigninPage'
import RegisterPage from './pages/RegisterPage'
import { selectUser } from './redux/userSlice'

function App() {
	let states = useSelector(selectUser)
	const user = states.user

	const particlesInit = async (main) => {
		await loadFull(main)
	}

	const particlesLoaded = (container) => {}
	const particlesOptions = {
		background: {
			color: {
				value: '#cccccc',
			},
		},
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: {
					enable: true,
					mode: 'push',
				},
				onHover: {
					enable: true,
					mode: 'repulse',
				},
				resize: true,
			},
			modes: {
				push: {
					quantity: 4,
				},
				repulse: {
					distance: 200,
					duration: 0.4,
				},
			},
		},
		particles: {
			color: {
				value: '#ffffff',
			},
			links: {
				color: '#ffffff',
				distance: 150,
				enable: true,
				opacity: 0.5,
				width: 1,
			},
			collisions: {
				enable: true,
			},
			move: {
				direction: 'none',
				enable: true,
				outModes: {
					default: 'bounce',
				},
				random: false,
				speed: 6,
				straight: false,
			},
			number: {
				density: {
					enable: true,
					area: 800,
				},
				value: 80,
			},
			opacity: {
				value: 0.5,
			},
			shape: {
				type: 'circle',
			},
			size: {
				value: { min: 1, max: 5 },
			},
		},
		detectRetina: true,
	}

	return (
		<div className='App'>
			<Particles
				className='particles'
				id='tsparticles'
				init={particlesInit}
				loaded={particlesLoaded}
				options={particlesOptions}
			/>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path='/'
						element={Object.keys(user).length === 0 ? <Navigate to='/signin' /> : <MainPage />}
					/>
					<Route path='/signin' element={<SigninPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
