const logoutHandler = (req, res) => {
	res.clearCookie('jwtToken')
	res.send('Logged out')
}

module.exports = logoutHandler
