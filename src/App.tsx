import React from "react"
import "./App.css"
import {Login} from "./features/login/Login"
import {useAppSelector} from "./app/hooks"
import {selectIsLoggedIn} from "./features/students/studentsSlice"
import {Classes} from "./features/students/Classes"

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <div className="App">
      <div className="App-container">
        {isLoggedIn ? (
          <Classes/>
        ) : (
          <Login/>
        )}
      </div>
    </div>
  )
}

export default App
