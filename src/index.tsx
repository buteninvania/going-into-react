import React from "react"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import ReactDOM from 'react-dom'
import "./index.css"
import ButInProjectApp from "./App"

ReactDOM.render(<ButInProjectApp />, document.getElementById('root'))
serviceWorker.unregister()
