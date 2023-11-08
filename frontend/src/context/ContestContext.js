import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { SiCodechef } from 'react-icons/si'
import { SiLeetcode } from 'react-icons/si'
import { SiCodingninjas } from 'react-icons/si'
import { SiGeeksforgeeks } from 'react-icons/si'
import { SiCodeforces } from 'react-icons/si'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [contest, setContest] = useState([])
	const [curContest, setCurContest] = useState({})
	const [color, setColor] = useState('none')
	const [showAllContests, setShowAllContests] = useState(true)
	const [isLogged, setIsLogged] = useState(false)
	const [userPicture, setUserPicture] = useState('')

	const proxy = process.env.BACKEND_URL || 'http://localhost:5000'

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

	function deleteCookie(cookieName) {
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
	}

	const handleCalendar = async (contest) => {
		console.log('calendar', contest.contest)
		await axios
			.post(`${proxy}/create-event`, contest, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response)
				toast.success('Event added to calendar', toastSuccess)
			})
			.catch((err) => {
				console.log(err.data)
				toast.warn(err.response.data.message, toastWarning)
			})
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get(`${proxy}/contests`)

			setContest(data.data)
			console.log(data.data)
		}
		fetchData()

		let sessionStatus = true
		const verifyToken = async () => {
			axios
				.get(`${proxy}/auth/verify`, {
					withCredentials: true,
					referrerPolicy: 'no-referrer',
				})
				.then((response) => {
					console.log(response.data)
					toast.success('User Signed In', toastSuccess)
					setUserPicture(localStorage.getItem('uPic'))
				})
				.catch(async (err) => {
					console.log(
						err.response.data.message,
						err.response.data.status,
						sessionStatus,
					)
					if (localStorage.getItem('uid') == null) {
						if (document.cookie.includes('jwtToken')) deleteCookie('jwtToken')
						sessionStatus = false
						toast.warn(`${err.response.data.message}`, toastWarning)
						setIsLogged(false)
					} else {
						try {
							console.log(
								localStorage.getItem('uid'),
								'inside user credentials in context else',
							)
							const credentials = await axios.get(
								`${proxy}/auth/google/refresh-token/${localStorage.getItem('uid')}`,
								{
									withCredentials: true,
									referrerPolicy: 'no-referrer',
								},
							)
							console.log(credentials.data, credentials.data.message)
							toast.success(credentials.data.message, toastSuccess)
							setUserPicture(localStorage.getItem('uPic'))
						} catch (err) {
							sessionStatus = false
							console.log(err)
							toast.warn(`Session ended, Login Again`, toastWarning)
							localStorage.removeItem('uid')
							setIsLogged(false)
						}
					}
				})
		}
		verifyToken()

		setIsLoading(false)

		if (localStorage.getItem('uid') != null && !isLogged && sessionStatus) {
			setIsLogged(true)
		}
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

	// userLogging
	// const [user, setUser] = useState(null)

	const loginHandler = async (uid, userPic) => {
		localStorage.setItem('uid', uid)
		localStorage.setItem('uPic', userPic)
		setIsLogged(true)
		setUserPicture(userPic)
		// setUser(jwtToken)
	}

	// Athorization Code
	const login = useGoogleLogin({
		onSuccess: async ({ code }) => {
			await axios
				.post(
					`${proxy}/auth/google`,
					{
						code,
					},
					{ withCredentials: true },
				)
				.then((response) => {
					console.log(response.data)
					toast.success(response.data.message, toastSuccess)
					loginHandler(response.data.uid, response.data.userPicture)
				})
				.catch((err) => {
					console.log(err)
					toast.warn(err.message, toastWarning)
				})
		},
		flow: 'auth-code',
		onError: (err) => {
			console.log('error', err)
		},
		scope: 'https://www.googleapis.com/auth/calendar',
	})

	const logoutHandler = () => {
		axios.get(`${proxy}/auth/logout`, { withCredentials: true })
		localStorage.removeItem('uid')
		localStorage.removeItem('uPic')
		setIsLogged(false)
		toast.success('Logout Successful', toastSuccess)
		// setUser(null)
	}

	const toastSuccess = {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	}

	const toastWarning = {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
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
				loginHandler,
				logoutHandler,
				isLogged,
				toastSuccess,
				toastWarning,
				userPicture,
				setUserPicture,
				login,
			}}
		>
			{!isLoading && children}
		</ContestContext.Provider>
	)
}

export default ContestContext
