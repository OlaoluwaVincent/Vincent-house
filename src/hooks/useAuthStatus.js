import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingUser, setCheckingUser] = useState(true);
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				}
				setCheckingUser(false);
			});
		}
		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);
	return { loggedIn, checkingUser };
};

export default useAuthStatus;
