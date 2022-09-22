import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email Sent');
		} catch (error) {
			toast.error('Failed to Reset Password');
		}
	};

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forgot Password</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						id='email'
						className='emailInput'
						value={email}
						placeholder='Enter a valid Email'
						onChange={onChange}
					/>
					<Link className='forgotPassword' to={'/signin'}>
						Sign In
					</Link>

					<div className='signInBar'>
						<div className='signInText'>Send Reset Link</div>
						<button className='signInButton'>
							<ArrowRightIcon
								fill='#fff'
								width='34px'
								height='34px'
							/>
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
