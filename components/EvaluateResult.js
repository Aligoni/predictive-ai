import { useState, useEffect } from 'react'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal'
import Carousel from 'react-bootstrap/Carousel'
import { SERVER } from '../services/api'
import axios from 'axios'

export default function EvaluateResult({
    toast, 
    styles, 
    authUser,
    documentType, 
    setDocumentType, 
    showModal, 
    setShowModal
}) {
    const [loading, setLoading] = useState(false)
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [activeWaecCard, setActiveWaecCard] = useState(-1)
    const [activeJambCard, setActiveJambCard] = useState(-1)
    
    const waecUploaded = authUser.waecs
    const jambUploaded = authUser.jambs

    useEffect(() => {
        // console.log(authUser)
    }, [])

    const changeIndex = (next) => {
        if (loading) return
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
                    toast.info('Loading')
                    setLoading(true)
                    
                    axios.post(`${SERVER}/evaluation/first-degree`, {
                        userId: authUser.id,
                        waecId: waecUploaded[activeWaecCard].id,
                        jambId: jambUploaded[activeJambCard].id
                    }).then(load => {
                        if (load.status === 200) {
                            let response = load.data
                            if (response.success == true) {
                                console.log(response.data)
                                toast.success(response.msg)
                                window.location = '/dashboard'
                                setCarouselIndex(0)
                                setShowModal(false)
                                setActiveJambCard(-1)
                                setActiveWaecCard(-1)
                                setDocumentType({})
                                return
                            }else {
                                toast.error('Error: '+ response.msg)
                            }
                        } else {
                            toast.error('Error: '+ response.msg)
                        }
                        setLoading(false)
                        // setCarouselIndex(carouselIndex - 1)
                    }).catch(error => {
                        console.log(error)
                        toast.error('Something went wrong')
                        setLoading(false)
                    })
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

    const CarouselLayout = (props) => {
        return (
            <div className={"align-image h-100 relative"+ (props.style || "")}>
                <img
                    className="d-block"
                    src="/images/degree.jpg"
                    alt="First slide"
                />
                <div className={"p-4 md:p-8 items-start flex flex-col justify-between absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 text-gray-200 font-bold"+ (props.style || "")}>
                    {props.children}
                </div>
            </div>
        )
    }

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
                        <CarouselLayout>
                            <div className="w-full text-center text-3xl mt-4">First Degree</div>
                            <div className="text-xl">
                                For your first degree, you need to select a WAEC/NECO and JAMB result to use for the evaluation.
                            </div>
                            <div className="w-full flex items-center justify-end">
                                <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-red-500 text-red-500 font-bold transition hover:bg-red-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Close</button>
                                <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-500 text-blue-500 font-bold transition hover:bg-blue-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                            </div>
                        </CarouselLayout>
                    </Carousel.Item>
                
                    <Carousel.Item>
                        <CarouselLayout>
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
                                                        Upload Date: {new Date(item.createdAt).toDateString()}
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                </div>
                        </CarouselLayout>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CarouselLayout style="rounded">
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
                                                        Upload Date: {new Date(item.createdAt).toDateString()}
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
                                </div>
                        </CarouselLayout>
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-green-400 text-green-400 font-bold transition hover:bg-green-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Submit</button>
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-red-500 text-red-500 font-bold transition hover:bg-red-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Close</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-500 text-blue-500 font-bold transition hover:bg-blue-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
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
                                                        Upload Date: {new Date(item.createdAt).toDateString()}
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
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
                                                        Upload Date: {new Date(item.createdAt).toDateString()}
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-blue-400 text-blue-400 font-bold transition hover:bg-blue-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Next</button>
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
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 mx-4 border-3 border-yellow-500 text-yellow-500 font-bold transition hover:bg-yellow-500 duration-200 hover:text-white shadow-md' onClick={() => changeIndex()}>Previous</button>
                                    <button className='rounded w-2/5 md:w-1/5 bg-initial px-6 py-2 border-3 border-green-400 text-green-400 font-bold transition hover:bg-green-400 duration-200 hover:text-white shadow-md' onClick={() => changeIndex(true)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            }
        </Modal>

    )
}