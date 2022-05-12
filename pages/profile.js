import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button'
// import styles from '../styles/Documents.module.scss'
import { programs, faculties } from '../services/programs'
import studyCenters from '../services/studyCenters'
import Spinner from 'react-bootstrap/Spinner'
import { SERVER } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export default function Profile() {
    const [authUser, setAuthUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)
    const [programsList, setProgramsList] = useState([])

    useEffect(() => {
        let user = localStorage.getItem('predictive-user')
        try {
            user = JSON.parse(user)
            if (user.id) {
                setAuthUser(user)
                let found = faculties.findIndex(item => item.faculty == user.faculty)
                if (found == -1) {
                    setProgramsList([])
                } else {
                    setProgramsList(faculties[found].programs)
                }
                setInitLoading(false)
            } else {
                localStorage.removeItem('predictive-user')
                window.location = '/'
            }
        } catch (e) {
            localStorage.removeItem('predictive-user')
            window.location = '/'
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

        setLoading(true)
        axios.put(`${SERVER}/users/`+ authUser?.id, {
            fname: form.fname.value,
            lname: form.lname.value,
            email: form.email.value,
            number: form.number.value,
            studyCenter: form.studyCenter.value,
            faculty: form.faculty.value,
            program: form.program.value
        }).then(load => {
            console.log(load)
            if (load.status == 200) {
                let response = load.data
                if (response.success) {
                    toast.success('Profile updated successfully')
                    localStorage.setItem('predictive-user', JSON.stringify(response.data))
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
        <div className="min-h-screen bg-blue-100">
            <Navbar page="Profile" />

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md">Profile page</div>

            <div className="mx-60 my-20">
                {initLoading ? 
                    <div className="flex justify-center w-full p-6 my-40">
                        <Spinner animation="border" variant="primary" />
                    </div> :
                    <Form
                        onSubmit={(submitDocument)}
                        className="px-4"
                    >
                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 text-md" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control defaultValue={authUser.fname}className="text-sm" required type="text" placeholder="John" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-md" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control defaultValue={authUser.lname}className="text-sm" required type="text" placeholder="Doe" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center mt-4">

                            <Form.Group className="md:flex-1 px-4 text-md " controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control defaultValue={authUser.email}disabled={true} className="text-sm" required type="email" placeholder="example@gmail.com" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-md" controlId="number">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control defaultValue={authUser.number}className="text-sm" required type="number" placeholder="+234 00000 0000" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md" controlId="studyCenter">
                                <Form.Label>Study Center</Form.Label>
                                <Form.Select defaultValue={authUser.studyCenter}className="text-sm" required>

                                    <option value={''}>Select Study Center</option>
                                    {studyCenters.map((item, i) =>
                                        <option key={i} value={item.code}>{item.code + ' ' + item.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md" controlId="faculty">
                                <Form.Label>Faculty of Choice</Form.Label>
                                <Form.Select
                                    required
                                    defaultValue={authUser.faculty}
                                    className="text-sm"
                                    onChange={e => changeFaculty(e.target.value)}
                                >
                                    <option value={''}>Select Faculty</option>
                                    {faculties.map((item, i) =>
                                        <option key={i} value={item.faculty}>{item.faculty}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="md:flex-1 px-4 mt-4 text-md" controlId="program">
                                <Form.Label>Program of Choice</Form.Label>
                                <Form.Select defaultValue={authUser.program} className="text-sm" required>
                                    <option value={''}>Select Program</option>
                                    {programsList.map((item, i) =>
                                        <option key={i} value={item.code}>{item.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="flex items-end justify-between mt-5 pr-4">
                            <div className="flex items-center">
                                {loading && <Spinner animation="border" variant="primary" />}
                                <Button
                                    className='ml-5'
                                    disabled={loading}
                                    varient="primary"
                                    type="submit"
                                >Update Profile</Button>
                            </div>
                        </div>
                    </Form>
                }
            </div>

            <Footer />
            <ToastContainer />
        </div>
    )
}