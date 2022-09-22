import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	// Setting the User form data into this object
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	// destructuring to get the data
	const { email, password } = formData;
	const navigate = useNavigate();
	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential.user) {
				navigate('/');
			}
		} catch (error) {
			toast.error('Invalid Email or Password');
		}
	};

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back</p>
				</header>
				<main>
					<form onSubmit={onSubmit}>
						<input
							type='email'
							placeholder='Email'
							id='email'
							value={email}
							className='emailInput'
							onChange={onChange}
						/>
						<div className='passwordInputDiv'>
							<input
								type={showPassword ? 'text' : 'password'}
								className='passwordInput'
								placeholder='Password'
								id='password'
								value={password}
								onChange={onChange}
							/>
							<img
								src={visibilityIcon}
								alt='Show Password'
								className='showPassword'
								onClick={() => setShowPassword((prev) => !prev)}
							/>
						</div>
						<Link
							to={'/forgotpassword'}
							className='forgotPasswordLink'
						>
							Forgot Password
						</Link>
						<div className='signInBar'>
							<p className='signInText'>Sign In</p>
							<button className='signInButton'>
								<ArrowRightIcon
									fill='#fff'
									width='34px'
									height='34px'
								/>
							</button>
						</div>
					</form>
					<OAuth />
					<Link to={'/signup'} className='registerLink'>
						Register Instead
					</Link>
				</main>
			</div>
		</>
	);
};

export default SignIn;
