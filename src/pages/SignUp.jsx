import { useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { async } from '@firebase/util';
import OAuth from '../components/OAuth';

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	// Setting the User form data into this object
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});
	// destructuring to get the data
	const { email, password, name } = formData;
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

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			updateProfile(auth.currentUser, { displayName: name });

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timeStamp = serverTimestamp();
			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			navigate('/');
		} catch (error) {
			toast.error('Bad Connection');
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
							type='text'
							placeholder='Enter Name'
							id='name'
							value={name}
							className='nameInput'
							onChange={onChange}
						/>
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
						<div className='signUpBar'>
							<p className='signUpText'>Sign Up</p>
							<button className='signUpButton'>
								<ArrowRightIcon
									fill='#fff'
									width='34px'
									height='34px'
								/>
							</button>
						</div>
					</form>
					<OAuth />
					<Link to={'/signin'} className='registerLink'>
						Sign In Instead
					</Link>
				</main>
			</div>
		</>
	);
};

export default SignUp;
