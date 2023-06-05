import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [contest, setContest] = useState([])
	const [curContest, setCurContest] = useState({})

	// Onclicking the contest name on the sidebar
	const contestClickSlider = (contest) => {
		setCurContest(contest)
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get('http://localhost:5000/contests')
			setContest(data.data)
			console.log(data.data)
		}
		fetchData()

		setIsLoading(false)
	}, [])

	return (
		<ContestContext.Provider value={{ contest, contestClickSlider, curContest }}>
			{!isLoading && children}
		</ContestContext.Provider>
	)
}

export default ContestContext
