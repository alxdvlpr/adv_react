import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  fetchAllEvents = () =>
    this.fb
      .firestore()
      .collection('events')
      .get()
      .then((res) =>
        res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
      )

  fetchLazyEvents = (id) =>
    this.fb
      .firestore()
      .collection('events')
      .orderBy('title')
      .startAfter(id ? id : '')
      .limit(10)
      .get()
      .then((res) =>
        res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
      )

  updateEvent = (eventId, updates) => {
    return firebase
      .firestore()
      .collection('events')
      .doc(eventId)
      .set(updates)
  }
}

export default new ApiService()
// Dev only
window.apiService = new ApiService()
