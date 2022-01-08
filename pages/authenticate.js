import React, { useEffect } from 'react'
import Router from 'next/router'

import { config } from '../config/config'
import { firebaseApp } from '../lib/firebase'
// import createNotification from '../../lib/createNotification'

import Page from '../components/Page'

function EmailAuthenticatePage ({ query, loggedinRoute = '/' }) {
  useEffect(() => {
    async function loginUserAndRedirect () {
      // Confirm the link is a sign-in with email link.
      if (firebaseApp.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          // User opened the link on a different device. To prevent session fixation attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation')
        }
        try {
          // const result =
          await firebaseApp.auth().signInWithEmailLink(email, window.location.href)
          // Clear email from storage
          window.localStorage.removeItem('emailForSignIn')
          Router.push(loggedinRoute)
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        } catch (error) {
          console.warn(`Warning: ${error.message || error}`, error)
        }
      }
    }
    loginUserAndRedirect()
  }, [query])

  return (
    <Page title='Logging in'>
      <h2>Logging in to {config.appName}...</h2>
    </Page>
  )
}

export default EmailAuthenticatePage
