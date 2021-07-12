const prodConfig = {
	apiKey: "AIzaSyDDyIV8fzC0OqL1jcGj-liaurcVgwwf2FE",
	authDomain: "jobsage-sai-ui-firebase-001.firebaseapp.com",
	projectId: "jobsage-sai-ui-firebase-001",
	storageBucket: "jobsage-sai-ui-firebase-001.appspot.com",
	messagingSenderId: "651021772632",
	appId: "1:651021772632:web:a0f6e07ad2431ed08f272d",
	measurementId: "G-TEEFLFPQDB"
};

const devConfig = {
	apiKey: "AIzaSyDDyIV8fzC0OqL1jcGj-liaurcVgwwf2FE",
	authDomain: "jobsage-sai-ui-firebase-001.firebaseapp.com",
	projectId: "jobsage-sai-ui-firebase-001",
	storageBucket: "jobsage-sai-ui-firebase-001.appspot.com",
	messagingSenderId: "651021772632",
	appId: "1:651021772632:web:a0f6e07ad2431ed08f272d",
	measurementId: "G-TEEFLFPQDB"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
