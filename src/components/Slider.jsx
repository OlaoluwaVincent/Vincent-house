import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	getDocs,
	doc,
	collection,
	query,
	orderBy,
	limit,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Loading from './Loading';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			const fetchListings = async () => {
				const listingRef = collection(db, 'listings');
				const q = query(
					listingRef,
					orderBy('timeStamp', 'desc'),
					limit(5)
				);
				const querySnap = await getDocs(q);

				let listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			};
			fetchListings();
		}
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (listings.length === 0) {
		return <></>;
	}

	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>

				<Swiper slidesPerView={1} pagination={{ clickable: true }}>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() =>
								navigate(`/category/${data.type}/${id}`)
							}
						>
							<div
								style={{
									background: `url(${data.imageUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
								className='swiper-container swiperSlideDiv'
							>
								<p className='swiperSlideText'>{data.name}</p>
								<p className='swiperSlidePrice'>
									${data.discountedPrice ?? data.regularPrice}
									{data.type === 'rent' ? '/ Month' : null}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
};

export default Slider;
