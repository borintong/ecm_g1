
// arrow function
const customerController = require("../controllers/customer.controller")
const customer = (app) => {
    app.get("/api/customer/getList",customerController.getList)
    app.post("/api/customer/create",customerController.create)
    app.put("/api/customer/update",customerController.update)
    app.delete("/api/customer/delete/:id",customerController.remove)
}


module.exports = customer
