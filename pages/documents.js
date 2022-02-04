import Head from 'next/head'
import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Modal from 'react-bootstrap/Modal'
import Footer from '../components/Footer'
import AddDocument from '../components/AddDocument'
import styles from '../styles/Documents.module.scss'
import Spinner from 'react-bootstrap/Spinner'
import { SERVER } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const typeStyles = {
    WAEC: "bg-blue-700 bg-opacity-75 text-gray-200 font-bold",
    NECO: "bg-yellow-600 bg-opacity-75 text-gray-200 font-bold",
    JAMB: "bg-green-700 bg-opacity-75 text-gray-200 font-bold",
    'First Degree': "bg-red-700 bg-opacity-75 text-gray-200 font-bold",
}

export default function Documents() {
    const [uploaded, setUploaded] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [documentSelected, setDocumentSelected] = useState({})
    const [authUser, setAuthUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let user = localStorage.getItem('predictive-user')
        try {
            user = JSON.parse(user)
            if (user.id) {
                setAuthUser(user)
            } else {
                localStorage.removeItem('predictive-user')
                window.location = '/'
            }
        } catch (e) {
            localStorage.removeItem('predictive-user')
            window.location = '/'
        }

        axios.get(`${SERVER}/users/${user.id}`)
            .then(async load => {
                console.log(load)
                if (load.status == 200) {
                    let response = load.data
                    if (response.success) {
                        const update = []
                        for (let waec of response.data.waecs) {
                            waec = await axios.get(`${SERVER}/waec/${waec.id}`)
                            update.push({...waec.data.data, type: 'WAEC'})
                        }
                        for (let neco of response.data.necos) {
                            neco = await axios.get(`${SERVER}/neco/${neco.id}`)
                            update.push({ ...neco.data.data, type: 'NECO' })
                        }
                        setUploaded(update)
                        console.log(update)
                        setLoading(false)
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
    }, [])

    const refreshDocumentList = (item) => {
        setUploaded([...uploaded, item])
    }

    const displaySelectedModal = () => {
        return (
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop='static'
                keyboard={false}
                centered
            >
                <div className="bg-white shadow-xl roundex">
                    <div className="flex p-2 bg-blue-700 justify-between items center text-gray-200">
                        <p className="ml-2 text-3xl">{documentSelected.type}</p>
                        <div onClick={() => setShowModal(false)} className="cursor-pointer p-2 text-xl">
                            X
                        </div>
                    </div>
                    {
                    documentSelected.type == 'JAMB' ?
                        <div>
                            <div className="md:flex align-items justify-between md:my-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Document Name: {documentSelected.name}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Exam Year: {documentSelected.year}</p>
                            </div>
                            <div className="md:flex align-items justify-between md:mb-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Registration Number: {documentSelected.registrationNo}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Score: {documentSelected.score}</p>
                            </div>
                            <div className="text-2xl py-1 border-b-2 border-t-2 border-blue-700 my-2 text-blue-700 text-center">
                                Subjects Selected
                            </div>
                            <div className="p-3">
                                {documentSelected.subjects.map((item, i) =>
                                    <div key={i} className="md:flex align-items justify-between md:mb-2 md:mx-3">
                                        <p className="flex-1 text-lg font-bold">{item.subject}</p>
                                        <p className="flex-1 truncate text-lg">{item.score}</p>
                                    </div>
                                )}
                            </div>
                            <div className="text-xl py-1 border-b-2 border-t-2 border-blue-700 mb-2 px-4">
                                Name of file uploaded: {documentSelected.fileUploaded}
                            </div>
                            {/* <div className="text-right m-4 text-xl font-bold">Upload Date: {documentSelected.uploadDate.toDateString()}</div> */}
                        </div> :
                    documentSelected.type == 'WAEC' ?
                        <div>
                            <div className="md:flex align-items justify-between md:my-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Document Name: {documentSelected.name}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Exam Year: {documentSelected.year}</p>
                            </div>
                            <div className="md:flex align-items justify-between md:mb-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Candidate Number: {documentSelected.candidateNo}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Centre: {documentSelected.centre}</p>
                            </div>
                            <div className="text-2xl py-1 border-b-2 border-t-2 border-blue-700 my-2 text-blue-700 text-center">
                                Subjects Selected
                            </div>
                            <div className="p-3">
                                {documentSelected.subjects.map((item, i) =>
                                    <div key={i} className="md:flex align-items justify-between md:mb-2 md:mx-3">
                                        <p className="flex-1 text-lg font-bold">{item.subject}</p>
                                        <p className="flex-1 truncate text-lg">{item.grade}</p>
                                    </div>
                                )}
                            </div>
                            <div className="text-xl py-1 border-b-2 border-t-2 border-blue-700 mb-2 px-4">
                                Name of file uploaded: {documentSelected.fileUploaded}
                            </div>
                                    <div className="text-right m-4 text-xl font-bold">Upload Date: {new Date(documentSelected.updatedAt).toDateString()}</div>
                        </div>:
                    documentSelected.type == 'NECO' ?
                        <div>
                            <div className="md:flex align-items justify-between md:my-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Document Name: {documentSelected.name}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Exam Year: {documentSelected.year}</p>
                            </div>
                            <div className="md:flex align-items justify-between md:mb-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Candidate Number: {documentSelected.candidateNo}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Centre: {documentSelected.centre}</p>
                            </div>
                            <div className="text-2xl py-1 border-b-2 border-t-2 border-blue-700 my-2 text-blue-700 text-center">
                                Subjects Selected
                            </div>
                            <div className="p-3">
                                {documentSelected.subjects.map((item, i) =>
                                    <div key={i} className="md:flex align-items justify-between md:mb-2 md:mx-3">
                                        <p className="flex-1 text-lg font-bold">{item.subject}</p>
                                        <p className="flex-1 truncate text-lg">{item.grade}</p>
                                    </div>
                                )}
                            </div>
                            <div className="text-xl py-1 border-b-2 border-t-2 border-blue-700 mb-2 px-4">
                                Name of file uploaded: {documentSelected.fileUploaded}
                            </div>
                                <div className="text-right m-4 text-xl font-bold">Upload Date: {new Date(documentSelected.updatedAt).toDateString()}</div>
                            </div>:
                    documentSelected.type == 'First Degree' ?
                        <div>
                            <div className="md:flex align-items justify-between md:my-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Document Name: {documentSelected.name}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Convocation: {documentSelected.convocation}</p>
                            </div>
                            <div className="md:flex align-items justify-between md:mb-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Course: {documentSelected.course}</p>
                                <p className="flex-1 truncate md:text-right text-lg">Degree: {documentSelected.degreeClass}</p>
                            </div>
                            
                            <div className="text-xl py-1 border-b-2 border-t-2 border-blue-700 mb-2 px-4">
                                Name of file uploaded: {documentSelected.fileUploaded}
                            </div>
                            {/* <div className="text-right m-4 text-xl font-bold">Upload Date: {documentSelected.uploadDate.toDateString()}</div> */}
                        </div>: null
                    }
                </div>
            </Modal>
        )
    }
    const displayUploadedDocuments = () => {

        if (uploaded.length > 0) {
            return (
                <div className="flex justify-start w-full flex-wrap mt-8 px-8">
                    {uploaded.map((document, i) => 
                        <div key={i} className={`${styles.uploadedCard} ${document.type == 'WAEC' ? styles.waecImage : document.type == 'JAMB' ? styles.jambImage : document.type == 'First Degree' ? styles.degreeImage : document.type == 'NECO' ? styles.necoImage : ''} shadow-lg rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105`}>
                            <div onClick={() => {setShowModal(true);setDocumentSelected(document)}} className={`${typeStyles[document.type]} rounded-xl p-4 text-lg cursor-pointer`}>

                                <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Name: {document.name}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Type: {document.type}</p>
                                </div>
                                <div className="md:flex align-items justify-between md:mb-2">
                                    {document.type == 'First Degree' ? <p className="flex-1 text-lg truncate">Course: {document.course}</p> : <p className="flex-1 text-lg truncate">Year of Exams: {document.year}</p>}
                                    {document.type == 'WAEC' ? <p className="flex-1 text-lg truncate md:text-right">Centre: {document.centre}</p>:
                                    document.type == 'JAMB' ? <p className="flex-1 text-lg truncate md:text-right">JAMB score: {document.score}</p> :
                                    document.type == 'First Degree' ? <p className="flex-1 text-lg truncate md:text-right">Degree: {document.degreeClass}</p> :
                                    document.type == 'NECO' ? <p className="flex-1 text-lg truncate md:text-right">Centre: {document.centre}</p> : null}
                                </div>
                                <div className="md:flex justify-end">
                                    <p className="text-md">Upload Date: {new Date(document.updatedAt).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        } else {
            return (
                <div className="flex justify-center w-full p-6 mt-4">
                    <div className="flex flex-1 md:flex-initial justify-center items-center p-10 rounded-xl border-1 border-blue-800 bg-blue-400 shadow-md text-white font-bold text-xl text-center">
                        No document uploaded yet
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="min-h-screen bg-blue-100">
            <Navbar page="Documents"/>

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md">Uploaded Documents</div>
            {loading ? 
            <div className="flex justify-center w-full p-6 mt-8">
                <Spinner animation="border" variant="primary" />
            </div> :
            displayUploadedDocuments()}

            {displaySelectedModal()}()

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md mt-6">Add Document</div>

            <AddDocument refreshList={refreshDocumentList} authUser={authUser} />
            <Footer />
            <ToastContainer />
        </div>
    )
}