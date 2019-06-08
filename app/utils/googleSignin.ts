import firebase from 'firebase'
import 'firebase/auth'

// Calling this function will open Google for login.
export default async function googleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase.auth().signInWithRedirect(provider)

    const result = await firebase.auth().getRedirectResult()
    // The signed-in user info.
    const user = result.user
    console.dir(user)
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code
    console.log('google signin errorCode:', errorCode)
    const errorMessage = error.message
    console.log('google signin errorMessage:', errorMessage)
    // The email of the user's account used.
    const email = error.email
    console.log('google signin email:', email)
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential
    console.log('google signin credential:', credential)
  }
}
