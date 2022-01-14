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

export default function Register() {
    const router = useRouter()

    useEffect(() => {
        console.log(faculties)
    }, [])

    const submitDocument = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-300">
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
                <div className="mx-10">

                    <Form
                        onSubmit={(submitDocument)}
                        className="px-4"
                    >
                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 text-sm" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control className="text-xs" required type="text" placeholder="John" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-sm" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control className="text-xs" required type="text" placeholder="Doe" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center mt-4">

                            <Form.Group className="md:flex-1 px-4 text-sm " controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="text-xs" required type="email" placeholder="example@gmail.com" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 text-sm" controlId="number">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control className="text-xs" required type="text" placeholder="+234 00000 0000" />
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-sm" controlId="studyCenter">
                                <Form.Label>Study Center</Form.Label>
                                <Form.Select className="text-xs">
                                    <option>Select Study Center</option>
                                    {studyCenters.map(item =>
                                        <option value={item.code}>{item.code + ' ' + item.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center" controlId="faculty">
                            <Form.Group className="md:flex-1 px-4 mt-4 text-sm">
                                <Form.Label>Faculty of Choice</Form.Label>
                                <Form.Select className="text-xs">
                                    <option>Select Faculty</option>
                                    {faculties.map(item =>
                                        <option value={item}>{item}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="md:flex-1 px-4 mt-4 text-sm" controlId="program">
                                <Form.Label>Program of Choice</Form.Label>
                                <Form.Select className="text-xs">
                                    <option>Select Program</option>
                                    {programs.map(item =>
                                        <option value={item.code}>{item.program}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="flex items-center justify-center">

                            <Form.Group className="md:flex-1 px-4 mt-5 text-sm " controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="text-xs" required type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="md:flex-1 px-4 mt-5 text-sm " controlId="confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control className="text-xs" required type="password" placeholder="Confirm Password" />
                            </Form.Group>
                        </div>
                        <div className="flex items-end justify-between mt-5 pr-4">
                            <Link href="/"><p className="text-gray-600 text-lg underline ml-4 hover:text-gray-900 cursor-pointer">Have an account? Log In</p></Link>
                            <Button onClick={() => router.push('/dashboard')} varient="primary" type="submit">Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
