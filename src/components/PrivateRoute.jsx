import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Loading from './Loading';

const PrivateRoute = () => {
	const { loggedIn, checkingUser } = useAuthStatus();

	if (checkingUser) {
		return <Loading />;
	}

	return loggedIn ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default PrivateRoute;
