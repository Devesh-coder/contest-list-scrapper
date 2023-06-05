import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ContestContext from '../../context/ContestContext'
import { useContext } from 'react'

const Item = ({ title, to, icon, selected, setSelected, item }) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const { contestClickSlider } = useContext(ContestContext)

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => {
				setSelected(title)
				contestClickSlider(item)
			}}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	)
}

const Sidebar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [selected, setSelected] = useState('Dashboard')
	const { contest } = useContext(ContestContext)

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: '#868dfb !important',
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important',
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				{/* LOGO AND MENU ICON */}
				<Menu iconShape='square'>
					{!isCollapsed && (
						<Box mb='100px'>
							<Box textAlign='center'>
								<Typography
									variant='h2'
									color={colors.grey[100]}
									fontWeight='bold'
									sx={{ m: '10px 0 0 0' }}
								>
									Contests
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : '10%'} fontSize='1.1rem'>
						{contest.map((item) => (
							<Item
								fontSize='2rem'
								item={item}
								title={item.contestName}
								// to={`/${item.contestName}`}
								icon={<HomeOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						))}

						{/* <Item
							title='Calendar'
							to='/calendar'
							icon={<CalendarTodayOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/> */}
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	)
}

export default Sidebar
