import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons'

export default function Footer() {
    return (
        <div>

            <div className="py-10 md:flex justify-evenly pt-10" style={{ backgroundColor: "rgb(19, 19, 19)" }}>
                <img className="mx-auto w-44 h-32" src="/logo.png" alt="" />
                <div className="mt-8 md:mt-0 px-10 text-center w-full md:w-1/3">
                    <p className="text-2xl text-gray-200">About This Website</p>
                    <p className="text-lg text-gray-400">
                        Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
                        Ut non ex leo. Vestibulum facilisis leo eu mauris tincidunt dapibus. Sed
                    </p>
                </div>
                <div className="mt-8 md:mt-0 w-full md:w-1/3">
                    <p className="text-2xl text-gray-200 text-center">Where you can find us</p>
                    <div className="flex items-center justify-center my-8">
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaFacebookF />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaGoogle />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaTwitter />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaInstagram />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
            <div className="bg-gray-600 text-gray-200 p-2 text-center text-lg">© 2022 Copyright</div>

        </div>
    )
}