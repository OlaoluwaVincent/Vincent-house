import { getAuth, updateProfile } from 'firebase/auth';
import {
	updateDoc,
	doc,
	getDocs,
	collection,
	query,
	where,
	orderBy,
	deleteDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../components/ListingItem';

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetails, setChangeDetails] = useState(false);
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, 'listings');
			const q = query(
				listingsRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timeStamp', 'desc')
			);
			const querySnap = await getDocs(q);

			const listingsArray = [];

			querySnap.forEach((doc) => {
				return listingsArray.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listingsArray);
			setLoading(false);
		};
		fetchUserListings();
	}, [auth.currentUser.uid]);

	const onLogout = () => {
		auth.signOut();
		navigate('/');
	};

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};
	const onDelete = async (listingId) => {
		if (window.confirm('Are you sure want to delete?')) {
			await deleteDoc(doc(db, 'listings', listingId));
			const updateLisitngs = listings.filter(
				(listing) => listing.id !== listingId
			);
			setListings(updateLisitngs);
			toast.success('Successfully Deleted');
		}
	};

	const onEdit = (listingId) => {
		navigate(`/edit-listing/${listingId}`);
	};

	const onsubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update the Display name if it is Different from that of Firebase
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				//
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, { name });
				toast.success('Profile Updated');
			}
		} catch (error) {
			toast.error('Could not update profile Details');
		}
	};
	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button type='button' className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && onsubmit();
							setChangeDetails((prev) => !prev);
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							type='text'
							id='name'
							className={
								!changeDetails
									? 'profileName'
									: 'profileNameActive'
							}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type='text'
							id='email'
							className='profileEmail'
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
				<Link to={'/create-listing'} className='createListing'>
					<img src={homeIcon} alt='Home' />
					<p>Sell or Rent your home</p>
					<img src={arrowRight} alt='arrow right' />
				</Link>

				{!loading && listings?.length > 0 && (
					<>
						<p className='listingText'>Your Listings</p>
						<ul className='listingsList'>
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
									onDelete={() => onDelete(listing.id)}
									onEdit={() => onEdit(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	);
};

export default Profile;
