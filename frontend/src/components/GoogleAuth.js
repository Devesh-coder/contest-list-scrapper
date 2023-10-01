import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import ContestContext from '../context/ContestContext'

function GoogleAuth() {
	const { loginHandler, isLogged, logoutHandler } = useContext(ContestContext)

	// useEffect(() => {
	// 	console.log(tokens)
	// 	// const verifyToken = async () => {
	// 	// 	const authority = await axios.get('http://localhost:5000/auth/verify', {
	// 	// 		withCredentials: true,
	// 	// 	})
	// 	// 	console.log(authority.data)
	// 	// }
	// 	// verifyToken()
	// }, [tokens])

	// Authorization Code
	const login = useGoogleLogin({
		onSuccess: async ({ code }) => {
			const jwtToken = await axios
				.post(
					'http://localhost:5000/auth/google',
					{
						code,
					},
					{ withCredentials: true },
				)
				.then((response) => {
					console.log(response.data)
				})
				.catch((err) => {
					console.log(err)
				})
			loginHandler()
		},
		flow: 'auth-code',
	})

	return !isLogged ? (
		// <GoogleLogin
		// 	onSuccess={login}
		// 	onError={() => {
		// 		console.log('Login Failed')
		// 	}}
		// />
		<button onClick={login}>Login</button>
	) : (
		<button
			onClick={() => {
				logoutHandler()
				googleLogout()
			}}
		>
			Logout
		</button>
	)
}

export default GoogleAuth
