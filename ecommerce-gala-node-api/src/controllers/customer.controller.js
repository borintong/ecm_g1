var data = ["C++","C#","C++","C#","C++","C#"]
const db = require("../config/db.config")

const getList = (req,res) => {
    db.query("SELECT * FROM customers",(e,rows)=>{
        res.json({
            total:4,
            list_customer : rows,
        })
    })
}

const create = (req,res) => {
    // get parameter from client site

    var body = req.body
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error:true,
            message : "Please fill in firstname"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error:true,
            message : "Please fill in lastname"
        })
        return false
    }
    var sqlInsert = "INSERT INTO customers ( firstname, lastname, gender, dob, tel, email, is_active) VALUES (?,?,?,?,?,?,?)"

    db.query(sqlInsert,[body.firstname, body.lastname, body.gender, body.dob, body.tel, body.email, body.is_active],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Customer inserted!",
                data : rows
            })
        }
    })
}

const update = (req,res) => {
    var body = req.body
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error:true,
            message : "Please fill in firstname"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error:true,
            message : "Please fill in lastname"
        })
        return false
    }
    var sqlUpdate = "UPDATE customers SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, is_active=? WHERE customer_id = ?"
    db.query(sqlUpdate,[body.firstname, body.lastname, body.gender, body.dob, body.tel, body.email, body.is_active, body.customer_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Customer updated!",
                data : rows
            })
        }
    })
}

const remove = (req,res) => { 
    db.query("DELETE FROM customers WHERE customer_id = "+req.params.id,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            if(rows.affectedRows !=0 ){
                res.json({
                    message : "Customer deleted!",
                    data : rows
                })
            }else{
                res.json({
                    message : "Delete not complete. Customer not found"
                })
            }
           
        }
    })
}

module.exports = {
    getList,
    create,
    update,
    remove
}