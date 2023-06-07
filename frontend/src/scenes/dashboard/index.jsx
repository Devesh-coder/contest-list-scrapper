import ContestContext from '../../context/ContestContext'
import { useContext } from 'react'
import Card from '../../components/Card'

const Dashboard = () => {
	const { curContest } = useContext(ContestContext)
	console.log(curContest.contests)

	return (
		<>
			<div className=' ml-20 pl-20 mt-10'>
				<h1 className='text-3xl font-bold mb-10'>{curContest.contestName}</h1>
				<div className='grid grid-cols-2 gap-x-32'>
					{curContest.contests &&
						curContest.contests.map((contest) => (
							<div className=' my-7 mr-20'>
								<a href={contest.link} target='_blank'>
									<Card
										title={contest.name}
										start={contest.startTime}
										duration={contest.duration}
									/>
								</a>
								<br />
							</div>
						))}
				</div>
			</div>
		</>
	)
}

export default Dashboard
