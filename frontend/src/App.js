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

function App() {
	const [theme, colorMode] = useMode()
	const [isSidebar, setIsSidebar] = useState(true)
	const { showAllContests } = useContext(ContestContext)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='app' style={{ overflow: 'hidden' }}>
					<Sidebar isSidebar={isSidebar} />
					<main className='content'>
						{showAllContests ? <DisplayAllContests /> : <Dashboard />}

						{/* <Routes>
								<Route path='/' element={<Dashboard />} />
							</Routes> */}
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
