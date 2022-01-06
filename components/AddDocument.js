import {useState, useEffect, useRef} from 'react'
import Form from 'react-bootstrap/Form'
import { IconContext } from 'react-icons'
import { IoRefresh } from 'react-icons/io5'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const typeList = ['WAEC', 'NECO', 'JAMB', 'First Degree']
const waecGrades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']
const waecSubjects = ['Data Processing', 'Geography', 'Civic Education', 'Further Mathematics', 'Chemistry', 'Physics', 'Technical Drawing', 'Biology', 'Computer', 'Agricultural Science']
const examYears = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2020', '2021']
const degreeClass = ['First Class', 'Second Class Upper', 'Second Class Lower', 'Third Class']
const degreeType = ['B.sc', 'B.art', 'B.eng']

export default function AddDocument (props) {
    const loaderRef = useRef()
    const [type, setType] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)
    const [registeredWaecSubjects, setRegisteredWaecSubjects] = useState(6)
    const [loading, setLoading] = useState(false)
    const [documentFile, setDocumentFile] = useState()

    const selectType = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        let typeChosen = typeList.findIndex(item => item == form.type.value)
        if (typeChosen >= 0) {
            setButtonLoading(true)
            setLoading(true)
            loaderRef.current.scrollIntoView({behavior: 'smooth', block: 'nearest', start: 'inline'})
            setTimeout(() => {
                setButtonLoading(false)
                setLoading(false)
                toast.info(typeList[typeChosen] +' selected')
                setType(typeList[typeChosen])
            }, 2000)
        }

    }

    const refreshDocument = () => {
        setType('')
        setRegisteredWaecSubjects(6)
        setLoading(false)
        setButtonLoading(false)
        setDocumentFile(null)
    }

    const addWaecSubject = () => {
        if (registeredWaecSubjects > 6) {
            setRegisteredWaecSubjects(registeredWaecSubjects - 1)
            return
        } 
        setRegisteredWaecSubjects(registeredWaecSubjects + 1)
    }

    const submitDocument = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (type == 'WAEC' || type == 'NECO') {

            let selectedSubjects = []
            for (let i = 0; i < form.subject.length; i++)
                selectedSubjects.push(form.subject[i].value)

            if (new Set(selectedSubjects).size != selectedSubjects.length) {
                toast.error('Error: Duplicate Subjects selected')
                return
            }

            if (selectedSubjects.length < 8) {
                toast.error('Error: Must add at least eight subjects')
                return
            }
        }

        let document = {}
        document.name = form.name.value
        document.type = type
        document.uploadDate = new Date()
        
        if (type == 'WAEC' || type == 'NECO') {
            document.centre = form.centre.value
            document.candidateNo = form.candidateNo.value
            document.year = form.year.value

            selectedSubjects = []
            for (let i = 0; i < form.subject.length; i++)
                selectedSubjects.push({ subject: form.subject[i].value, grade: form.grade[i].value })

            document.subjects = selectedSubjects
        }

        if (type == 'JAMB') {

            let selectedSubjects = []
            for (let i = 0; i < form.subject.length; i++)
                selectedSubjects.push(form.subject[i].value)

            if (new Set(selectedSubjects).size != selectedSubjects.length) {
                toast.error('Error: Duplicate Subjects selected')
                return
            }
            
            document.registrationNo = form.registrationNo.value
            document.year = form.year.value
            document.score = form.jambScore.value

            selectedSubjects = []
            for (let i = 0; i < form.subject.length; i++)
                selectedSubjects.push({ subject: form.subject[i].value, score: form.score[i].value })

            document.subjects = selectedSubjects
        }

        if (type == 'First Degree') {
            document.course = form.course.value
            document.degreeClass = form.degreeClass.value
            document.convocation = form.convocation.value
        }
        console.log(documentFile)
        document.fileUploaded = documentFile.name

        toast.info('Processing')
        setTimeout(() => {

            setType('')
            setRegisteredWaecSubjects(6)
            setLoading(false)
            setButtonLoading(false)
            setDocumentFile(null)
            toast.success('Document added successfully')

            props.refreshList(document)
        }, 1500)

    }

    const displayDocumentFields = () => {
        if (type == 'WAEC') {
            return (
                <Form
                    onSubmit={ submitDocument}
                    className="pb-4"
                >
                    <div className="md:flex md:items-start">
                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="name">
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control required type="text" placeholder="e.g My First WAEC" />
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
                                {examYears.map((type, i) =>
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
                                <option value='English Language'>English Language</option>
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

                    <div className="flex md:items-center flex-col md:flex-row justify-between p-4">
                        {registeredWaecSubjects == 6 ?
                            <div onClick={addWaecSubject} className="text-right flex items-center cursor-pointer md:mx-10">
                                <IconContext.Provider value={{ color: 'blue', size: 20 }}>
                                    <BsPlusCircle />
                                </IconContext.Provider>
                                <p className="text-lg ml-2 text-blue-800">Add Subject</p>
                            </div> :
                            <div onClick={addWaecSubject} className="text-right flex items-center cursor-pointer md:mx-10">
                                <IconContext.Provider value={{ color: 'red', size: 20 }}>
                                    <BsDashCircle />
                                </IconContext.Provider>
                                <p className="text-lg ml-2 text-red-800">Remove Subject</p>
                            </div>
                        }

                        <div className="md:mx-10 pt-4 md:pt-0">
                            <Form.Group controlId="file">
                                <Form.Label>Document File</Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={(e) => {
                                        setDocumentFile(e.target.files[0])
                                    }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="md:flex md:items-end md:justify-between p-4 px-md-12 md:mx-6 border-t">
                        <div className="text-xl text-red-700 flex-1 mb-4 mb-md-0">
                            Please confirm your selection before uploading as you won't be able to edit after. Submitting means you agree to our Terms and Conditions. 
                        </div>
                        <div className="flex-1 text-right">
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit Document
                            </Button>
                        </div>
                    </div>
                </Form>
            )
        }

        if (type == 'NECO') {
            return (
                <Form
                    onSubmit={submitDocument}
                    className="pb-4"
                >
                    <div className="md:flex md:items-start">
                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="name">
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control required type="text" placeholder="e.g My First NECO" />
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
                                {examYears.map((type, i) =>
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
                                <option value='English Language'>English Language</option>
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

                    <div className="flex md:items-center flex-col md:flex-row justify-between p-4">
                        {registeredWaecSubjects == 6 ?
                            <div onClick={addWaecSubject} className="text-right flex items-center cursor-pointer md:mx-10">
                                <IconContext.Provider value={{ color: 'blue', size: 20 }}>
                                    <BsPlusCircle />
                                </IconContext.Provider>
                                <p className="text-lg ml-2 text-blue-800">Add Subject</p>
                            </div> :
                            <div onClick={addWaecSubject} className="text-right flex items-center cursor-pointer md:mx-10">
                                <IconContext.Provider value={{ color: 'red', size: 20 }}>
                                    <BsDashCircle />
                                </IconContext.Provider>
                                <p className="text-lg ml-2 text-red-800">Remove Subject</p>
                            </div>
                        }

                        <div className="md:mx-10 pt-4 md:pt-0">
                            <Form.Group controlId="file">
                                <Form.Label>Document File</Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={(e) => {
                                        setDocumentFile(e.target.files[0])
                                    }}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="md:flex md:items-end md:justify-between p-4 px-md-12 md:mx-6 border-t">
                        <div className="text-xl text-red-700 flex-1 mb-4 mb-md-0">
                            Please confirm your selection before uploading as you won't be able to edit after. Submitting means you agree to our Terms and Conditions.
                        </div>
                        <div className="flex-1 text-right">
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit Document
                            </Button>
                        </div>
                    </div>
                </Form>
            )
        }

        if (type == 'JAMB') {
            return (
                <Form
                    onSubmit={submitDocument}
                    className="pb-4"
                >
                    <div className="md:flex md:items-start">
                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="name">
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control required type="text" placeholder="e.g My First Jamb" />
                            <Form.Text>This is to differentiate documents of the same type</Form.Text>
                        </Form.Group>

                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="registrationNo">
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control required type="text" placeholder="e.g 41903040BD" />
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
                                {examYears.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="md:flex-1 p-4" controlId="jambScore">
                            <Form.Label>Jamb Score</Form.Label>
                            <Form.Control required min='1' max='400' type="number" placeholder="e.g 192" />
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
                                <option value='Use of English'>Use of English</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="md:flex-1 md:px-10 py-2 py-md-0 flex items-center" controlId="score">
                            <Form.Label className="flex-1 md:text-right md:mr-10" style={{ marginBottom: 0 }}>Score:</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                min="1"
                                max="100"
                                className="flex-1"
                                placeholder={0}
                            />
                        </Form.Group>
                    </div>

                    {Array(3).fill(0).map((index, i) =>
                        <div key={i} className="mx-4 py-4 border-b md:flex items-center">
                            <Form.Group className="md:flex-1 md:px-10 pt-2 pt-md-0 flex items-center" controlId="subject">
                                <Form.Label style={{ marginBottom: 0, marginRight: 20 }} >Subject {i + 2}:</Form.Label>
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
                            <Form.Group className="md:flex-1 md:px-10 py-2 py-md-0 flex items-center" controlId="score">
                                <Form.Label className="flex-1 md:text-right md:mr-10" style={{ marginBottom: 0 }}>Score:</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    min="1"
                                    max="100"
                                    className="flex-1"
                                    placeholder={0}
                                />
                            </Form.Group>
                        </div>
                    )}

                    <div className="md:mx-10 p-4 md:flex">
                        <Form.Group controlId="file">
                            <Form.Label>Document File</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                onChange={(e) => {
                                    setDocumentFile(e.target.files[0])
                                }}
                            />
                        </Form.Group>
                    </div>

                    <div className="md:flex md:items-end md:justify-between p-4 px-md-12 md:mx-6 border-t">
                        <div className="text-xl text-red-700 flex-1 mb-4 mb-md-0">
                            Please confirm your selection before uploading as you won't be able to edit after. Submitting means you agree to our Terms and Conditions.
                        </div>
                        <div className="flex-1 text-right">
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit Document
                            </Button>
                        </div>
                    </div>
                </Form>
            )
        }

        if (type == 'First Degree') {
            return (
                <Form
                    onSubmit={submitDocument}
                    className="pb-4"
                >
                    <div className="md:flex md:items-start">
                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="name">
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control required type="text" placeholder="e.g My First Degree" />
                            <Form.Text>This is to differentiate documents of the same type</Form.Text>
                        </Form.Group>

                        <Form.Group className="md:flex-1 px-4 pt-4" controlId="course">
                            <Form.Label>Course of Study</Form.Label>
                            <Form.Control required type="text" placeholder="e.g Computer Science" />
                        </Form.Group>
                    </div>

                    <div className="md:flex md:items-center">
                        <Form.Group className="md:flex-1 px-4 pt-4 md:pb-6" controlId="convocation">
                            <Form.Label>Convocation</Form.Label>
                            <Form.Control
                                required
                                as="select"
                            >
                                <option value=''>Select year</option>
                                {examYears.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="md:flex-1 p-4" controlId="degreeClass">
                            <Form.Label>Degree Class</Form.Label>
                            <Form.Control
                                required
                                as="select"
                            >
                                <option value=''>Select class</option>
                                {degreeClass.map((type, i) =>
                                    <option key={i}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="md:mx-10 p-4 md:flex">
                        <Form.Group controlId="file">
                            <Form.Label>Document File</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                onChange={(e) => {
                                    setDocumentFile(e.target.files[0])
                                }}
                            />
                        </Form.Group>
                    </div>

                    <div className="md:flex md:items-end md:justify-between p-4 px-md-12 md:mx-6 border-t">
                        <div className="text-xl text-red-700 flex-1 mb-4 mb-md-0">
                            Please confirm your selection before uploading as you won't be able to edit after. Submitting means you agree to our Terms and Conditions.
                        </div>
                        <div className="flex-1 text-right">
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit Document
                            </Button>
                        </div>
                    </div>
                </Form>
            )
        }

        return null
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

            <div ref={loaderRef} className="justify-center items-center p-8" style={{display: loading? 'flex': 'none'}}>
                <Spinner animation="border" variant="primary" />
            </div>

            {!loading && type &&
                <div className="mx-4 mt-8 md:mx-40 bg-white rounded shadow-lg">
                    <div className="md:flex justify-between items-center p-4 text-xl bg-blue-700 text-white">
                        <div>Document Type: {type}</div>
                        <div onClick={() => refreshDocument()} className="cursor-pointer">
                            <IconContext.Provider value={{ color: 'whote', size: 30 }}>
                                <IoRefresh />
                            </IconContext.Provider>
                        </div>
                    </div>
                    {/* <div className="h-1 border-b border-blue-700"/> */}
                    {displayDocumentFields()}
                </div>
            }
            <ToastContainer />
        </div>
    )
}