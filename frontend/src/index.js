import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ContestProvider } from './context/ContestContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from '@material-tailwind/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <React.StrictMode>

	<GoogleOAuthProvider clientId='885497924263-n9csh64s4udda2re4e37bv9fvk6j32vh.apps.googleusercontent.com'>
		<BrowserRouter>
			<ContestProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ContestProvider>
		</BrowserRouter>
	</GoogleOAuthProvider>,
	// </React.StrictMode>,
)
