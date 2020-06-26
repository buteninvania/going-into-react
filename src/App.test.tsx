import React from "react"
import ButInProjectApp from "./App"
import ReactDOM from "react-dom"

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ButInProjectApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
