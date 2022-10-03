import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form'
import Footer from '../components/Footer'
import Modal from 'react-bootstrap/Modal'
import {programs, faculties} from '../services/programs'
import studyCenters from '../services/studyCenters'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import { SERVER } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [programsList, setProgramsList] = useState([])

    useEffect(() => {
        let user = localStorage.getItem('predictive-user')
        try {
            user = JSON.parse(user)
            if (user.id) {
                toast.success('Already logged in')
                router.push("/dashboard")
            } else {
                
            }
        } catch (e) {
            
        }
    }, [])

    const submitDocument = e => {
        e.preventDefault()
        e.stopPropagation()

        const form = e.currentTarget
        if (!form.faculty.value || !form.program.value || !form.studyCenter.value) {
            toast.error('Please provide all necessary information')
            return
        }

        if (form.password.value.length < 6) {
            toast.error('Password must be greater than length of 6')
            return
        }

        if (form.password.value != form.confirm.value) {
            toast.error('Passwords do not match')
            return
        }
        
        setLoading(true)
        axios.post(`${SERVER}/users`, {
            fname: form.fname.value,
            lname: form.lname.value,
            email: form.email.value,
            number: form.number.value,
            studyCenter: form.studyCenter.value,
            faculty: form.faculty.value,
            program: form.program.value,
            password: form.password.value
        }).then(load => {
            console.log(load)
            if (load.status == 200) {
                let response = load.data
                if (response.success) {
                    toast.success('Registration Successful!')
                    localStorage.setItem('predictive-user', JSON.stringify(response.data))
                    setTimeout(() => {
                        window.location = '/dashboard'
                    }, 1000)
                } else {
                    toast.error(`Error: ${response.msg}`)
                }
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log(error)
            toast.error('Something went wrong. Try again later')
        })
    }

    const changeFaculty = (value) => {
        let found = faculties.findIndex(item => item.faculty == value)
        if (found == -1) {
            setProgramsList([])
        } else {
            setProgramsList(faculties[found].programs)
        }
    }

    return (
        <div className="flex-col md:flex-row flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-300">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl font-bold mb-4">Results Grader</p>
                    <p className="text-xl mb-10">Please provide the following details to create your account</p>
                    <div className="mx-40">
                        <img src="/images/brain neurons.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="md:mx-10">

                    <Form
                        onSubmit={(submitDocument)}
                        className="px-4"
                    >
                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 text-md" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control className="text-sm" required type="text" placeholder="John" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-md" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control className="text-sm" required type="text" placeholder="Doe" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center mt-4">

                            <Form.Group className="md:flex-1 px-4 text-md " controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="text-sm" required type="email" placeholder="example@gmail.com" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-md" controlId="number">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control className="text-sm" required type="number" placeholder="+234 00000 0000" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md" controlId="studyCenter">
                                <Form.Label>Study Center</Form.Label>
                                <Form.Select className="text-sm" required>

                                    <option value={''}>Select Study Center</option>
                                    {studyCenters.map((item, i) =>
                                        <option key={i} value={item.code}>{item.code + ' ' + item.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="flex-col md:flex-row flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md" controlId="faculty">
                                <Form.Label>Faculty of Choice</Form.Label>
                                <Form.Select 
                                    required
                                    className="text-sm"
                                    onChange={e => changeFaculty(e.target.value)}
                                >
                                    <option value={''}>Select Faculty</option>
                                    {faculties.map((item, i) =>
                                        <option key={i} value={item.faculty}>{item.faculty}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md w-full" controlId="program">
                                <Form.Label>Program of Choice</Form.Label>
                                <Form.Select className="text-sm" required>
                                    <option value={''}>Select Program</option>
                                    {programsList.map((item, i) =>
                                        <option key={i} value={item.code}>{item.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">

                            <Form.Group className="md:flex-1 px-4 mt-5 text-md " controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="text-sm" required type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 mt-5 text-md " controlId="confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control className="text-sm" required type="password" placeholder="Confirm Password" />
                            </Form.Group>
                        </div>
                        <div className="flex items-end justify-between mt-5 pr-4">
                            <Link href="/?login=true"><p className="text-gray-600 text-lg underline ml-4 hover:text-gray-900 cursor-pointer">Have an account? Log In</p></Link>
                            <div className="flex items-center">
                                {loading && <Spinner animation="border" variant="primary" />}
                                <Button 
                                    className='ml-5' 
                                    disabled={loading}
                                    varient="primary" 
                                    type="submit"
                                >Register</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
