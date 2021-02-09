
// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Image from 'next/image'; 

// STYLES
import styles from '../../styles/layout/Navbar.module.css'; 

export default function Navbar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={styles.nav}>
                    <IconButton edge='start' >
                        <Image
                            src="/logo.png"
                            height={50}
                            width={60}
                            alt="JoyFairy Logo"
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}