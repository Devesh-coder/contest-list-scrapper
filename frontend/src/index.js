import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ContestProvider } from './context/ContestContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <React.StrictMode>

	<BrowserRouter>
		<ContestProvider>
			<App />
		</ContestProvider>
	</BrowserRouter>,
	// </React.StrictMode>,
)
