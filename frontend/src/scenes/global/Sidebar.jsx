import { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ContestContext from '../../context/ContestContext'
import { useContext } from 'react'
// import {createBreakpoint} from 'react-use'

// const useBreakpoint = createBreakpoint({ XL: 1280, L: 768, S: 350 });

const Item = ({
	title,
	to,
	icon,
	selected,
	setSelected,
	item,
	isCollapsed,
	handleClick,
	isPhoneDisplay
}) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const { contestClickSlider, showAllContests } = useContext(ContestContext)
	// const breakpoint = useBreakpoint();


	return (
		<MenuItem
			{...(showAllContests && title === 'All Contests'
				? setSelected(title)
				: null)}
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => {
				setSelected(title)
				contestClickSlider(item)
				if (!isCollapsed && isPhoneDisplay) {
					isCollapsed = 1
					console.log(isCollapsed)
					// console.log(breakPoint);
				}
				handleClick(isCollapsed)
			}}
			icon={icon}
		>
			<Typography fontSize='1.1rem'>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	)
}

const Sidebar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const { contest, contestLogoMap } = useContext(ContestContext)
	const [selected, setSelected] = useState('Dashboard')
	const [isPhoneDisplay, setIsPhoneDisplay] = useState(0)


	const [screenSize, setScreenSize] = useState({
		dynamicWidth: window.innerWidth,
	})

	const [isCollapsed, setIsCollapsed] = useState(screenSize.dynamicWidth <= 1000)

	const setDimension = () => {
		setScreenSize({
			dynamicWidth: window.innerWidth,
		})
	}

	useEffect(() => {
		window.addEventListener('resize', setDimension)

		return () => {
			window.removeEventListener('resize', setDimension)
		}
	}, [])

	useEffect(() => {
		// Update isCollapsed when dynamicWidth changes
		setIsCollapsed(screenSize.dynamicWidth <= 1000)
		setIsPhoneDisplay(screenSize.dynamicWidth <= 1000)
	}, [screenSize.dynamicWidth])

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`,
					height: '100vh !important',
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
					<MenuItem
						onClick={() => {
							if (isCollapsed == 1) setIsCollapsed(0)
							else setIsCollapsed(1)
						}}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							paddingTop: isCollapsed ? '20px' : undefined,
							marginBottom: isCollapsed ? '120px' : '20px',
							marginTop: '20px',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box mb='100px'>
								<Box textAlign='center'>
									<Typography
										variant='h2'
										color={colors.grey[100]}
										fontWeight='bold'
										sx={{ m: '25px 0 0 0' }}
									>
										Contest Arena
									</Typography>
								</Box>
							</Box>
						)}
					</MenuItem>

					<Box paddingLeft={isCollapsed ? undefined : '10%'} fontSize='1.5rem'>
						<Item
							fontSize='2rem'
							item={'All Contests'}
							title={'All Contests'}
							// to={`/${item.contestName}`}
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							isCollapsed={isCollapsed}
							handleClick={(value) => setIsCollapsed(value)}
						/>
					</Box>

					<Box paddingLeft={isCollapsed ? undefined : '10%'} fontSize='1.5rem'>
						{contest.map((item) => (
							<Item
								key={item.contestName}
								fontSize='2rem'
								item={item}
								title={item.contestName}
								// to={`/${item.contestName}`}
								icon={contestLogoMap.get(item.contestName)}
								selected={selected}
								setSelected={setSelected}
								isCollapsed={isCollapsed}
								handleClick={(value) => setIsCollapsed(value)}
								isPhoneDisplay={isPhoneDisplay}
							/>
						))}
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	)
}

export default Sidebar
