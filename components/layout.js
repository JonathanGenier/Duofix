/*==MODULES===================================================================*/
import { useState, useLayoutEffect, useEffect } from 'react'

/*==COMPONENTS================================================================*/
import Footer from './footer'
import CompactNavbar from './navbar/compact'
import WideNavbar from './navbar/wide'

/*==STYLES====================================================================*/
import styles from '../styles/components/layout.module.css'

/*============================================================================*/

export default function layout({ children }) {

    const [viewport, setViewport] = useState({
        width: 0
    })

    const updateViewport = () => {
        setViewport({ ...viewport, width: window.innerWidth })
    }

    useEffect(() => {
        updateViewport();
        window.addEventListener('resize', updateViewport)
    }, [])

    const renderNavbar = () => {

        if (viewport.width < 992) {
            return (<CompactNavbar />)
        }

        return (<WideNavbar />)
    }

    return (
        <div className={"main-c"}>
            {/* Navbar */}
            {renderNavbar()}

            {/* Pages */}
            {children}
            
            {/*<Footer/>*/}
            {/* Must be rendered after pages */}
            
            {/* <div className={styles.navBar}>
                
            </div>

            
            <div className={styles.children}>

            </div> */}
        </div>
    )
}