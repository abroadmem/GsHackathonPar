const firebase = require('firebase/app');
export default function ({ store, route, redirect }) {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                console.log(user)
                resolve(user);
            } else {
                location.href = "/";
            }
        })
    })
}
