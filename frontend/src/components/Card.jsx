import { useContext } from 'react'
import ContestContext from '../context/ContestContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

function Card({ link, title, start, duration }) {
	const { color, handleCalendar } = useContext(ContestContext)
	// console.log(color)

	return (
		<div
			style={{
				backgroundColor: '#F2F0F0',
				color: 'black !important',
			}}
			className='hover:drop-shadow-2xl w-64 h-64 min-h-full max-h-100 bg-base-100 border-solid border-2 p-4 rounded-md '
		>
			<span
				style={{
					marginLeft: '200px',
					fontSize: '1.25rem',
					cursor: 'pointer',
				}}
				onClick={() => handleCalendar({ title })}
			>
				<FontAwesomeIcon icon={faCalendar} />
			</span>
			<a href={link} target='_blank'>
				<div className='my-[-10%]'>
					<h4 className='font-bold text-xl mb-11 mt-6 min-h-20 h-20'> {title} </h4>
					<p className='text-base mt-16 mb-5'>Duration: {duration} </p>
					<p className='text-base mt-5'> {start} </p>
				</div>
			</a>
		</div>
	)
}
export default Card
