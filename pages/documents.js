import Head from 'next/head'
import Navbar from '../components/Navbar'
import AddDocument from '../components/AddDocument'
import styles from '../styles/Documents.module.scss'

const uploaded = [
    {
        name: 'My first JAMB',
        type: 'JAMB',
        uploadDate: new Date(),
        year: '2013',
        score: 220,
    },
    {
        name: 'My first waec',
        type: 'WAEC',
        uploadDate: new Date(),
        year: '2012',
        centre: 'Zaria, Kaduna'
    },
    {
        name: 'My first degree',
        type: 'First Degree',
        uploadDate: new Date(),
        convocation: '2020',
        degreeClass: 'Second Class Upper',
        course: 'Computer Science'
    },
]

const typeStyles = {
    WAEC: "bg-blue-700 bg-opacity-75 text-gray-200 font-bold",
    JAMB: "bg-green-700 bg-opacity-75 text-gray-200 font-bold",
    'First Degree': "bg-red-700 bg-opacity-75 text-gray-200 font-bold",
}

export default function Documents() {

    const displayUploadedDocuments = () => {

        if (uploaded) {
            return (
                <div className="flex justify-start w-full flex-wrap mt-8 px-8">
                    {uploaded.map((document, i) => 
                        <div className={`${styles.uploadedCard} ${document.type == 'WAEC' ? styles.waecImage: document.type == 'JAMB' ? styles.jambImage: document.type == 'First Degree' ? styles.degreeImage: ''} shadow-lg rounded-xl`}>
                            <div className={`${typeStyles[document.type]} rounded-xl p-4 text-lg cursor-pointer`}>

                                <div className="md:flex align-items justify-between md:mb-2">
                                    <p className="flex-1 text-lg truncate">Name: {document.name}</p>
                                    <p className="flex-1 truncate md:text-right text-lg">Type: {document.type}</p>
                                </div>
                                <div className="md:flex align-items justify-between md:mb-2">
                                    {document.type == 'First Degree' ? <p className="flex-1 text-lg truncate">Course: {document.course}</p> : <p className="flex-1 text-lg truncate">Year of Exams: {document.year}</p>}
                                    {document.type == 'WAEC' ? <p className="flex-1 text-lg truncate md:text-right">Center of Exams: {document.centre}</p>:
                                    document.type == 'JAMB' ? <p className="flex-1 text-lg truncate md:text-right">JAMB SCORE: {document.score}</p> :
                                    document.type == 'First Degree' ? <p className="flex-1 text-lg truncate md:text-right">Degree: {document.degreeClass}</p> : null}
                                </div>
                                <div className="md:flex justify-end">
                                    <p className="text-md">Upload Date: {document.uploadDate.toDateString()}</p>
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
        <div className="min-h-screen bg-gray-100">
            <Navbar page="Documents"/>

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md">Uploaded Documents</div>
            {displayUploadedDocuments()}

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md mt-6">Add a New Document</div>

            <AddDocument />
        </div>
    )
}