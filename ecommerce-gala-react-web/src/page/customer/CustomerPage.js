
import "./CustomerPage.css"
import axios from "axios"
import {useEffect,useState} from "react"
import {DatePicker,Button,Space,Popconfirm, Input} from "antd"
import {DeleteFilled,EditFilled,SaveFilled,FilterOutlined} from "@ant-design/icons"

const CustomerPage = () => {

    const [list,setList] = useState([])
    
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

    const onConfirmDelete = (id) => {
        axios({
            url : "http://localhost:8080/api/customer/delete/"+id,
            method : "DELETE",
        }).then(res=>{
            getList()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="rowBetween">
                <div>
                    <Space>
                        <div className="pageTitle">Customer</div>
                        <Input.Search placeholder="Search" />
                        <DatePicker  />
                        <DatePicker  />
                        <Button type="primary" ><FilterOutlined/></Button>
                    </Space>
                </div>
                <Button type="primary"><SaveFilled/> Create New</Button>
            </div>
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
                                        <Space>
                                            <Popconfirm
                                                placement="topRight"
                                                title={"Delete"}
                                                description={"Are sure to remove this customer"}
                                                onConfirm={()=>onConfirmDelete(item.customer_id)}
                                                okText="Delete"
                                                cancelText="No"
                                            >
                                                <Button
                                                    danger={true} 
                                                    size="small" 
                                                >
                                                    <DeleteFilled/>
                                                </Button>
                                            </Popconfirm>

                                            <Button
                                                size="small" 
                                                type="primary"
                                            >
                                                <EditFilled/>
                                            </Button>
                                        </Space>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    
                </tbody>
            </table>
        </div>
    )
}

export default CustomerPage