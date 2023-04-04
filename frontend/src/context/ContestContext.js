import { createContext, useState, useEffect } from 'react'
import axios, * as others from 'axios'
const cheerio = require('cheerio')

const ContestContext = createContext()

export const ContestProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)

	const [leetcode, setLeetcode] = useState([])
	const [codeforces, setCodeforces] = useState([])

	useEffect(() => {
		async function scrape() {
			// console.log('called')

			let result = await axios.get('http://localhost:5000/leetcode')
			let data = result.data
			leetcode.push(data)

			result = await axios.get('http://localhost:5000/codeforces')
			data = result.data
			// console.log(data[0])
			codeforces.push(data)

			// codeforces.map((item) => {
			// 	console.log(item.title)
			// })
			setIsLoading(true)
		}
		scrape()
		setIsLoading(false)
	}, [])

	return (
		<ContestContext.Provider value={{ value: 1, leetcode, codeforces }}>
			{children}
		</ContestContext.Provider>
	)
}

export default ContestContext
