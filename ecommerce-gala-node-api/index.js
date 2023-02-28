const express = require("express")
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.send("Hello api")
}) 


require("./src/routes/customer.route")(app)
// require("./src/routes/user.route")(app)


// app.get("/api/customer/getlist",(req,res)=>{
//     res.send("list customer")
// })
// app.get("/api/customer/create",(req,res)=>{
//     res.send("list customer")
// })

const port = 8080
app.listen(port,()=>{
    console.log("running http://localhost:"+port)
    // console.log(`http://localhost:${port}`)
})
