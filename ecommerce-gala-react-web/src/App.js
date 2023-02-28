import HomePage  from "./page/home/HomePage"
import CustomerPage from "./page/customer/CustomerPage"
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/customer' element={<CustomerPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
