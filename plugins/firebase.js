const firebase = require("firebase/app")

firebase.initializeApp({
    apiKey: "AIzaSyA_UBs-dgJ1_5ow7CP_9obDiv7AZntgFzg",
		authDomain: "gs-signage.firebaseapp.com",
		databaseURL: "https://gs-signage.firebaseio.com",
		projectId: "gs-signage",
		storageBucket: "gs-signage.appspot.com",
		messagingSenderId: "223989198350"
})

export default ({ store }, inject) => {
	inject("firebase", firebase)
}
