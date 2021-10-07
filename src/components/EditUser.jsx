import React from "react"

function EditUser({ user, setUser }) {
  // handling the input, update it in each field accordenly
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="editUser_container">
      <form className="form" action="">
        <label className="name">
          <input
            onChange={handleInputChange}
            name="name"
            value={user.name}
            placeholder="name"
            type="text"
            required
          />
        </label>
        <label className="address">
          <input
            onChange={handleInputChange}
            value={user.address}
            name="address"
            placeholder="address"
            type="text"
            required
          />
        </label>
        <label className="birth_date">
          <input
            onChange={handleInputChange}
            value={user.birth_date}
            name="birth_date"
            placeholder="birth_date"
            type="date"
            required
          />
        </label>
      </form>
    </div>
  )
}

export default EditUser
