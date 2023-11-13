import ContestContext from '../../context/ContestContext'
import { useContext } from 'react'
import Card from '../../components/Card'
import { DateTime } from 'luxon'

const Dashboard = ({ Contest }) => {
	let { curContest, contestLogoMap, isPhoneDisplay } = useContext(ContestContext)
	if (Contest != null) {
		curContest = Contest
	}

	const durationIfCodingNinja = 'Click card'

	return (
		<>
			<br />
			<div style={{ width: '120%', margin: 'auto' }}>
				<div className='ml-[15%] mt-10 mr-[10%] '>
					<h1 className='text-2xl font-bold mb-10'>
						<div style={{ display: 'flex', textAlign: 'center' }}>
							<div
								className='mr-[5%]'
								style={{ fontSize: isPhoneDisplay ? '1.5rem' : '2rem' }}
							>
								{contestLogoMap.get(curContest.contestName)}
							</div>
							<div style={{ fontSize: isPhoneDisplay ? '1.2rem' : '2rem' }}>
								{curContest.contestName}
							</div>
						</div>
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-[40%]  '>
						{curContest.contests &&
							curContest.contests.map((contest) => (
								<div key={contest.name} className=' my-7'>
									<Card
										link={contest.link}
										title={contest.name}
										start={new Date(contest.startTime).toLocaleString(
											DateTime.DATETIME_FULL,
										)}
										duration={
											curContest.contestName != 'CodingNinja'
												? contest.duration
												: durationIfCodingNinja
										}
										contest={contest}
										contestName={curContest.contestName}
									/>
									<br />
								</div>
							))}
					</div>
				</div>
				{/* <br /> */}
				<hr style={{ widht: '150%', marginLeft: '8%' }} />
			</div>
		</>
	)
}

export default Dashboard
