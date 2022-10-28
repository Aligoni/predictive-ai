import {useState, useEffect} from 'react'
import Link from 'next/link'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import EvaluateResult from '../components/EvaluateResult'
import { SERVER } from '../services/api'
import axios from 'axios'

import styles from '../styles/Dashboard.module.scss'
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ProgressBar } from 'react-bootstrap'

const types = [
    {
        type: 'First Degree',
        requirements: 'WAEC/NECO and JAMB',
        modalText: 'For your first degree, you need to select a WAEC/NECO and JAMB result to use for the evaluation.'
    },
    {
        type: 'Masters Degree',
        requirements: 'WAEC/NECO and First Degree'
    }
]

const typeStyles = {
    'Masters Degree': "bg-green-700 bg-opacity-75 text-gray-200 font-bold",
    'First Degree': "bg-red-700 bg-opacity-75",
}

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    const [documentType, setDocumentType] = useState({})
    const [evaluation, setEvaluation] = useState({})
    const [modal, setModal] = useState(false)
    const [authUser, setAuthUser] = useState({})

    useEffect(() => {
        let user = localStorage.getItem('predictive-user')
        try {
            user = JSON.parse(user)
            if (user.id) {
                if (user.evaluations.length > 0) {
                    for (let i = 0; i < user.evaluations.length; i ++) {
                        user.evaluations[i].details.sort((a, b) => b.score - a.score)
                    }
                }
                setAuthUser(user)
            } else {
                localStorage.removeItem('predictive-user')
                window.location = '/'
            }
        } catch (e) {
            localStorage.removeItem('predictive-user')
            window.location = '/'
        }

        console.log(user)
    }, [])
    
    const selectType = (temp) => {
        setDocumentType(temp)
        setShowModal(true)
    }

    const getViability = (score) => {
        return score > 79 ? "Very High" :
            score > 69 ? "High" :
            score > 49 ? "Good" : "Poor"
    }

    const displaySelectedModal = () => {
        return (
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop='static'
                keyboard={false}
                centered
            >
                <div className="bg-white shadow-xl roundex">
                    <div className="flex p-2 bg-blue-700 justify-between items center text-gray-200">
                        <p className="ml-2 text-3xl">{evaluation.type}</p>
                        <div onClick={() => setModal(false)} className="cursor-pointer p-2 text-xl">
                            X
                        </div>
                    </div>
                    {
                    evaluation.type == 'First Degree' ?
                        <div>
                            <div className="md:flex align-items justify-between md:my-2 md:mx-3 font-bold">
                                <p className="text-lg">Recommendation: {evaluation.recommended}</p>
                                <p className="truncate md:text-right text-lg">Viability: {getViability(evaluation.score)}</p>
                            </div>
                            <div className="md:flex align-items md:mb-2 md:mx-3 font-bold">
                                <p className="flex-1 text-lg">Credentials used: JAMB
                                {evaluation.waecId ? ', WAEC': ', NECO'}</p>
                                {/* <p className="flex-1 truncate md:text-right text-lg">Score: {evaluation.jambScore}</p> */}
                            </div>
                            <div className="text-2xl py-1 border-b-2 border-t-2 border-blue-700 my-2 text-blue-700 text-center">
                                All courses evaluation
                            </div>
                            <div className="p-3">
                                {evaluation.details.map((item, i) =>
                                    <div key={i} className="md:flex align-items justify-between md:mb-2 md:mx-3">
                                        <p className="flex-1 truncate text-lg font-bold">{item.course}</p>
                                        <div className={`${styles.progressBarContainer} flex-1 flex flex-col justify-center`}>
                                        <ProgressBar now={item.score} label={`${item.score}%`}/>
                                        </div>
                                        {/* <p className="flex-1 truncate text-lg">{item.score}</p> */}
                                    </div>
                                )}
                            </div>
                            <div className="text-xl py-1 border-b-2 border-blue-700 mb-2 px-4">
                            </div>
                            <div className="text-right m-4 text-xl font-bold">Upload Date: {new Date(evaluation.updatedAt).toDateString()}</div>
                        </div>: null
                    }
                </div>
            </Modal>
        )
    }

    return (
        <div className="min-h-screen bg-blue-100">
            <Navbar page='Dashboard'/>
            <div className="p-6 md:px-20 text-xl md:text-2xl">Welcome, {authUser?.fname}</div>

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-lg">History</div>
            {authUser.evaluations?.length > 0 ?
                <div className="flex justify-start w-full flex-wrap my-8 px-8">
                    {authUser.evaluations.map((document, i) =>
                        <div key={i} className={`${styles.resultCard} ${document.type == 'First Degree' ? styles.degreeImage : document.type == 'NECO' ? styles.necoImage : ''} shadow-lg rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105`}>
                            <div onClick={() => {setModal(true);setEvaluation(document)}} className={`text-gray-200 font-bold bg-blue-700 bg-opacity-75 rounded-xl p-4 text-lg cursor-pointer`}>

                                <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Type: {document.type}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Viability: {getViability(document.score)}</p>
                                </div>
                                <div className="md:flex justify-start md:mb-2">
                                    <p className="text-md">Recommended: {document.recommended}</p>
                                </div>
                                {/* <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Recommended: {document.recommended}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Viability: {document.score}</p>
                                </div> */}
                                <div className="md:flex justify-start">
                                    <p className="text-md">Evaluation Date: {new Date(document.updatedAt).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div> :
                <div className="flex justify-center w-full p-6 my-4">
                    <div className="flex flex-1 md:flex-initial justify-center items-center p-10 rounded-xl border-1 border-blue-800 bg-blue-400 shadow-md text-white font-bold text-xl text-center">
                        You have not evaluated a result yet
                    </div>
                </div>
            }
            {/* {evaluated.length > 0 ?
                <div className="flex justify-start w-full flex-wrap my-8 px-8">
                    {evaluated.map((document, i) =>
                        <div key={i} className={`${styles.resultCard} ${document.type == 'WAEC' ? styles.waecImage : document.type == 'JAMB' ? styles.jambImage : document.type == 'First Degree' ? styles.degreeImage : document.type == 'NECO' ? styles.necoImage : ''} shadow-lg rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105`}>
                            <div onClick={() => {}} className={`text-gray-200 font-bold bg-blue-700 bg-opacity-75 rounded-xl p-4 text-lg cursor-pointer`}>

                                <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Result for: {document.type}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Type: {document.type}</p>
                                </div>
                                <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Recommended: {document.feedback.recommended[0].course}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Viability: {document.feedback.recommended[0].viability}</p>
                                </div>
                                <div className="md:flex justify-end">
                                    <p className="text-md">Evaluation Date: {document.date.toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div> :
                <div className="flex justify-center w-full p-6 my-4">
                    <div className="flex flex-1 md:flex-initial justify-center items-center p-10 rounded-xl border-1 border-blue-800 bg-blue-400 shadow-md text-white font-bold text-xl text-center">
                        You have not evaluated a result yet
                    </div>
                </div>
            } */}
            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md">Evaluate Result</div>
            {types.map((document, i) => 
                <div key={i} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 m-4 md:my-10 md:mx-60 bg-white flex flex-col shadow-md rounded">
                    <div className={`${typeStyles[document.type]} text-center flex-1 p-4 text-xl md:text-2xl text-gray-200 font-bold`}>
                        {document.type}
                    </div>
                    <div className="p-3 md:px-10 text-xl">Requirements: {document.requirements}</div>
                    <div className="flex justify-end p-4 md:px-10">
                        <Button className="w-32" onClick={() => selectType(document)}>Select</Button>
                    </div>
                </div>
            )}
            <EvaluateResult 
                toast={toast} 
                styles={styles} 
                authUser={authUser}
                documentType={documentType} 
                setDocumentType={setDocumentType} 
                showModal={showModal} 
                setShowModal={setShowModal} 
            />

            {displaySelectedModal()}()

            <Footer />
            <ToastContainer />
        </div>
    )
}