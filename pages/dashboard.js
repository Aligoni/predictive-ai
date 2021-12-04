import Navbar from "../components/Navbar"
import Button from 'react-bootstrap/Button'

const types = [
    {
        type: 'First Degree',
        requirements: 'WAEC/NECO and JAMB',
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
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar page='Dashboard'/>
            <div className="p-6 md:px-20 text-xl md:text-4xl">Hi, Muhammad</div>

            <div className="py-4 text-center text-bold text-2xl md:text-4xl bg-white shadow-md">Evaluate Result</div>
            {types.map((document, i) => 
                <div key={i} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 m-4 md:my-10 md:mx-60 bg-white flex flex-col shadow-md">
                    <div className={`${typeStyles[document.type]} text-center flex-1 p-4 text-xl md:text-2xl text-gray-200 font-bold`}>
                        {document.type}
                    </div>
                    <div className="p-3 md:px-10 text-xl">Requirements: {document.requirements}</div>
                    <div className="flex justify-end p-4 md:px-10">
                        <Button className="w-32">Select</Button>
                    </div>
                </div>
            )}
        </div>
    )
}