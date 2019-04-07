import * as React from 'react'
import { render } from 'react-dom'
// import { Clock } from "./components/ClockClass";
import { Clock } from './components/Clock'
import { TimeContextProvider } from './components/Clock/context'

import './styles.css'

function App() {
  return (
    <div className="App">
      <TimeContextProvider>
        <Clock />
      </TimeContextProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
