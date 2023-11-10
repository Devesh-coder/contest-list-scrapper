import { Typography } from '@material-tailwind/react'
import { NavLink, Link } from 'react-router-dom'

function SimpleFooter() {
	const email = process.env.EMAIL || 'cuppcake326@gmail.com'

	const handleClick = () => {
		window.location.href = `mailto:${email}`
	}

	return (
		<footer className='mt-2 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-around'>
			<Typography color='blue-gray' className='font-normal'>
				&copy; 2023 Contest Arena
			</Typography>
			<ul className='flex flex-wrap items-center gap-y-2 gap-x-8'>
				<li>
					<Typography
						color='blue-gray'
						className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
					>
						<NavLink to={'/'}>Home</NavLink>
					</Typography>
				</li>
				<li>
					<Typography
						color='blue-gray'
						className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
					>
						<NavLink to={'/privacy-policy'}>Privacy Policies</NavLink>
					</Typography>
				</li>
				<li>
					<Typography
						onClick={handleClick}
						color='blue-gray'
						className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500 cursor-pointer'
					>
						Contact Us
					</Typography>
				</li>
			</ul>
		</footer>
	)
}

export default SimpleFooter
