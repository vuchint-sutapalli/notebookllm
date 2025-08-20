import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAi1_ceGjEAkjopUB5-TKGjMSwIs7oYwGo",
	authDomain: "notebookllm-dd24f.firebaseapp.com",
	projectId: "notebookllm-dd24f",
	storageBucket: "notebookllm-dd24f.firebasestorage.app",
	messagingSenderId: "175949629832",
	appId: "1:175949629832:web:6da2ed07a5f19dcfb0d23d",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
