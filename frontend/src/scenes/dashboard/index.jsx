import ContestContext from '../../context/ContestContext'
import { useContext } from 'react'
import Card from '../../components/Card'

const Dashboard = () => {
	const { curContest } = useContext(ContestContext)
	console.log(curContest.contests)

	return (
		<>
			<div style={{ width: '120%', margin: 'auto' }}>
				<div className='ml-[15%] mt-10 mr-[10%] '>
					<h1 className='text-3xl font-bold mb-10'>{curContest.contestName}</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-[40%]  '>
						{curContest.contests &&
							curContest.contests.map((contest) => (
								<div className=' my-7'>
									<Card
										link={contest.link}
										title={contest.name}
										start={contest.startTime}
										duration={contest.duration}
									/>
									<br />
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
