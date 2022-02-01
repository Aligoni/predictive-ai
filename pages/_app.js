import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import Head from "next/head"
import NextProgress from "next-progress"

import React, {useState, useEffect} from 'react'
import { SERVER } from '../services/api'
import axios from 'axios'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user) {
      try {
        user = JSON.parse(user)
        if (user.id) {
          axios.get(`${SERVER}/users/${user.id}`)
            .then(load => {
              console.log(load)
              if (load.status == 200) {
                let response = load.data
                if (response.success) {
                  localStorage.setItem('user', JSON.stringify(response.data))
                } else {
                  localStorage.removeItem('user')
                }
              }
              setLoading(false)
            }).catch(error => {
              setLoading(false)
              console.log(error)
              toast.error('Something went wrong. Try again later')
            })

        } else {
          localStorage.removeItem('user')
          console.log(user)
          setLoading(false)
        }
      } catch (e) {
        localStorage.removeItem('user')
        console.log(e)
        setLoading(false)
      }
    } else {
      // localStorage.removeItem('user')
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <h1>Loading</h1>
  }
  return (
    <>
      <Head>
        <title>Predictive Grader</title>
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
