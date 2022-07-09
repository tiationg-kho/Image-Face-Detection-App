import React, { useState } from 'react'
import Clarifai from 'clarifai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/userSlice'
import './ImageLinkForm.css'
import FaceRecognition from './FaceRecognition'
import { selectUser } from '../redux/userSlice'

const ImageLinkForm = ({ countNumber }) => {
	const [inputUrl, setInputUrl] = useState('')
	const [box, setBox] = useState([])

	let states = useSelector(selectUser)
	const user = states.user
	const dispatch = useDispatch()

	const app = new Clarifai.App({
		apiKey: process.env.REACT_APP_API_KEY,
	})

	const calculateFaceLocation = (data) => {
		const regions = data.outputs[0].data.regions
		const boxContent = []
		regions.map((e) => {
			const face = e.region_info.bounding_box
			const photo = document.getElementById('inputimage')
			const width = Number(photo.width)
			const height = Number(photo.height)
			boxContent.push({
				leftCol: face.left_col * width,
				topRow: face.top_row * height,
				rightCol: width - face.right_col * width,
				bottomRow: height - face.bottom_row * height,
			})
			return null
		})
		countNumber(boxContent.length)
		return setBox(boxContent)
	}

	const handleClick = () => {
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, inputUrl)
			.then((response) => {
				calculateFaceLocation(response)
				fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: user.id,
					}),
				})
					.then((res) => {
						if (res.status === 400) {
							return null
						} else {
							return res.json()
						}
					})
					.then((data) => {
						if (data !== null) {
							dispatch(setUser({ ...user, entries: data}))
						}
					})
			})
			.catch((err) => console.log('err'))
	}

	return (
		<>
			<div>
				<p className='f3 gray'>Robot will detect faces in your photo</p>
				<div className='center'>
					<div className='form center pa4 br3 shadow-5'>
						<input
							className='f4 pa2 w-70 center'
							type='text'
							placeholder="Photo's URL"
							value={inputUrl}
							onChange={(e) => {
								setInputUrl(e.target.value)
								setBox([])
								countNumber(0)
							}}
						/>
						<button
							className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'
							onClick={handleClick}
							disabled={inputUrl.startsWith('http') ? false : true}
						>
							Detect
						</button>
						{!inputUrl.startsWith('http') && inputUrl !== '' && (
							<div style={{ color: 'darkred' }}>Invalid URL</div>
						)}
					</div>
				</div>
			</div>
			{inputUrl && <FaceRecognition url={inputUrl} box={box} />}
		</>
	)
}

export default ImageLinkForm
