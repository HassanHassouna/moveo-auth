import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/firebase"

const Login = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const validate = (email, password) => {
    if (!email || !password) {
      setError("Something went wrong,Please try again.")
      return true
    }
    if (password.length < 6) {
      setError("The password is less than 6 characters.")
      return true
    }
    if (!email.includes("@")) {
      setError("Invalid Email,Please try again.")
      return true
    }
  }
  const signIn = (e) => {
    setLoading(true)
    if (validate(email, password)) {
      setLoading(false)
      return
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <div className="container">
      <div className="back-img">
        <div className="layer"></div>
      </div>
      <h1>Login</h1>
      <div>
        <form className="form" action="">
          <label className="username" htmlFor="">
            <input
              placeholder="Email"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              required
              type="email"
            />
          </label>

          <label className="password" htmlFor="">
            <input
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              type="password"
              required
            />
          </label>
        </form>

        <p>{error}</p>
        <button onClick={signIn}>Sign in </button>
      </div>
      {loading && <div className="loader"></div>}
    </div>
  )
}

export default Login
