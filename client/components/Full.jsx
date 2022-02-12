import React, { useState, useEffect } from "react"
import axios from "axios"

const Full = () => {
  const [note, setNote] = useState("")
  const [loading, setIsLoading] = useState(true)
  const [allNote, setAllNote] = useState([])
  const saveNote = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:5000/api/post-note",
        data: { note },
      })
    //   console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/api/get-notes",
    })
    setAllNote(data)
    // console.log(data)
  }

  useEffect(() => {
    try {
      fetchData()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div style={{ width: 400, border: "1px solid black", padding: 10 }}>
            <h4 style={{ textAlign: "center" }}>Add to your TODOs</h4>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <input
                name="todo"
                id="todo"
                style={{ width: "90%" }}
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
              <button onClick={saveNote} style={{ width: "10%" }}>
                +
              </button>
            </div>

            <ul style={{ listStyle: "none" }}>
              {allNote.map((data, inx) => {
                return (
                  <li key={data.id} style={{ margin: "10px 0px" }}>
                    {data.note}
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Full
