import { toast } from "react-toastify"

import { IRegister , ILogin } from "types";

import { 
  createUserWithEmailAndPassword,
  updateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

import { auth , providerFacebook , providerGoogle } from 'Firebase'



export const registerApi = async (user: IRegister) => {
  
  try {
    const res = await createUserWithEmailAndPassword(auth, user.email, user.password)

    await updateProfile(res.user, {
      displayName: user.name
    })

    return res.user;
    
  } catch (err: any) {
    return toast.error(err.message)
  }
}

export const loginApi = async (user: ILogin) => {
  try {
    const { email, password, remember } = user;

    await setPersistence(auth, 
      remember
      ? browserLocalPersistence
      : browserSessionPersistence
    )

    const res = await signInWithEmailAndPassword(auth, email, password)

    return res.user;
  } catch (err: any) {
    return toast.error(err.message)
  }
}

export const googleApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle)
    return res.user;
  } catch (err: any) {
    return toast.error(err.message)
  }
}

export const facebookApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerFacebook)
    return res.user;
  } catch (err: any) {
    return toast.error(err.message)
  }
}

export const forgotPassApi = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return toast.success('Success! Check your email.');
  } catch (err: any) {
    return toast.error(err.message)
  }
}

export const signOutApi = async () => {
  try {
    await signOut(auth)
  } catch (err: any) {
    return toast.error(err.message)
  }
}
