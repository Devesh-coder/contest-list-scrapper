import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import ContestContext from '../context/ContestContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hasGrantedAllScopesGoogle } from '@react-oauth/google'

function GoogleAuth() {
	const { loginHandler, isLogged, logoutHandler, toastSuccess, toastWarning } =
		useContext(ContestContext)

	const [scopes, setScopes] = useState({})

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
					toast.success(response.data.message, toastSuccess)
					loginHandler(response.data.uid)
				})
				.catch((err) => {
					console.log(err)
					toast.warn(err.message, toastWarning)
				})
		},
		flow: 'auth-code',
		onError: (err) => {
			console.log('error', err)
		},
		scope: 'https://www.googleapis.com/auth/calendar',
	})

	return (
		<>
			{/* {!isLogged ? (
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
			<ToastContainer /> */}
		</>
	)
}

export default GoogleAuth
