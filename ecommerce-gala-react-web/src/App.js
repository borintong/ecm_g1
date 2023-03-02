
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LayoutOne from "./component/layout/LayoutOne"
import HomePage  from "./page/home/HomePage"
import CustomerPage from "./page/customer/CustomerPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutOne/>} />
        <Route path='/customer' element={<CustomerPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
