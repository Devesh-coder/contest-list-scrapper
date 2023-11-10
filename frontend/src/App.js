// import './App.css'

import Home from './components/Home'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import Dashboard from './scenes/dashboard'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import ContestContext from './context/ContestContext'
import { useContext } from 'react'
import DisplayAllContests from './components/DisplayAllContests'
import GoogleAuth from './components/GoogleAuth'
import { ComplexNavbar } from './components/Login'
import SimpleFooter from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {
	const [theme, colorMode] = useMode()
	const [isSidebar, setIsSidebar] = useState(true)
	const { showAllContests } = useContext(ContestContext)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
			</Routes>
			<SimpleFooter />
		</ColorModeContext.Provider>
	)
}

export default App
