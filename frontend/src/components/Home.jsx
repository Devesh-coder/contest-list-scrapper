import { useContext, useState } from 'react'
import ContestContext from '../context/ContestContext'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { ComplexNavbar } from './Login'
import Sidebar from '../scenes/global/Sidebar'
import DisplayAllContests from './DisplayAllContests'
import Dashboard from '../scenes/dashboard'
import { useMode } from '../theme'

function Home() {
	const [theme, colorMode] = useMode()

	const [isSidebar, setIsSidebar] = useState(true)
	const { showAllContests } = useContext(ContestContext)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='app' style={{ overflow: 'hidden' }}>
				<Sidebar isSidebar={isSidebar} />
				<main className='content'>
					<ComplexNavbar /> {/* Google Login */}
					{showAllContests ? <DisplayAllContests /> : <Dashboard />}
				</main>
			</div>
		</ThemeProvider>
	)
}
export default Home
