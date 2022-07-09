import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/userSlice'

const Signin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const navi = useNavigate()

	const dispatch = useDispatch()

	const handleClick = async () => {
		setError(false)
		const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		})
		if (res.status === 200){
			const data = await res.json()
			dispatch(setUser({id: data.id, username: data.username, entries: data.entries}))
			navi('/')
		} else{
			setError(true)
			setPassword('')
		}

	}

	return (
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<legend className='f1 fw6 ph0 mh0'>Sign In</legend>
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
									setError(false)
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
					{error && <p className='f6 dark-red'>wrong email or password</p>}
					<div className=''>
						<input
							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
							type='submit'
							value='Sign in'
							onClick={handleClick}
							disabled={email === '' || password === '' ? true : false}
						/>
					</div>
					<div className='lh-copy mt3'>
						<p
							className='f6 link dim black db pointer'
							onClick={() => {
								navi('/register')
							}}
						>
							Register
						</p>
					</div>
				</div>
			</main>
		</article>
	)
}

export default Signin
