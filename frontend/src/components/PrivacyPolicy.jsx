import { useContext } from 'react'
import ContestContext from '../context/ContestContext'

function PrivacyPolicy() {
	const { isPhoneDisplay } = useContext(ContestContext)
	return (
		<div style={{ width: '65%', margin: 'auto' }}>
			<br />
			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.5rem' : '2rem' }}
			>
				Privacy Policy
			</h1>
			<br />

			<div className='date'>Effective date: October 19, 2023</div>
			<br />

			<div className='date'>Last Updated: October 20, 2023</div>
			<br />

			<div className='content'>
				Thanks for trusting Contest Arena ('Contest Arena', 'we', 'us', 'our') with
				your personal information! We take our responsibility to you very seriously,
				and so this Privacy Statement describes how we handle your data.
			</div>
			<br />

			<div className='content'>
				PLEASE READ THIS PRIVACY STATEMENT CAREFULLY. By using the Services, you are
				expressly and voluntarily accepting the terms and conditions of this Privacy
				Statement which include allowing us to process information about you.
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				What data do we collect?
			</h1>

			<div className='content'>
				Contest Arena collects the following data:
				<ul class='list-disc' style={{ marginLeft: '40px' }}>
					<li>Email</li>
					<li>Username</li>
					<li>Access to add events to the Google calendar</li>
				</ul>
				If you believe a certain data type is missing from the lists above, feel
				free to contact us and we will answer any questions and update the privacy
				policy.
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				How do we collect your data?
			</h1>
			<div className='content'>
				You directly provide most of the data we collect. We collect data and
				process data when you:
				<ul class='list-disc' style={{ marginLeft: '40px' }}>
					<li>Create and account</li>
				</ul>
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				How do we use your data?
			</h1>
			<div className='content'>
				Contest Arena uses your data to:
				<ul class='list-disc' style={{ marginLeft: '40px' }}>
					<li>Keep you signed in using your profile information. </li>
					<li>
						Help you save contests as events directly in your Google Calendar account.
					</li>
				</ul>
			</div>
			<br />
			<br />
			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				Use of Google Calendar
			</h1>
			<div className='content'>
				To enhance your experience, Contest Arena allows you to save contests as
				events in your Google Calendar. This feature is optional and requires access
				to your Google Calendar, which necessitates signing in with your Google
				account.
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				How do we store your data?
			</h1>
			<div className='content'>
				Contest Arena securely stores your data using MongoDB.
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				What are cookies?
			</h1>
			<div className='content'>
				Cookies are text files placed on your computer to collect standard Internet
				log information and visitor behavior information. When you visit our
				websites, we may collect information from you automatically through cookies
				or similar technology. For further information, see HTTP cookie on
				Wikipedia.
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				How do we use cookies?
			</h1>
			<div className='content'>
				Contest Arena uses cookies in a range of ways to improve your experience on
				our website, including:
				<ul class='list-disc' style={{ marginLeft: '40px' }}>
					<li>Keeping you signed in </li>
				</ul>
			</div>
			<br />
			<br />

			<h1
				className='font-bold mb-5'
				style={{ fontSize: isPhoneDisplay ? '1.2rem' : '1.5rem' }}
			>
				How to contact us
			</h1>
			<div className='content'>
				If you have any questions about Contest Arena's privacy policy, the data we
				hold on you, please do not hesitate to contact us.
				<br />
				General inquiries and Advertising related inquiries:
				<ul class='list-disc' style={{ marginLeft: '40px' }}>
					<li>cuppcake326@gmail.com</li>
				</ul>
			</div>
			<br />
		</div>
	)
}
export default PrivacyPolicy
