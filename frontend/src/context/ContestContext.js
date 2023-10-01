import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { SiCodechef } from 'react-icons/si'
import { SiLeetcode } from 'react-icons/si'
import { SiCodingninjas } from 'react-icons/si'
import { SiGeeksforgeeks } from 'react-icons/si'
import { SiCodeforces } from 'react-icons/si'

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [contest, setContest] = useState([])
	const [curContest, setCurContest] = useState({})
	const [color, setColor] = useState('none')
	const [showAllContests, setShowAllContests] = useState(true)

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

	const contestLogoMap = new Map([
		['CodingNinja', <SiCodingninjas />],
		['GeeksForGeeks', <SiGeeksforgeeks />],
		['Codechef', <SiCodechef />],
		['Leetcode', <SiLeetcode />],
		['Codeforces', <SiCodeforces />],
	])

	// Onclicking the contest name on the sidebar
	const contestClickSlider = (contest) => {
		if (contest != 'All Contests') {
			// console.log(contestLogoMap.get(contest.contestName))
			setCurContest(contest)
			setShowAllContests(false)
		} else {
			setCurContest({})
			setShowAllContests(true)
		}

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

			axios
				.get('http://localhost:5000/auth/verify', { withCredentials: true })
				.then((response) => {
					console.log(response.data)
				})
				.catch((error) => {
					console.error('something not write', error)
				})

			setContest(data.data)
			console.log(data.data)
		}
		fetchData()

		setIsLoading(false)
	}, [])

	const [screenSize, getDimension] = useState({
		dynamicWidth: window.innerWidth,
	})
	const setDimension = () => {
		getDimension({
			dynamicWidth: window.innerWidth,
		})
	}

	useEffect(() => {
		window.addEventListener('resize', setDimension)

		return () => {
			window.removeEventListener('resize', setDimension)
		}
	}, [screenSize])

	let isPhoneDisplay = 0
	if (screenSize.dynamicWidth <= 1000) {
		isPhoneDisplay = 1
		// console.log(isPhoneDisplay)
	}

	return (
		<ContestContext.Provider
			value={{
				contest,
				contestClickSlider,
				curContest,
				color,
				handleCalendar,
				showAllContests,
				contestLogoMap,
				isPhoneDisplay,
			}}
		>
			{!isLoading && children}
		</ContestContext.Provider>
	)
}

export default ContestContext
