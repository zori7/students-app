import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit"
import {apiClient} from "../../app/api"
import {RootState} from "../../app/store"

export interface IStudent {
  id: string
  createdTime: string
  fields: {
    Name: string
    Classes?: Array<string>
  }
}

export interface IClass {
  id: string
  createdTime: string
  fields: {
    Name: string
    Students: Array<string>
  }
}

export interface StudentsState {
  student: IStudent | null
  studentLoading: boolean
  classes: Array<IClass>
  classesLoading: boolean
  students: Array<IStudent>
  studentsLoading: boolean
  isLoggedIn: boolean
}

const initialState: StudentsState = {
  student: null,
  studentLoading: false,
  classes: [],
  classesLoading: false,
  students: [],
  studentsLoading: false,
  isLoggedIn: false,
}

export const fetchStudent = createAsyncThunk(
  "students/fetchStudent",
  async (studentName: string) => {
    const formula = `Name='${studentName}'`
    const response = await apiClient.fetch<{records: Array<IStudent>}>("Students", [
      ["fields", "Name"],
      ["fields", "Classes"],
      ["filterByFormula", formula],
    ])

    if (!response.records.length) {
      alert("Student not found")
      return null
    }

    return response.records[0]
  },
)

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (studentIds: Array<string>) => {
    const formula = `SEARCH(RECORD_ID(), "${studentIds.join(",")}") != ""`
    const response = await apiClient.fetch<{records: Array<IStudent>}>("Students", [
      ["fields[]", "Name"],
      ["filterByFormula", formula],
    ])

    return response.records
  },
)

export const fetchClasses = createAsyncThunk(
  "students/fetchClasses",
  async (classIds: Array<string>) => {
    const formula = `SEARCH(RECORD_ID(), "${classIds.join(",")}") != ""`
    const response = await apiClient.fetch<{records: Array<IClass>}>("Classes", [
      ["fields", "Name"],
      ["fields", "Students"],
      ["filterByFormula", formula],
    ])

    return response.records
  },
)

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.student = initialState.student
      state.classes = initialState.classes
      state.students = initialState.students
    },
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchStudent.pending, (state) => {
        state.studentLoading = true
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.studentLoading = false
        state.student = action.payload

        if (action.payload) {
          state.isLoggedIn = true
        }
      })
      .addCase(fetchStudent.rejected, (state) => {
        state.studentLoading = false
      })
      .addCase(fetchClasses.pending, (state) => {
        state.classesLoading = true
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classesLoading = false
        state.classes = action.payload
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.classesLoading = false
      })
      .addCase(fetchStudents.pending, (state) => {
        state.studentsLoading = true
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.studentsLoading = false
      })
  }),
})

export const selectStudentLoading = (state: RootState) => state.students.studentLoading
export const selectStudent = (state: RootState) => state.students.student
export const selectClassesLoading = (state: RootState) => state.students.classesLoading
export const selectClasses = (state: RootState) => state.students.classes
export const selectStudentsLoading = (state: RootState) => state.students.studentsLoading
export const selectStudents = (state: RootState) => state.students.students
export const selectIsLoggedIn = (state: RootState) => state.students.isLoggedIn

export const selectStudentById = createSelector<RootState, string, Array<IStudent>, string, IStudent | undefined>(
  selectStudents,
  (_, id) => id,
  (students, id) => students.find((student) => student.id === id),
)

export const {logout} = studentsSlice.actions

export default studentsSlice.reducer
