import { useContext } from 'react'
import ContestContext from '../context/ContestContext'
import Dashboard from '../scenes/dashboard'

function DisplayAllContests() {
	const { contest } = useContext(ContestContext)
	// console.log(contest)
	return (
		<div>
			<div style={{ width: '120%', margin: 'auto' }}>
				<div className='ml-[15%] mt-10 mr-[10%] '>
					<h1 className='font-bold mb-5 md:text-[2rem] text-[1.5rem]'>
						All Contests
					</h1>
					<hr className='w-[140%] sm:w-[100%], ml-[-5%]' />
				</div>
			</div>

			{contest.map((curContest) => (
				<Dashboard key={curContest._id} Contest={curContest} />
			))}
		</div>
	)
}

export default DisplayAllContests
