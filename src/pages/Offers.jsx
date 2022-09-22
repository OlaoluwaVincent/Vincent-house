import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import ListingItem from '../components/ListingItem';

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [lastFectedListing, setLastFectedListing] = useState(null);

	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				//  Get a refence of the Document from firebase/store
				const listingRef = collection(db, 'listings');

				// Create Query for the database ref
				const q = query(
					listingRef,
					where('offer', '==', true),
					orderBy('timeStamp', 'desc'),
					limit(10)
				);
				// execute Query in the getDoc's'
				// There could be only one users, so using getDoc is for one doc and get docs is for more than 1 doc
				const querySnap = await getDocs(q);
				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFectedListing(lastVisible);

				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error('Could not Fetch Listing');
				setLoading(false);
				navigate('/');
			}
		};
		fetchListings();
		//
		return () => {
			setLoading(true);
		};
	}, []);

	// fetchMore listing
	const onFetchMore = async () => {
		try {
			//  Get a refence of the Document from firebase/store
			const listingRef = collection(db, 'listings');

			// Create Query for the database ref
			const q = query(
				listingRef,
				where('offer', '==', true),
				orderBy('timeStamp', 'desc'),
				startAfter(lastFectedListing),
				limit(10)
			);
			// execute Query in the getDoc's'
			// There could be only one users, so using getDoc is for one doc and get docs is for more than 1 doc
			const querySnap = await getDocs(q);

			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings((prevListing) => [...prevListing, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error('No more Listings');
		}
	};
	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>Offers</p>
			</header>

			{loading ? (
				<Loading />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className='categoryListings'>
							{listings.map((listing) => (
								<ListingItem
									listing={listing.data}
									id={listing.id}
									key={listing.id}
								/>
							))}
						</ul>
					</main>
					{lastFectedListing && (
						<p className='loadMore' onClick={onFetchMore}>
							Load More
						</p>
					)}
				</>
			) : (
				<p>There are no current Offers</p>
			)}
		</div>
	);
};

export default Offers;
