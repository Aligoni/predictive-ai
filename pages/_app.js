import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import Head from "next/head"
import NextProgress from "next-progress"

import React, { useState, useEffect } from 'react'
import styles from '../styles/MyApp.module.scss'
import { SERVER } from '../services/api'

import axios from 'axios'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let user = localStorage.getItem('predictive-user')
    if (user) {
      try {
        user = JSON.parse(user)
        if (user.id) {
          axios.get(`${SERVER}/users/${user.id}`)
            .then(load => {
              if (load.status == 200) {
                let response = load.data
                if (response.success) {
                  localStorage.setItem('predictive-user', JSON.stringify(response.data))
                } else {
                  console.log(load)
                  localStorage.removeItem('predictive-user')
                }
              }
              setLoading(false)
            }).catch(error => {
              setLoading(false)
              console.log(error)
            })

        } else {
          localStorage.removeItem('predictive-user')
          console.log(user)
          setLoading(false)
        }
      } catch (e) {
        localStorage.removeItem('predictive-user')
        console.log(e)
        setLoading(false)
      }
    } else {
      // localStorage.removeItem('predictive-user')
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={styles.loader}></div>
        {/* <Spinner animation="border" variant="primary" /> */}
        {/* Loading */}
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Career Placement</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        {/* <link rel="icon" href="/Logo2.png" /> */}
      </Head>
      <NextProgress height="3px" color="white" options={{ showSpinner: false}} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
