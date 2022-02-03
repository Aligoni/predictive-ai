import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, { useState, useEffect} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'

const pages = [
    {name: 'Dashboard', link: 'dashboard'},
    {name: 'Documents', link: 'documents'},
    {name: 'Profile', link: 'profile'},
    {name: 'Sign Out', link: '/'}
]

export default function Navbar(props) {
    const router = useRouter()
    const [show, setShow] = useState(false)

    useEffect(() => {
        let user = localStorage.getItem('predictive-user')
        try {
            user = JSON.parse(user)
            if (user.id) {

            } else {
                localStorage.removeItem('predictive-user')
                window.location = '/'
            }
        } catch (e) {
            localStorage.removeItem('predictive-user')
            window.location = '/'
        }
    }, [])

    const desktopNavbar = () => {
        return pages.map(page =>
            <div className="text-lg" key={page.name}>
                {page.link == '/' ? 
                    <div onClick={() => {
                        localStorage.removeItem('predictive-user')
                        window.location = '/' 
                    }} className={`${props.page == page.name ? 'text-gray-200 border-blue-600' : 'border-gray-800 text-gray-200'} font-bold cursor-pointer py-6 mx-2 border-b-8 px-3 hover:bg-gray-900`}>{page.name}</div>:
                    <Link href={page.link}>
                        <div className={`${props.page == page.name ? 'text-gray-200 border-blue-600' : 'border-gray-800 text-gray-200'} font-bold cursor-pointer py-6 mx-2 border-b-8 px-3 hover:bg-gray-900`}>{page.name}</div>
                    </Link>
                }
            </div>
        )
    }

    const mobileNavbar = () => {
        return pages.map(page => 
            <div className="text-lg" key={page.name}>
                <Link href={page.link}>
                    <div className={`${props.page == page.name ? 'bg-gray-100' : 'text-gray-800'} border-blue-700 font-bold cursor-pointer py-6 mx-2 border-b border-t px-3`}>{page.name}</div>
                </Link>

            </div>
        )
    }
    
    return (
        <div className="flex items-center justify-between px-6 shadow-md bg-gray-800">
            <div className="flex items-center justify-center">
                <img className="w-20 h-14 md:ml-3" src="/logo.png" alt="logo"></img>
                <div className="ml-3 text-xl font-bold text-gray-200">Result evaluator</div>
            </div>
            <div className="items-center hidden md:flex">
                {desktopNavbar()}
            </div>
            <div className="my-3 md:hidden">
                <Button onClick={() => setShow(!show)}>Menu</Button>
            </div>
            <Offcanvas show={show} onHide={() => setShow(!show)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="flex items-center">
                            <img className="w-14 h-14" src="/favicon.ico" alt="logo"></img>
                            <div className="text-md">Result evaluator</div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {mobileNavbar()}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}