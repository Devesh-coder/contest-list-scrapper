// import './App.css'

import Home from './components/Home'
import { ContestProvider } from './context/ContestContext'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import Dashboard from './scenes/dashboard'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'

function App() {
	const [theme, colorMode] = useMode()
	const [isSidebar, setIsSidebar] = useState(true)

	return (
		<ContestProvider>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className='app'>
						<Sidebar isSidebar={isSidebar} />
						<main className='content'>
							<Routes>
								<Route path='/' element={<Dashboard />} />
							</Routes>
						</main>
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
			{/* <Home /> */}
		</ContestProvider>
	)
}

export default App
