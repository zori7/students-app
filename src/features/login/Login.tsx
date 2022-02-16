import React, {useRef, KeyboardEvent} from "react"
import styles from "./Login.module.css"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {fetchStudent, selectStudentLoading} from "../students/studentsSlice"

export function Login() {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const studentLoading = useAppSelector(selectStudentLoading)

  const onLogin = () => {
    const studentName = inputRef.current?.value || ""

    if (studentName.length < 2) {
      alert("Name should be 2 or more characters")

      return
    }

    dispatch(fetchStudent(studentName))
  }

  const onInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onLogin()
    }
  }

  return (
    <div className={styles.container}>
      <input placeholder="Student Name (Try Joe, Mike, Peter...)" ref={inputRef} onKeyUp={onInputKeyUp}/>
      <button onClick={onLogin} disabled={studentLoading}>{studentLoading ? "Loading..." : "Login"}</button>
    </div>
  )
}
