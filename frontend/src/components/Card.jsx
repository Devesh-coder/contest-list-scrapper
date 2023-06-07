function Card({ title, start, duration }) {
	return (
		<div className='w-64 h-64  min-h-full max-h-100 bg-base-100 border-solid border-2 p-4 rounded-md bg-white'>
			<div className='my-auto'>
				<h4 className='font-bold text-xl mb-11 mt-6 min-h-20 h-20'> {title} </h4>
				<p className='text-base mt-16 mb-5'>Duration: {duration} </p>
				<p className='text-base mt-5'> {start} </p>
			</div>
		</div>
	)
}
export default Card
