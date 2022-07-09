import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/userSlice'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const navi = useNavigate()

	const dispatch = useDispatch()

	const isValidEmail = (email) =>{
    return /\S+@\S+\.\S+/.test(email);
  }

	const handleClick = () => {
		setError(false)
		fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json()
				} else {
					setError(true)
					return null
				}
			})
			.then((data) => {
				if (data !== null) {
					dispatch(
						setUser({
							username: data.username,
							id: data.id,
							entries: data.entries,
						})
					)
					navi('/')
				}
			})
	}

	return (
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<legend className='f1 fw6 ph0 mh0'>Register</legend>
						<div className='mt3'>
							<label className='db fw6 lh-copy f6' htmlFor='username'>
								Username
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='text'
								name='username'
								id='username'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value)
									setError(false)
								}}
							/>
						</div>
						<div className='mt3'>
							<label className='db fw6 lh-copy f6' htmlFor='email-address'>
								Email
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='email'
								name='email-address'
								id='email-address'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
									if (isValidEmail(e.target.value)){
										setError(false)
									}else{
										setError(true)
									}
								}}
							/>
						</div>
						<div className='mv3'>
							<label className='db fw6 lh-copy f6' htmlFor='password'>
								Password
							</label>
							<input
								className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='password'
								name='password'
								id='password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
									setError(false)
								}}
							/>
						</div>
					</fieldset>
					{error && <p className='f6 dark-red'>invalid email</p>}
					<div className=''>
						<input
							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
							type='submit'
							value='Register'
							onClick={handleClick}
							disabled={
								username === '' || email === '' || password === '' || error
									? true
									: false
							}
						/>
					</div>
					<div className='lh-copy mt3'>
						<p
							className='f6 link dim black db pointer'
							onClick={() => {
								navi('/signin')
							}}
						>
							Sign in
						</p>
					</div>
				</div>
			</main>
		</article>
	)
}

export default Register
