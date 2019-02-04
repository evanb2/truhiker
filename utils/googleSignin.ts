import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { clientId } from './env'

// Calling this function will open Google for login.
export default async function googleLogin() {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure({
      iosClientId: clientId,
    })

    const data = await GoogleSignin.signIn()

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken || undefined
    )
    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential)

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
  } catch (e) {
    console.error(e)
  }
}
