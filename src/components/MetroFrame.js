import React, { useContext } from 'react'

import styles from '../styles/MetroFrame.module.css'

import { MetroContext } from "../contexts/MetroContext"


import Screen from './Screen'

const MetroFrame = () => {
    const metrocontext = useContext(MetroContext)

    return (
        <div className={styles.box}>
            <div className={styles.innerbox}>
                <Screen />
                <div className={styles.controlBox}>
                    <div className={styles.buttonBox}>
                        <button className={styles.startButton} onClick={metrocontext.startStop}>{metrocontext.playing ? 'Pause' : 'Start'}</button>
                    </div>
                    <div className={styles.controls} onChange={(e) => e.stopPropagation()} >
                        <input type="range" min="40" max="200" step="1" value={metrocontext.beat} className={styles.inputBar} onChange={(e) => metrocontext.changeBeat(e)} />
                        <div className={styles.bpmView}>{`BPM: ${metrocontext.beat}`}</div>
                        <div className={styles.eighths}>
                            <div className={`${styles.one} ${styles.circle}`} onClick={() => metrocontext.changeBMP(1)}>1</div>
                            <div className={`${styles.two} ${styles.circle}`} onClick={() => metrocontext.changeBMP(2)}>2</div>
                            <div className={`${styles.three} ${styles.circle}`} onClick={() => metrocontext.changeBMP(3)}>3</div>
                            <div className={`${styles.four} ${styles.circle}`} onClick={() => metrocontext.changeBMP(4)}>4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MetroFrame;