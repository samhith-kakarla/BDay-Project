
// COMPONENTS
import Head from 'next/head'; 
import Navbar from './Navbar'; 
import Meta from './Meta'; 

// STYLES
import styles from '../../styles/layout/Layout.module.css'; 

export default function Layout ({ children }) {
    return (
        <div>
            <Meta />
            <Navbar />
        </div>
    )
}