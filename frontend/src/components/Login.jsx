import React from 'react'
import { useContext } from 'react'
import ContestContext from '../context/ContestContext'
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'

import {
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
} from '@material-tailwind/react'
import {
	UserCircleIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	PowerIcon,
} from '@heroicons/react/24/solid'

// profile menu component
const profileMenuItems = [
	{
		label: 'My Profile',
		icon: UserCircleIcon,
	},
	{
		label: 'Edit Profile',
		icon: Cog6ToothIcon,
	},

	{
		label: 'Sign Out',
		icon: PowerIcon,
	},
]

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
	const { logoutHandler, userPicture } = useContext(ContestContext)

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
			<MenuHandler>
				<Button
					variant='text'
					color='blue-gray'
					className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto border-2  border-indigo-400'
				>
					<Avatar
						variant='circular'
						size='sm'
						// alt='name of the user if want to implement'
						className='border border-gray-900 p-0.5'
						src={userPicture}
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className='p-1'>
				{profileMenuItems.map(({ label, icon }, key) => {
					const isLastItem = key === profileMenuItems.length - 1
					return (
						<MenuItem
							key={label}
							onClick={() => {
								if (isLastItem) {
									console.log('logout')
									logoutHandler()
									googleLogout()
								}
								closeMenu()
							}}
							className={`flex items-center gap-2 rounded ${
								isLastItem
									? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
									: ''
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
								strokeWidth: 2,
							})}
							<Typography
								as='span'
								variant='small'
								className='font-normal'
								color={isLastItem ? 'red' : 'inherit'}
							>
								{label}
							</Typography>
						</MenuItem>
					)
				})}
			</MenuList>
		</Menu>
	)
}

export function ComplexNavbar() {
	const { isLogged, isPhoneDisplay, login } = useContext(ContestContext)
	console.log(isLogged)

	return (
		<div
			style={{
				paddingTop: '1.4rem',
				marginBottom: '-0.5rem',
				position: 'relative',
				marginRight: '-20%',
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			{isLogged ? (
				<ProfileMenu />
			) : (
				<Button
					onClick={login}
					size='sm'
					variant='text'
					className='border-2 border-indigo-400	'
				>
					<div className='flex items-center gap-x-2'>
						<FcGoogle
							style={isPhoneDisplay ? { fontSize: '1rem' } : { fontSize: '1.5rem' }}
						/>
						Log In
					</div>
				</Button>
			)}

			<ToastContainer />
		</div>
	)
}
