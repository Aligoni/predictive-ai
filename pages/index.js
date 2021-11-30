import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className="flex flex-col min-h-screen w-screen relative bg-gray-300">
        <div className="z-10 flex items-center justify-between fixed top-0 left-0 right-0  px-6">
          <img className="w-14 h-14 my-3 ml-3" src="/favicon.ico" alt="logo"></img>
          <div className="flex items-center">
            <div className="text-xl mr-6">
              <Link href="/dashboard">
              <div className="cursor-pointer px-8 py-2 bg-black rounded-md text-white pointer">Log In</div>
              </Link>
            </div>
            <div className="text-xl mr-5 ml-3">
              <Link href="/dashboard">
                <p className="cursor-pointer font-bold">Register</p>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.background}>
          <div className="bg-black bg-opacity-25 w-full"></div>
        </div>
      </div>
    </div>
  )
}
