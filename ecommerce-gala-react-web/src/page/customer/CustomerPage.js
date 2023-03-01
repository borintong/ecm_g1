
import "./CustomerPage.css"
import axios from "axios"
import {useEffect,useState} from "react"
const CustomerPage = () => {
    // state
    const [list,setList] = useState([])


    // const [name,setName] = useState("")
    // const [productName,setProductName] = useState("")
    // const [average,setAverage] = useState(0.0)

    useEffect(()=>{
        getList();// call funcion getList
    },[])

    // create a function fetch data from api
    const getList = () => {
        axios({
            url : "http://localhost:8080/api/customer/getList",
            method : "GET",
            // data : {} // json body params
        }).then(res=>{
            setList(res.data.list_customer)
            console.log(res.data.total)
        }).catch(err=>{
            console.log(err)
        })
    }

    const onDelete = (item) => {
        axios({
            url : "http://localhost:8080/api/customer/delete/"+item.customer_id,
            method : "DELETE",
        }).then(res=>{
            getList()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="customer_container">
            <h1>CustomerPage {list.length}</h1>
            <table>
                <thead>
                    <tr>
                        <th className="td-left">No</th>
                        <th className="td-left">Firstname</th>
                        <th className="td-left">Lastname</th>
                        <th className="td-left">Gender</th>
                        <th className="td-left">Email</th>
                        <th className="td-left">Tel</th>
                        <th className="td-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td className="td-left">{index+1}</td>
                                    <td className="td-left">{item.firstname}</td>
                                    <td className="td-left">{item.lastname}</td>
                                    <td className="td-left">{item.gender}</td>
                                    <td className="td-left">{item.email}</td>
                                    <td className="td-left">{item.tel}</td>
                                    <td>
                                        <button onClick={()=>onDelete(item)}>Delete</button>
                                        <button>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {/* {list.map((item,index)=>{
                        return (
                            <tr>
                                <td className="td-left">{item.customer_id}</td>
                                <td className="td-left">{item.firstname}</td>
                                <td className="td-left">{item.lastname}</td>
                                <td className="td-left">{item.gender}</td>
                                <td className="td-left">{item.email}</td>
                                <td className="td-left">{item.tel}</td>
                                <td>
                                    <button>Delete</button>
                                    <button>Edit</button>
                                </td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
            {/* <div>
                {list.map((item,index)=>{
                    return (
                        <div style={{marginBottom:30,borderBottom:"1px solid #000",padding:10}}>
                            <div>{index+1}</div>
                            <div>{item.firstname}</div>
                            <div>{item.lastname}</div>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}

export default CustomerPage