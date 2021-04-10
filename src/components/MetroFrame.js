import React, { useContext, useEffect, useRef } from 'react'

import { TweenMax, TimelineMax } from "gsap";

import styles from '../styles/MetroFrame.module.css'

import { MetroContext } from "../contexts/MetroContext"

import Screen from './Screen'

const MetroFrame = () => {
    const metrocontext = useContext(MetroContext)
    const boxRef = useRef()
    const arrow = useRef()

    useEffect(() => {
        TweenMax.from(boxRef.current, { y: -900, delay: .2, ease: "bounce.out", duration: 1.5 })

        TweenMax.fromTo(arrow.current, 1, { y: -100, opacity: 0 }, { y: 0, opacity: 1, delay: 1.4 })


        var tlanimation = new TimelineMax({ repeat: -1, yoyo: true, delay: 2 })
        tlanimation.to(arrow.current, .3, { x: 15 })

        TweenMax.to(arrow.current, 0.3, { delay: 5, autoAlpha: 0 })


    }, [])

    return (
        <div>
            <div className={styles.arrow_box} ref={arrow}><div className={styles.try}>TRY ME</div></div>
            <div className={styles.box} ref={boxRef}>
                <div className={styles.innerbox}>
                    <Screen />
                    <div className={styles.controlBox}>
                        <div className={styles.buttonBox}>
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
        </div>
    );
}

export default MetroFrame;