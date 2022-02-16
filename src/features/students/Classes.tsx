import React, {useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {
  fetchClasses,
  fetchStudents,
  logout,
  selectClasses,
  selectStudent,
  selectStudents,
} from "./studentsSlice"
import styles from "./Classes.module.css"
import _ from "lodash"
import {StudentItem} from "./StudentItem"

export function Classes() {
  const dispatch = useAppDispatch()
  const student = useAppSelector(selectStudent)
  const classes = useAppSelector(selectClasses)
  const students = useAppSelector(selectStudents)

  useEffect(() => {
    if (student && student.fields.Classes) {
      dispatch(fetchClasses(student.fields.Classes))
    }
  }, [student])

  useEffect(() => {
    const studentIds = classes.reduce<Array<string>>((ids, item) => [...ids, ...item.fields.Students], [])
    const uniqueIds = _.uniq(studentIds)

    if (!uniqueIds.length) {
      return
    }

    dispatch(fetchStudents(uniqueIds))
  }, [classes])

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Classes</h1>
      <button style={{marginBottom: "1rem"}} onClick={onLogout}>Logout</button>

      {(!classes.length || !students.length) ? (
        <div className={styles.classCard} style={{opacity: 0.3}}>
          <h2>Name</h2>
          <p>...</p>
          <h2>Students</h2>
          <p>... ... ...</p>
        </div>
      ) : classes.map((item) => (
        <div className={styles.classCard} key={item.id}>
          <h2>Name</h2>
          <p>{item.fields.Name}</p>
          <h2>Students</h2>
          <p>
            {item.fields.Students.map((id, idx) => (
              <StudentItem studentId={id} isLast={idx === item.fields.Students.length - 1} key={id}/>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}
