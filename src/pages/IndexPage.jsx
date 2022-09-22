import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import Offers from './Offers';
import ForgotPassword from './ForgetPassword';
import Explore from './Explore';
import PrivateRoute from '../components/PrivateRoute';
import Category from './Category';
import CreateListing from './CreateListing';
import Listing from './Listing';
import Contact from './Contact';
import EditListing from './EditListing';

const IndexPage = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Explore />} />
				<Route path='/offers' element={<Offers />} />
				<Route path='/category/:categoryName' element={<Category />} />
				<Route
					path='/category/:categoryName/:listingId'
					element={<Listing />}
				/>
				<Route path='/contact/:landlordId' element={<Contact />} />
				<Route path='/create-listing' element={<CreateListing />} />
				<Route
					path='/edit-listing/:listingId'
					element={<EditListing />}
				/>

				<Route path='/profile' element={<PrivateRoute />}>
					<Route path='/profile' element={<Profile />} />
				</Route>

				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
			</Routes>
			<Navbar />
		</>
	);
};

export default IndexPage;
