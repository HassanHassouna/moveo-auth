import React, { useState } from "react"
import { auth, db } from "../../firebase/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { doc, updateDoc } from "firebase/firestore"
import EditUser from "../../components/EditUser"
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import EditIcon from "@mui/icons-material/Edit"
const HomePage = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [err, setErr] = useState("")

  // function that can change info for the user.
  function editUser() {
    const { name, address, birth_date } = user
    //checking that the user has filled all the fields
    if (!name || !address || !birth_date) {
      setErr("Something went wrong,Please try again.")
      return
    }
    // if the form is shown.
    if (showUpdateForm) {
      updateUser(user)
    }
    setShowUpdateForm(!showUpdateForm)
  }

  async function updateUser(updatedData) {
    // fetch the db from firestore and update it with the form's inputs.
    const userUpdate = doc(db, "users", user.id)
    await updateDoc(userUpdate, {
      name: updatedData.name,
      address: updatedData.address,
      birth_date: updatedData.birth_date,
    })
  }
  // fetching the current user's info from firestore.
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
            <button className="editSave" onClick={() => auth.signOut()}>
              <Button variant="outlined" startIcon={<ExitToAppIcon />}>
                Sign Out
              </Button>
            </button>
            <button
              className="editSave"
              onClick={() =>
                showUpdateForm ? editUser() : setShowUpdateForm(true)
              }
            >
              {showUpdateForm ? (
                <Button variant="contained" endIcon={<SendIcon />}>
                  Save
                </Button>
              ) : (
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Edit
                </Button>
              )}
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage
