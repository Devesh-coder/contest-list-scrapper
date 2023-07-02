import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [contest, setContest] = useState([])
	const [curContest, setCurContest] = useState({})
	const [color, setColor] = useState('none')

	const background = [
		{
			title: 'CodingNinja',
			background: 'linear-gradient(90deg,#f96b24 0%,#ff9100 100%)',
		},
		{
			title: 'GeeksForGeeks',
			background: 'linear-gradient(#39766b,#fcfdfc)',
		},
		{
			title: 'Codechef',
			background: '#FFFCF4',
		},
	]

	// Onclicking the contest name on the sidebar
	const contestClickSlider = (contest) => {
		setCurContest(contest)

		// background.map((item) => {
		// 	if (item.title === contest.contestName) {
		// 		console.log(item.background)
		// 		return setColor(item.background)
		// 	}
		// })
	}

	const handleCalendar = async (contest) => {
		console.log('calendar', contest.contest)
		await axios.get(`http://localhost:5000/google`)
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
		<ContestContext.Provider
			value={{ contest, contestClickSlider, curContest, color, handleCalendar }}
		>
			{!isLoading && children}
		</ContestContext.Provider>
	)
}

export default ContestContext
