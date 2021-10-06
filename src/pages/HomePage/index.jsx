import React, { useState } from "react"
import { auth, db } from "../../firebase/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { doc, updateDoc } from "firebase/firestore"
import EditUser from "../../components/EditUser"
const HomePage = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [err, setErr] = useState("")
  function editUser() {
    //   if(updatedData)
    const { name, address, birth_date } = user

    if (!name || !address || !birth_date) {
      setErr("Something went wrong,Please try again.")
      return
    }

    if (showUpdateForm) {
      updateUser(user)
    }
    setShowUpdateForm(!showUpdateForm)
    // update directly on the screen.
  }

  async function updateUser(updatedData) {
    const userUpdate = doc(db, "users", user.id)
    await updateDoc(userUpdate, {
      name: updatedData.name,
      address: updatedData.address,
      birth_date: updatedData.birth_date,
    })
  }
  async function fetchUsers() {
    setLoading(true)
    const q = query(
      collection(db, "users"),
      where("email", "==", auth.currentUser.email)
    )
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      setLoading(false)
      setUser({ ...doc.data(), id: doc.id })
    })
  }
  React.useEffect(() => fetchUsers(), [])

  return (
    <div>
      <h1>HomePage</h1>
      {loading && <div className="loader"></div>}

      {user && (
        <div className="container">
          <div className="back-img">
            <div className="layer"></div>
          </div>
          <h1>Welcome Back {user.name}</h1>
          <h2>{user.email}</h2>
          <h3>{user.birth_date}</h3>
          <h4>{user.address}</h4>

          {showUpdateForm && <EditUser user={user} setUser={setUser} />}
          {err}
          <p>
            <button onClick={() => auth.signOut()}>Sign out</button>
            <button
              onClick={() =>
                showUpdateForm ? editUser() : setShowUpdateForm(true)
              }
            >
              {showUpdateForm ? "save" : "edit"}
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage
