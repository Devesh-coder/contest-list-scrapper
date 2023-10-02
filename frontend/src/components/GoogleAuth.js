import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import ContestContext from '../context/ContestContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function GoogleAuth() {
	const { loginHandler, isLogged, logoutHandler, toastSuccess, toastWarning } =
		useContext(ContestContext)

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
					toast.success('Login Successful', toastSuccess)
				})
				.catch((err) => {
					console.log(err)
					toast.warn(err.message, toastWarning)
				})
			loginHandler()
		},
		flow: 'auth-code',
	})

	return (
		<>
			{!isLogged ? (
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
			)}
			<ToastContainer />
		</>
	)
}

export default GoogleAuth
