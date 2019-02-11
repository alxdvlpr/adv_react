import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-2901'

const config = {
  apiKey: 'AIzaSyAf5esAVQTmEHmu2y86GnlIY7baOHdBVfA',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '11236196816'
}

firebase.initializeApp(config)
