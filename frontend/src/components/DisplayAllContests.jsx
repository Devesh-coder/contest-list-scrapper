import { useContext } from 'react'
import ContestContext from '../context/ContestContext'
import Dashboard from '../scenes/dashboard'
import { ComplexNavbar } from './tempNav'

function DisplayAllContests() {
	const { contest, isPhoneDisplay } = useContext(ContestContext)
	// console.log(contest)
	return (
		<div>
			<ComplexNavbar />
			<div style={{ width: '120%', margin: 'auto' }}>
				<div className='ml-[15%] mt-10 mr-[10%] '>
					<h1
						className='font-bold mb-5'
						style={{ fontSize: isPhoneDisplay ? '1.5rem' : '2rem' }}
					>
						All Contests
					</h1>
					<hr
						style={{ width: isPhoneDisplay ? '100%' : '140%', marginLeft: '-5%' }}
					/>
				</div>
			</div>

			{contest.map((curContest) => (
				<Dashboard key={curContest._id} Contest={curContest} />
			))}
		</div>
	)
}

export default DisplayAllContests
