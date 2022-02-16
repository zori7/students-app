import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import studentsReducer from "../features/students/studentsSlice"

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>
