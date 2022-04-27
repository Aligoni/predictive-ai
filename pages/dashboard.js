import {useState, useEffect} from 'react'
import Link from 'next/link'
import Navbar from "../components/Navbar"
import Modal from 'react-bootstrap/Modal'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/Dashboard.module.scss'
import 'react-toastify/dist/ReactToastify.css';

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

const waecUploaded = [
    {
        name: 'My first waec',
        type: 'WAEC',
        uploadDate: new Date(),
        year: '2012',
        centre: 'Zaria, Kaduna'
    },
    {
        name: 'My second waec',
        type: 'WAEC',
        uploadDate: new Date(),
        year: '2015',
        centre: 'Zaria, Kaduna'
    }
]

const jambUploaded = [
    {
        name: 'My first JAMB',
        type: 'JAMB',
        uploadDate: new Date(),
        year: '2013',
        score: 220,
    },
]
const noDoc = "You don't have the required result. Go to the Documents page to upload"

const typeStyles = {
    'Masters Degree': "bg-green-700 bg-opacity-75 text-gray-200 font-bold",
    'First Degree': "bg-red-700 bg-opacity-75",
}

export default function Dashboard() {
    const [evaluated, setEvaluated] = useState([
        {
            type: 'First Degree',
            date: new Date(),
            feedback: {
                recommended: [
                    {
                        course: 'Computer Science',
                        viability: 'Very High',
                    },
                    {
                        course:  'Computer Engineering',
                        viability: 'High'
                    },
                    {
                        course: 'Mathematics',
                        viability: 'High'
                    }
                ],

            }
        }
    ])
    const [showModal, setShowModal] = useState(false)
    const [documentType, setDocumentType] = useState({})
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [activeWaecCard, setActiveWaecCard] = useState(-1)
    const [activeJambCard, setActiveJambCard] = useState(-1)
    const [authUser, setAuthUser] = useState({})

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
    }, [])
    
    const selectType = (temp) => {
        // if (temp.type == 'Masters Degree') return
        setDocumentType(temp)
        setShowModal(true)
    }

    const changeIndex = (next) => {
        if (documentType.type == 'First Degree') {
            if (next) {
                if (carouselIndex == 0) {
                    setCarouselIndex(1)
                } 
                if (carouselIndex == 1) {
                    if (activeWaecCard == -1) {
                        toast.error('Please select a WAEC document first')
                        return
                    }
                    setCarouselIndex(2)
                }
                if (carouselIndex == 2) {
                    if (activeJambCard == -1) {
                        toast.error('Please select a JAMB document first')
                        return
                    }
                    setCarouselIndex(3)
                }
                if (carouselIndex == 3) {
                    toast.success('Evaluation request sent successfully')

                    setCarouselIndex(0)
                    setShowModal(false)
                    setActiveJambCard(-1)
                    setActiveWaecCard(-1)
                    setDocumentType({})
                    return
                }
            } else {
                if (carouselIndex == 0) {
                    setShowModal(false)
                    setActiveJambCard(-1)
                    setActiveWaecCard(-1)
                    setDocumentType({})
                    return
                }
                setCarouselIndex(carouselIndex - 1)
            }
        }

        if (documentType.type == 'Masters Degree') {
            if (next) {
                if (carouselIndex == 0) {
                    setCarouselIndex(1)
                }
                if (carouselIndex == 1) {
                    if (activeWaecCard == -1) {
                        toast.error('Please select a WAEC document first')
                        return
                    }
                    setCarouselIndex(2)
                }
                if (carouselIndex == 2) {
                    if (activeJambCard == -1) {
                        toast.error('Please select a JAMB document first')
                        return
                    }
                    setCarouselIndex(3)
                }
                if (carouselIndex == 3) {
                    toast.success('Evaluation request sent successfully')

                    setCarouselIndex(0)
                    setShowModal(false)
                    setActiveJambCard(-1)
                    setActiveWaecCard(-1)
                    setDocumentType({})
                    return
                }
            } else {
                if (carouselIndex == 0) {
                    setShowModal(false)
                    setActiveJambCard(-1)
                    setActiveWaecCard(-1)
                    setDocumentType({})
                    return
                }
                setCarouselIndex(carouselIndex - 1)
            }
        }
    }

    const evaluatorModal = () => {
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
                {documentType.type == 'First Degree' &&

                    <Carousel
                        activeIndex={carouselIndex}
                        interval={null}
                        keyboard={false}
                        controls={false}
                        indicators={false}
                    >
                        <Carousel.Item>
                            <div className="align-image h-100 relative">
                                <img
                                    className="d-block"
                                    src="/images/degree.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">First Degree</div>
                                    <div className="text-xl">
                                        For your first degree, you need to select a WAEC/NECO and JAMB result to use for the evaluation.
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-red-500 text-red-500 font-bold transition hover:bg-red-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Close</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-500 text-blue-500 font-bold transition hover:bg-blue-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative">
                                <img
                                    className="d-block"
                                    src="/images/waec.png"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">First Degree</div>
                                    <div className="my-10 w-full overflow-y-auto">
                                        <div className="text-xl ml-4 mb-3">Please select your WAEC or NECO result for evaluation:</div>
                                        {waecUploaded.length > 0 ?
                                            <div className='flex flex-wrap w-full justify-start'>
                                                {waecUploaded.map((item, i) =>
                                                    <div
                                                        key={i}
                                                        onClick={() => setActiveWaecCard(i)}
                                                        className={`${styles.documentCard} document-card p-4 shadow-xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-200 ${activeWaecCard == i ? 'scale-105 -translate-y-1 bg-blue-300' : ''}`}
                                                    >
                                                        <div className="text-lg text-gray-800">
                                                            Name: {item.name}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Year of exams: {item.year}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Upload Date: {item.uploadDate.toDateString()}
                                                        </div>
                                                    </div>
                                                )}
                                            </div> :
                                            <div className="mt-10 text-red-600 text-2xl">You don't have a WAEC result uploaded. Please upload one in the <Link href="/documents" className="underline">Documents page</Link></div>
                                        }
                                        {waecUploaded.length > 0 &&
                                            <div className={`mt-10 text-xl text-blue-500 text-center ${activeWaecCard == -1 ? 'opacity-0' : ''}`}>
                                                Document Selected: {activeWaecCard != -1 ? waecUploaded[activeWaecCard].name : ''}
                                            </div>
                                        }
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/jamb.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">First Degree</div>
                                    <div className="my-10 overflow-y-auto w-full">
                                        <div className="text-xl ml-4 mb-3">Please select your JAMB result for evaluation:</div>
                                        {jambUploaded.length > 0 ?
                                            <div className='flex flex-wrap w-full justify-start'>
                                                {jambUploaded.map((item, i) =>
                                                    <div
                                                        key={i}
                                                        onClick={() => setActiveJambCard(i)}
                                                        className={`${styles.documentCard} document-card p-4 shadow-xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-200 ${activeJambCard == i ? 'scale-105 -translate-y-1 bg-blue-300' : ''}`}
                                                    >
                                                        <div className="text-lg text-gray-800">
                                                            Name: {item.name}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Year of exams: {item.year}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Jamb Score: {item.score}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Upload Date: {item.uploadDate.toDateString()}
                                                        </div>
                                                    </div>
                                                )}
                                            </div> :
                                            <div className="mt-10 text-red-600 text-2xl">You don't have a JAMB result uploaded. Please upload one in the <Link href="/documents" className="underline">Documents page</Link></div>
                                        }
                                        {jambUploaded.length > 0 &&
                                            <div className={`mt-10 text-xl text-blue-500 text-center ${activeJambCard == -1 ? 'opacity-0' : ''}`}>
                                                Document Selected: {activeJambCard != -1 ? jambUploaded[activeJambCard].name : ''}
                                            </div>
                                        }
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/jamb.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">First Degree</div>
                                    <div className="my-10 overflow-y-auto w-full">
                                        <div className="text-center text-2xl my-5">Confirm Selected Documents</div>
                                        <div className="text-green-500 text-xl my-2">
                                            WAEC: (Document name) {waecUploaded[activeWaecCard]?.name}
                                        </div>
                                        <div className="text-green-500 text-xl my-2">
                                            JAMB: (Document name) {jambUploaded[activeJambCard]?.name}
                                        </div>
                                        <div className="mt-10 text-2xl text-red-600">
                                            By submitting, you agree to our Terms and Conditions. The result will be available in a few minuites and will be visible in your dashboard. Thank you for trusting us!
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-green-400 text-green-400 font-bold transition hover:bg-green-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                }
                {documentType.type == 'Masters Degree' &&

                    <Carousel
                        activeIndex={carouselIndex}
                        interval={null}
                        keyboard={false}
                        controls={false}
                        indicators={false}
                    >
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/degree.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">Masters Degree</div>
                                    <div className="text-xl">
                                        For your maasters degree, you need to select a WAEC/NECO and your first degree result to use for the evaluation.
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-red-500 text-red-500 font-bold transition hover:bg-red-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Close</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-500 text-blue-500 font-bold transition hover:bg-blue-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/waec.png"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">Masters Degree</div>
                                    <div className="my-10 w-full overflow-y-auto">
                                        <div className="text-xl ml-4 mb-3">Please select your WAEC or NECO result for evaluation:</div>
                                        {waecUploaded.length > 0 ?
                                            <div className='flex flex-wrap w-full justify-start'>
                                                {waecUploaded.map((item, i) =>
                                                    <div
                                                        key={i}
                                                        onClick={() => setActiveWaecCard(i)}
                                                        className={`${styles.documentCard} document-card p-4 shadow-xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-200 ${activeWaecCard == i ? 'scale-105 -translate-y-1 bg-blue-300' : ''}`}
                                                    >
                                                        <div className="text-lg text-gray-800">
                                                            Name: {item.name}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Year of exams: {item.year}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Upload Date: {item.uploadDate.toDateString()}
                                                        </div>
                                                    </div>
                                                )}
                                            </div> :
                                            <div className="mt-10 text-red-600 text-2xl">You don't have a WAEC or NECO result uploaded. Please upload one in the <Link href="/documents" className="underline">Documents page</Link></div>
                                        }
                                        {waecUploaded.length > 0 &&
                                            <div className={`mt-10 text-xl text-blue-500 text-center ${activeWaecCard == -1 ? 'opacity-0' : ''}`}>
                                                Document Selected: {activeWaecCard != -1 ? waecUploaded[activeWaecCard].name : ''}
                                            </div>
                                        }
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/jamb.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">Masters Degree</div>
                                    <div className="my-10 overflow-y-auto w-full">
                                        <div className="text-xl ml-4 mb-3">Please select your First Degree result for evaluation:</div>
                                        {jambUploaded.length > 0 ?
                                            <div className='flex flex-wrap w-full justify-start'>
                                                {jambUploaded.map((item, i) =>
                                                    <div
                                                        key={i}
                                                        onClick={() => setActiveJambCard(i)}
                                                        className={`${styles.documentCard} document-card p-4 shadow-xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-200 ${activeJambCard == i ? 'scale-105 -translate-y-1 bg-blue-300' : ''}`}
                                                    >
                                                        <div className="text-lg text-gray-800">
                                                            Name: {item.name}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Year of exams: {item.year}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Jamb Score: {item.score}
                                                        </div>
                                                        <div className="mt-3 text-lg text-gray-800">
                                                            Upload Date: {item.uploadDate.toDateString()}
                                                        </div>
                                                    </div>
                                                )}
                                            </div> :
                                            <div className="mt-10 text-red-600 text-2xl">You don't have a First Degree uploaded. Please upload one in the <Link href="/documents" className="underline">Documents page</Link></div>
                                        }
                                        {jambUploaded.length > 0 &&
                                            <div className={`mt-10 text-xl text-blue-500 text-center ${activeJambCard == -1 ? 'opacity-0' : ''}`}>
                                                Document Selected: {activeJambCard != -1 ? jambUploaded[activeJambCard].name : ''}
                                            </div>
                                        }
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="align-image h-100 relative rounded">
                                <img
                                    className="d-block rounded"
                                    src="/images/jamb.jpg"
                                    alt="First slide"
                                />
                                <div className="p-8 items-start flex flex-col justify-between rounded absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold">
                                    <div className="w-full text-center text-3xl mt-4">Masters Degree</div>
                                    <div className="my-10 overflow-y-auto w-full">
                                        <div className="text-center text-2xl my-5">Confirm Selected Documents</div>
                                        <div className="text-green-500 text-xl my-2">
                                            WAEC: (Document name) {waecUploaded[activeWaecCard]?.name}
                                        </div>
                                        <div className="text-green-500 text-xl my-2">
                                            JAMB: (Document name) {jambUploaded[activeJambCard]?.name}
                                        </div>
                                        <div className="mt-10 text-2xl text-red-600">
                                            By submitting, you agree to our Terms and Conditions. The result will be available in a few minuites and will be visible in your dashboard. Thank you for trusting us!
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-end">
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                        <button className='rounded w-1/5 bg-initial px-6 py-2 border-3 border-green-400 text-green-400 font-bold transition hover:bg-green-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                }
            </Modal>

        )
    }

    return (
        <div className="min-h-screen bg-blue-100">
            <Navbar page='Dashboard'/>
            <div className="p-6 md:px-20 text-xl md:text-2xl">Welcome, {authUser?.fname}</div>

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-lg">History</div>
            {evaluated.length > 0 ?
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
            }

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
            {evaluatorModal()}

            <Footer />
            <ToastContainer />
        </div>
    )
}