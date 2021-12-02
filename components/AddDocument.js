import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { IconContext } from 'react-icons'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { BsPlusCircle } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const typeList = ['WAEC', 'JAMB', 'First Degree', 'GCE']
const waecGrades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']
const waecSubjects = ['Data Processing', 'Geography', 'Civic Education', 'Further Mathematics', 'Chemistry', 'Physics', 'Technical Drawing', 'Biology', 'Computer', 'Agricultural Science']


export default function AddDocument () {
    const [type, setType] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)
    const [registeredWaecSubjects, setRegisteredWaecSubjects] = useState(1)
    const [loading, setLoading] = useState(false)

    const selectType = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        let typeChosen = typeList.findIndex(item => item == form.type.value)
        if (typeChosen >= 0) {
            setButtonLoading(true)
            setLoading(true)
            setTimeout(() => {

                setButtonLoading(false)
                setLoading(false)
                toast.success('WAEC selected')
                setType(typeList[typeChosen])
            }, 2000)
        }

    }

    const addWaecSubject = () => {
        if (registeredWaecSubjects > 6) {
            toast.error('Maximum registered subjects reached!')
            return
        } 
        setRegisteredWaecSubjects(registeredWaecSubjects + 1)
    }

    const displayDocumentFields = () => {
        if (type == 'WAEC') {
            return (
                <Form
                    onSubmit={selectType}
                    className="pb-4"
                >
                    <div className="md:flex md:items-start">
                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="name">
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control required type="text" placeholder="e.g My First Jamb" />
                            <Form.Text>This is to differentiate documents of the same type</Form.Text>
                        </Form.Group>

                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="candidateNo">
                            <Form.Label>Candidate Number</Form.Label>
                            <Form.Control required type="text" placeholder="e.g 4190304001" />
                        </Form.Group>
                    </div>

                    <div className="md:flex md:items-center">
                        <Form.Group className="md:flex-1 px-4 pt-4 md:pb-6" controlId="year">
                            <Form.Label>Exam Year</Form.Label>
                            <Form.Control
                                required
                                as="select"
                            >
                                <option value=''>Select year</option>
                                {['2021', '2020', '2019', '2018'].map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="md:flex-1 p-4" controlId="centre">
                            <Form.Label>Exam Centre</Form.Label>
                            <Form.Control required type="text" placeholder="e.g Gov. college, Nassarawa, Kano" />
                        </Form.Group>
                    </div>

                    <div className="h-1 border-b border-blue-700" />
                    <p className="p-4 text-xl text-center text-blue-700">Subjects Written</p>
                    <div className="h-1 border-b border-blue-700" />

                    <div className="mx-4 py-4 border-b md:flex items-center">
                        <Form.Group className="md:flex-1 md:px-10 pt-2 pt-md-0 flex items-center" controlId="subject">
                            <Form.Label style={{ marginBottom: 0, marginRight: 20 }} >Subject 1:</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="flex-1"
                                disabled
                            >
                                <option value='Mathematics'>Mathematics</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="md:flex-1 md:px-10 py-2 py-md-0 flex items-center" controlId="grade">
                            <Form.Label className="flex-1 md:text-right md:mr-10" style={{ marginBottom: 0 }}>Grade:</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="flex-1"
                            >
                                <option value=''>Select grade</option>
                                {waecGrades.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="mx-4 py-4 border-b md:flex items-center">
                        <Form.Group className="md:flex-1 md:px-10 pt-2 pt-md-0 flex items-center" controlId="subject">
                            <Form.Label style={{ marginBottom: 0, marginRight: 20 }} >Subject 2:</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="flex-1"
                                disabled
                            >
                                <option value='Mathematics'>English Language</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="md:flex-1 md:px-10 py-2 py-md-0 flex items-center" controlId="grade">
                            <Form.Label className="flex-1 md:text-right md:mr-10" style={{ marginBottom: 0 }}>Grade:</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="flex-1"
                            // disabled
                            >
                                <option value=''>Select grade</option>
                                {waecGrades.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    {Array(registeredWaecSubjects).fill(0).map((index, i) =>
                        <div key={i} className="mx-4 py-4 border-b md:flex items-center">
                            <Form.Group className="md:flex-1 md:px-10 pt-2 pt-md-0 flex items-center" controlId="subject">
                                <Form.Label style={{ marginBottom: 0, marginRight: 20 }} >Subject {i + 3}:</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    className="flex-1"
                                >
                                    <option value=''>Select subject</option>
                                    {waecSubjects.map((type, i) =>
                                        <option key={i}>{type}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="md:flex-1 md:px-10 py-2 py-md-0 flex items-center" controlId="grade">
                                <Form.Label className="flex-1 md:text-right md:mr-10" style={{ marginBottom: 0 }}>Grade:</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    className="flex-1"
                                // disabled
                                >
                                    <option value=''>Select grade</option>
                                    {waecGrades.map((type, i) =>
                                        <option key={i}>{type}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    )}

                    <div className="flex items-center justify-end p-4">
                        <div onClick={addWaecSubject} className="flex items-center cursor-pointer md:mx-10">
                            <IconContext.Provider value={{color: 'blue', size: 20}}>
                                <BsPlusCircle />
                            </IconContext.Provider>
                            <p className="text-lg ml-2 text-blue-800">Add Subject</p>                       
                        </div>
                    </div>

                    <div className="md:flex md:items-end md:justify-between p-4 px-md-12 md:mx-6 border-t">
                        <div className="text-xl text-red-700 flex-1 mb-4 mb-md-0">
                            Please confirm your selection before uploading as you won't be able to edit after. Uploading means you agree to our Terms and Conditions. 
                        </div>
                        <div className="flex-1 text-right">
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Upload Document
                            </Button>
                        </div>
                    </div>
                </Form>
            )
        }
    }

    return (
        <div className="pb-10 md:px-16">
            {!type?
            <div className="mx-10 py-10 flex items-center justify-between">
                <div className="hidden md:inline text-2xl mr-6">Select Document Type:</div>
                <div className="flex items-center text-xl flex-1 md:flex-initial">
                    <Form onSubmit={selectType} 
                        className="flex flex-1 justify-between"
                    >
                        <Form.Group className="flex-1" controlId="type">
                            <Form.Control
                                required
                                className="w-full"
                                size="lg"
                                as="select"
                                disabled={buttonLoading}
                            >
                                <option value=''>Select document</option>
                                {typeList.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            className="px-10"
                            variant="primary"
                            type="submit"
                            style={{marginLeft: 10}}
                            disabled={buttonLoading}
                        >
                            Select
                        </Button>
                    </Form>
                </div>
            </div>: null}

            {loading && <div className="flex justify-center items-center p-8">
                <Spinner animation="border" variant="primary" />
            </div>}
            {!loading && type &&
                <div className="mx-4 mt-8 md-mx-40 bg-white rounded shadow-lg">
                    <p className="p-4 text-xl bg-blue-700 text-white">Document Type: {type}</p>
                    {/* <div className="h-1 border-b border-blue-700"/> */}
                    {displayDocumentFields()}
                </div>
            }
            <ToastContainer />
        </div>
    )
}