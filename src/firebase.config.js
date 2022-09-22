// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCysWIJSfgDaaKDRXul9E9cTDvxNMfuX5U',
	authDomain: 'vincent-market-place.firebaseapp.com',
	projectId: 'vincent-market-place',
	storageBucket: 'vincent-market-place.appspot.com',
	messagingSenderId: '33886078563',
	appId: '1:33886078563:web:bf09fa3c3a8340801c1a56',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
