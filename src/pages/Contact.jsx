import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Contact = () => {
	const [message, setMessage] = useState('');
	const [landlord, setLandlord] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const params = useParams();

	useEffect(() => {
		const getLandLord = async () => {
			const docRef = doc(db, 'users', params.landlordId);
			const docSnap = await getDoc(docRef);
			console.log(params.landlordId);
			if (docSnap.exists) {
				setLandlord(docSnap.data());
				console.log(docSnap.data());
			} else {
				console.log(landlord);
				toast.error('Could not get Landlord Data');
			}
		};
		getLandLord();
	}, [params.landlordId]);

	const onChange = (e) => {
		e.preventDefault;
		setMessage(e.target.value);
	};

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Contact Landlord</p>
			</header>
			{landlord !== null && (
				<main>
					<div className='contactLandlord'>
						<p className='landlordName'>
							Contact :{landlord?.name}
						</p>
					</div>

					<form className='messageForm'>
						<div className='messageDiv'>
							<label htmlFor='message' className='messageLabel'>
								Message
							</label>
							<textarea
								name='message'
								id='message'
								className='textarea'
								value={message}
								onChange={onChange}
							/>
						</div>
						<a
							href={`mailto: ${
								landlord?.email
							}?Subject=${searchParams.get(
								'listingName'
							)}&body=${message}`}
						>
							<button type='button' className='primaryButton'>
								Send Message
							</button>
						</a>
					</form>
				</main>
			)}
		</div>
	);
};

export default Contact;
