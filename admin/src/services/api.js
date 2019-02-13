import firebase from 'firebase/app'
import 'firebase/auth'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)
  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
  fetchEvents = () =>
    firebase
      .firestore()
      .collection('events')
      .get()
      .then((res) => res.docs.map((doc) => doc.data()))
}

export default new ApiService()
