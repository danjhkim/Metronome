import React, { useContext, useEffect, useRef } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { TweenMax } from "gsap";

import styles from '../styles/MetroFrame.module.css'

import { MetroContext } from "../contexts/MetroContext"

import Screen from './Screen'

import animationData from '../images/Arrow.json'

const MetroFrame = () => {
    const metrocontext = useContext(MetroContext)
    const boxRef = useRef()
    const player = useRef()
    const startButtonRef = useRef()

    useEffect(() => {
        TweenMax.from(boxRef.current, { y: -1500, delay: .2, ease: "bounce.out", duration: 1.5 })
        setTimeout(() => {
            player.current.play()
        }, 2000)

        setTimeout(() => {
            startButtonRef.current.style.display = "none"
        }, 5000)

    }, [])

    return (
        <div>
            <div className={styles.box} ref={boxRef}>
                <div className={styles.innerbox}>
                    <Screen />
                    <div className={styles.controlBox}>
                        <div className={styles.buttonBox}>
                            <div className={styles.arrow_box} ref={startButtonRef}>
                                <Player
                                    ref={player}
                                    loop={false}
                                    src={animationData}
                                    style={{ height: '500px', width: '500px' }}>
                                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                </Player>
                            </div>
                            <button className={styles.startButton} onClick={metrocontext.startStop}>{metrocontext.playing ? 'Pause' : 'Start'}</button>
                        </div>
                        <div className={styles.controls} onChange={(e) => e.stopPropagation()} >
                            <input id="BPMBar" type="range" min="40" max="200" step="1" value={metrocontext.beat} className={styles.inputBar} onChange={(e) => metrocontext.changeBeat(e)} />
                            <label htmlFor="BPMBar"><div className={styles.bpmView}>{`BPM: ${metrocontext.beat}`}</div></label>
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
        </div >
    );
}

export default MetroFrame;