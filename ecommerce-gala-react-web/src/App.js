
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LayoutOne from "./component/layout/LayoutOne"
import HomePage  from "./page/home/HomePage"
import CustomerPage from "./page/customer/CustomerPage"
import Product from "./page/product/Product"
import User from "./page/user/User"
import "./App.css"
// import User
function App() {
  return (
    <BrowserRouter>
        <LayoutOne>
          <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/user' element={<User />} />
            <Route path='/customer' element={<CustomerPage />} />
            <Route path='/product' element={<Product />} />
          </Routes>
        </LayoutOne>
    </BrowserRouter>
  )
}
export default App;
