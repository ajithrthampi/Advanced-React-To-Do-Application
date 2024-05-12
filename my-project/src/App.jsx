import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/home/Dashboard"
import Active from "./components/home/Active"
import Completed from "./components/home/Completed"
import { AddModalContext } from "./context/AddModalContext"
import { Fragment, useEffect, useState } from "react"
import { TaskDataContext } from "./context/TaskDataContext"
import { RouteContext } from "./context/RouteContext"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "./store/reducers/auth"
// import ProtectedRoute from "./utils/ProtectedRoute"


const oldTasks = localStorage.getItem("tasks")

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [addNewModal, setAddNewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [routevalue, setRouteValue] = useState()
  const [alltaskData, setAllTaskData] = useState(JSON.parse(oldTasks) || [])

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(alltaskData))

  }, [alltaskData])

  return (
    <>

      <TaskDataContext.Provider value={{ alltaskData, setAllTaskData }}>
        <AddModalContext.Provider value={{ setAddNewModal, addNewModal, setEditModal, editModal }}>
          <RouteContext.Provider value={{ routevalue, setRouteValue }}>
            <Router>
              <Routes>
                <Route path="/" element={< Layout />}>
                  <Route path="/" element={ <Dashboard /> } />
                  <Route path="/active" element={<Active />} />
                  <Route path="/completed" element={<Completed />} />
                </Route>
              </Routes>
            </Router>
          </RouteContext.Provider>
        </AddModalContext.Provider>
      </TaskDataContext.Provider>
    </>
  )
}

export default App
