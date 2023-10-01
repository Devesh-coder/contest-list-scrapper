import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'

function GoogleAuth() {
	const [tokens, setTokens] = useState(null)

	useEffect(() => {
		console.log(tokens)
		const verifyToken = async () => {
			const authority = await axios.get('http://localhost:5000/auth/verify', {
				withCredentials: true,
			})
			console.log(authority.data)
		}
		verifyToken()
	}, [tokens])

	// Authorization Code
	const login = useGoogleLogin({
		onSuccess: async ({ code }) => {
			const jwtToken = await axios.post(
				'http://localhost:5000/auth/google',
				{
					code,
				},
				{ withCredentials: true },
			)
			setTokens(jwtToken)
			localStorage.setItem('loggedIn', true)
		},
		flow: 'auth-code',
	})
	// const login = async ({ code }) => {
	// 	console.log('onSuccess', code)
	// 	const tokens = await axios.post('http://localhost:5000/auth/google', {
	// 		code,
	// 	})

	// 	console.log(tokens)
	// 	setTokens(tokens.data)
	// }

	return tokens == null ? (
		<GoogleLogin
			onSuccess={login}
			onError={() => {
				console.log('Login Failed')
			}}
		/>
	) : (
		<button
			onClick={() => {
				googleLogout()
				axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
				setTokens(null)
			}}
		>
			Logout
		</button>
	)
}

export default GoogleAuth
