import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import Head from "next/head"
import NextProgress from "next-progress"

function MyApp({ Component, pageProps }) {
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
