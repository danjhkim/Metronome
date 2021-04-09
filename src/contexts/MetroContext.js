import React, { useState, useEffect, useRef } from 'react';
import tick from '../sounds/tick.wav'
import tock from '../sounds/tock.wav'

export const MetroContext = React.createContext();

export const MetroStore = (props) => {

    const temp = {
        1: "1",
        2: "2:1",
        3: "3:1",
        4: "4:1"
    };

    const [beat, setBeat] = useState(40)
    const [playing, setPlaying] = useState(false)
    const [timer, setTimer] = useState(0)
    const [bpm, setBPM] = useState(4)
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(false)
    const updatedCounter = useRef(counter)

    useEffect(() => {
        const ticking = new Audio(tick)
        const tocking = new Audio(tock)
        const playClick = () => {
            if (updatedCounter.current % bpm === 0) {
                tocking.play()
            } else {
                ticking.play()
            }
            setCounter((c => c + 1))
        }
        setCounter(0)
        const bmpSpeed = (60 * 1000 / beat);
        if (playing) {
            setLoading(true)
        }
        let timerTick = setTimeout(() => {
            if (playing) {
                setTimer(setInterval(playClick, bmpSpeed))
            }
            setLoading(false)
        }, 2000)

        return () => {
            clearTimeout(timerTick)
        }
    }, [beat, bpm, playing])

    const changeBMP = (value) => {
        if (bpm === value) {
            return
        } else {
            setBPM(value)
            clearInterval(timer)
        }
    }

    const changeBeat = (e) => {
        clearInterval(timer)
        setBeat(e.target.value)
    }

    useEffect(() => {
        updatedCounter.current = counter
    }, [counter])

    const startStop = () => {
        setCounter(0)
        if (playing) {
            clearInterval(timer);
            setPlaying(false)
        } else if (!playing) {
            setPlaying(true)
        }
    }

    const screenprint = () => {
        if (!playing) {
            return `Press start :)`
        } else if (loading) {
            return 'Loading...'
        } else {
            return (
                <div>
                    <div>{`Tempo: ${temp[bpm]}`}</div>
                    <div>{beat} BPM</div>
                </div>
            )
        }
    }


    return (
        <MetroContext.Provider
            value={{ screenprint, playing, changeBeat, changeBMP, startStop, beat }}>
            {props.children}
        </MetroContext.Provider>
    );
}