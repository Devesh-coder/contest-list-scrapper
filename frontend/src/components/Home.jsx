import { useContext } from 'react'
import ContestContext from '../context/ContestContext'

function Home() {
	const { value, leetcode, codeforces } = useContext(ContestContext)

	return (
		<div>
			{leetcode[0] &&
				leetcode[0].map((event, index) => (
					<div key={index}>
						<p>{event.title}</p>
						<p>{event.link}</p>
						<p>{event.time}</p>
						<p>{event.duration}</p>
					</div>
				))}
			{codeforces[0] &&
				codeforces[0].map((event, index) => (
					<div key={index}>
						<p>{event.title}</p>
						<p>{event.link}</p>
						<p>{event.time}</p>
						<p>{event.duration}</p>
					</div>
				))}
		</div>
	)
}
export default Home
