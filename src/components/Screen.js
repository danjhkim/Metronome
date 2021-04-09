import React, { useContext } from 'react';

import { MetroContext } from "../contexts/MetroContext"

import styles from '../styles/Screen.module.css'

const Screen = () => {
    const metrocontext = useContext(MetroContext)

    return (
        <div className={styles.screen}>
            {metrocontext.screenprint()}
        </div>
    );
}

export default Screen;