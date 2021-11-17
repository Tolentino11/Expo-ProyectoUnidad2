// Import firebase
import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYeYDpQg2kLJdWAxr5R-peQ0owcI5utBY",
  authDomain: "login-e4b28.firebaseapp.com",
  projectId: "login-e4b28",
  storageBucket: "login-e4b28.appspot.com",
  messagingSenderId: "972870153954",
  appId: "1:972870153954:web:3104eba48779c4469150bb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();
class Fire {
  constructor() {
      if (!firebase.apps.length) {
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
      }
  }

  uploadPhotoAsync = async uri => {
      const path = `photos/${Date.now()}.jpg`
      return new Promise(async (res, rej) => {
          const response = await fetch(uri)
          const file = await response.blob()
          let upload = storage.ref(path).put(file)
          upload.on('state_changed', snapshot => {

          }, err => {
              rej(err)
          }, async () => {
              const url = await upload.snapshot.ref.getDownloadURL()
              res(url)
          })
      })

  }
  addPhoto = async (localUri) => {
      const remoteUri = await this.uploadPhotoAsync(localUri)
      return new Promise((res,rej)=>{
          database.ref('/photos').push({
              remoteUri
          })
          this.firestore.collection('photos').add({
              remoteUri
          })
          .then(ref=>{
              res(ref)
          })
          .catch(err=>{
              rej(err)
          })
      })
  }

  get firestore() {
      return firebase.firestore()
  }

  get timestamp() {
      return Date.now()
  }
}

Fire.shared = new Fire()
export default Fire;


export { auth,database,storage };

