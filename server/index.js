const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const morgan = require('morgan')
const app = express()
const mysql = require("mysql2")

app.use(express.json())
app.use(cookieParser())

app.use(cors())
app.use(morgan('dev'))

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "todo",
  password : "25432543"
})



app.get('/api/get-notes', async (_, res) => {
    connection.query("SELECT * FROM new_table;", (err, results) => {
        if(err) res.json(err)
        res.json(results)

    })
})

app.post("/api/post-note", async (req, res) => {
    const {note} = req.body
    // console.log(note)
     connection.query(
       `INSERT INTO new_table SET ?`,
       { note: note },
       (err, results) => {
         if (err) res.json(err)
         res.json({id : results.insertId, note})
       }
     )
})


app.listen(5000, (() => {
    console.log("server is running...")
}))