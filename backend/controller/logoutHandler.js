const logoutHandler = (req, res) => {
	res.clearCookie('jwtToken', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		path: '/',
	})
	res.send('Logged out')
}

module.exports = logoutHandler
