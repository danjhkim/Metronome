import React from 'react'

import MetroFrame from './MetroFrame'
import { MetroStore } from '../contexts/MetroContext'


class App extends React.Component {

    render() {
        return (
            <main>
                <div className="wrapper">
                    <MetroStore>
                        <MetroFrame />
                    </MetroStore>
                </div>
            </main>
        )
    }
}


export default App