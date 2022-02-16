import React, {HTMLAttributes} from "react"
import {selectStudentById} from "./studentsSlice"
import {useAppSelector} from "../../app/hooks"

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  studentId: string
  isLast: boolean
}

export function StudentItem(props: IProps) {
  const {studentId, isLast, ...rest} = props

  const student = useAppSelector((state) => selectStudentById(state, studentId))

  if (!student) {
    return null
  }

  return (
    <span {...rest}>
      {student.fields.Name}
      {!isLast && (
        <>
          ,&nbsp;
        </>
      )}
    </span>
  )
}
