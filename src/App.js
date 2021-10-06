import "./App.css"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import { auth } from "./firebase/firebase"
function App() {
  const [user, setUser] = useState(null)
  const checkAuth = () => {
    auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      }
      if (userAuth) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }
  useEffect(() => {
    checkAuth()
  }, [])
  return <div className="App">{user ? <HomePage /> : <Login />}</div>
}

export default App
