const { spawn } = require('child_process')
const fs = require('fs')

const data_fetch = async () => {
	try {
		const callingPythonScript = async () => {
			// Set the path to the Python script
			const pythonScriptPath = './services/scraping/scrape.py'

			// Create a new child process using spawn()
			const pythonProcess = spawn('python', [pythonScriptPath])

			return new Promise((resolve, reject) => {
				// Handle standard output from the script
				pythonProcess.stdout.on('data', (data) => {
					console.log(`stdout: ${data}`)
				})

				// Handle errors from the script
				pythonProcess.stderr.on('data', (data) => {
					console.error(`stderr: ${data}`)
				})

				// Handle the process exit event
				pythonProcess.on('exit', (code) => {
					console.log(`Child process exited with code ${code}`)
					resolve()
				})
			})
		}

		await callingPythonScript()

		console.log('inside data-fetcher')
	} catch (error) {
		console.error(error)
		// res.status(500).send('An error occurred')
	}
}

module.exports = data_fetch
