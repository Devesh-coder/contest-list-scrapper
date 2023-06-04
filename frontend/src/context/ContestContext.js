import { createContext, useState, useEffect } from 'react'
import axios, * as others from 'axios'
const cheerio = require('cheerio')

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [contest, setContest] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get('https://localhost:5000/Contest')
			setContest(data.data)
			console.log(data.data)
		}
		fetchData()

		setIsLoading(false)
	}, [])

	return (
		<ContestContext.Provider value={{ contest }}>
			{!isLoading && children}
		</ContestContext.Provider>
	)
}

export default ContestContext
