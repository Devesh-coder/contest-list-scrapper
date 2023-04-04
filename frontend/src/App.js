// import './App.css'

import Home from './components/Home'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ContestProvider } from './context/ContestContext'

function App() {
	return (
		<ContestProvider>
			<div>
				<Home />
			</div>
		</ContestProvider>
	)
}

export default App
