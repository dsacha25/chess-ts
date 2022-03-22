// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAIu_0OHjiUObOZJj2YE4didA65vUgA-JU',
	authDomain: 'chess-project-ts.firebaseapp.com',
	projectId: 'chess-project-ts',
	storageBucket: 'chess-project-ts.appspot.com',
	messagingSenderId: '843781004415',
	appId: '1:843781004415:web:2312ca4533b9c27dd3f34a',
	measurementId: 'G-F5W74SB73D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
