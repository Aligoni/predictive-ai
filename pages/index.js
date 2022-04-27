import Head from 'next/head'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form'
import Footer from '../components/Footer'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {IconContext} from 'react-icons'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner'
import { SERVER } from '../services/api'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let user = localStorage.getItem('predictive-user')
    try {
      user = JSON.parse(user)
      if (user.id) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    } catch (e) {
      setLoggedIn(false)
    }
  }, [])

  const submitDocument = e => {
    e.preventDefault()
    e.stopPropagation()

    const form = e.currentTarget

    setLoading(true)
    axios.post(`${SERVER}/users/login`, {
      email: form.email.value,
      password: form.password.value
    }).then(load => {
      console.log(load)
      if (load.status == 200) {
        let response = load.data
        if (response.success) {
          localStorage.setItem('predictive-user', JSON.stringify(response.data))
          toast.success('Login Successful!')
          setTimeout(() => {
            window.location = '/dashboard'
          }, 1000)
        } else {
          toast.error(`Error: ${response.msg}`)
          setLoading(false)
        }
      }
    }).catch(error => {
      setLoading(false)
      console.log(error)
      toast.error('Something went wrong. Try again later')
    })
  }

  const displayLoginForm = () => {
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop='static'
        keyboard={false}
        centered
      >
        {showModal &&
          <div className="bg-gray-100">
            <div className="flex justify-between px-4 py-2 items-center border-b-4 border-blue-700">
              <p className="text-3xl text-blue-700">Login</p>
              <div onClick={() => setShowModal(false)} className="cursor-pointer transition hover:bg-red-500 rounded hover:text-gray-100 px-3 py-1 text-2xl font-bold text-red-500">X</div>              
            </div>


            <div className="flex items-center justify-center mt-6">
              <img className="w-44 h-32" src="/logo.png" alt="" />
            </div>
            <Form
              onSubmit={(submitDocument)}
              className="px-4"
            >
              <Form.Group className="md:flex-1 px-4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="example@gmail.com" />
              </Form.Group>

              <Form.Group className="md:flex-1 px-4 pt-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" />
              </Form.Group>

              <div className="flex items-end justify-between my-5 px-4">
                <Link href="/register">
                  <p className="text-gray-400 text-lg underline mr-4 hover:text-gray-800 cursor-pointer">No account? Register</p>
                </Link>
                <div className="flex items-center">
                  {loading && <Spinner animation="border" variant="primary" />}
                  <Button disabled={loading} className="ml-4" varient="primary" type="submit">Login</Button>
                </div>
              </div>
            </Form>

            {/* <div className="px-7 my-4 flex items-center">
              <div className="flex-1 h-1 border-b border-gray-300"></div>
              <div className="text-lg text-gray-500 px-2 ">OR</div>
              <div className="flex-1 h-1 border-b border-gray-300"></div>
            </div>

            <div className="relative flex items-center justify-center mx-7 cursor-pointer hover:bg-red-500 transition mt-4 rounded bg-red-600 shadow-lg">
              <IconContext.Provider value={{ size: 24, className: 'absolute left-0 mx-4 text-white' }}>
                <FaGoogle />
              </IconContext.Provider>
              <p className="my-2 text-lg text-white ">Continue with Google
              </p>
            </div>
            <div className="relative flex items-center justify-center mx-7 cursor-pointer hover:bg-blue-800 transition my-4 rounded bg-blue-900 shadow-lg">
              <IconContext.Provider value={{ size: 24, className: 'absolute left-0 mx-4 text-white' }}>
                <FaFacebookF />
              </IconContext.Provider>
              <p className="my-2 text-lg text-white ">Continue with Facebook
              </p>
            </div> */}
          </div>
        }
      </Modal>
    )
  }

  return (
    <div className="">
      <div className="flex flex-col min-h-screen relative justify-between" style={{ backgroundColor: "rgb(19, 19, 19)"}}>
        <div className="z-10 flex items-center justify-between px-6">
          {/* <img className="w-24 h-16 my-3 ml-3" src="/logo.png" alt="logo"></img> */}
          <p className="text-2xl font-bold text-blue-700 ml-3">Predictive Grader</p>
          <div className="flex items-center my-5">
            {!loggedIn ? 
              <>
                <div className="text-xl mr-6">

                  <div onClick={() => setShowModal(true)} className="cursor-pointer px-8 py-2 bg-blue-900 rounded-md text-white pointer">Log In</div>

                </div>
                <div className="text-xl mr-5 ml-3">
                  <Link href="/register">
                    <p className="cursor-pointer font-bold text-blue-800">Register</p>
                  </Link>
                </div>
              </> :
              <div className="text-xl mr-5 ml-3 mt-3 ">
                <Link href="/dashboard">
                  <p className="cursor-pointer font-bold text-2xl text-gray-400">Dashboard</p>
                </Link>
              </div>
            }
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex-1">
            <p className="text-5xl text-right leading-loose text-gray-200">
              Analyze Student's Early Performance Using Artificial Neural Network 
            </p>
          </div>
          <div className="flex-1 flex p-10 justify-center">
            <img style={{width: '80%'}} src="/images/brain neurons.png" alt="" />

          </div>
        </div>
      </div>
      <div className="flex pt-10 items-center bg-gray-100 justify-center">
        <div className="flex-1 flex items-center justify-center">
          <img src="/images/degree transparent.png" alt="degree" />
        </div>
        <div className="flex-1 pr-10">
          <div className="text-4xl text-center border-b-8 pb-4 border-blue-600 mb-10">
            We Can Help You Identify Your Strengths
          </div>
          <div className="text-xl px-10 my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <div className="text-xl px-10 my-5">
            PEtiam consectetur cursus diam et blandit. 
          </div>
          <div className="text-xl px-10 my-5">
            Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
          </div>
          <div className="text-xl px-10 my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <div className="text-xl px-10 my-5">
            PEtiam consectetur cursus diam et blandit.
          </div>
          <div className="text-xl px-10 my-5">
            Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
          </div>
        </div>
      </div>
      <Footer />
      {displayLoginForm()}
      <ToastContainer />
    </div>
  )
}
