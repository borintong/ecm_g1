
import "./CustomerPage.css"
import axios from "axios"
import {useEffect,useState} from "react"
import {DatePicker,Button,Space,Popconfirm, Input, Modal, Divider, Select, Radio} from "antd"
import {DeleteFilled,EditFilled,SaveFilled,FilterOutlined, CompassOutlined} from "@ant-design/icons"
import moment from "moment"
import { request } from "../../util/api"
// import { request } from "../../util/api"

const {Option} = Select
const CustomerPage = () => {

    const [list,setList] = useState([])
    const [visibleModal,setVisibleModal] = useState(false)

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [gender,setGender] = useState("1")
    const [dob,setDob] = useState()
    const [tel,setTel] = useState("")
    const [email,setEmail] = useState("")
    const [isActive,setIsActive] = useState(1)
    const [customerId,setCustomerID] = useState(null)

    

    
    useEffect(()=>{
        getList();// call funcion getList
    },[])

    // create a function fetch data from api
    const getList = () => {
        request("get","customer/getList").then(res=>{
            setList(res.data.list_customer)
        }).catch(err=>{
            console.log(err)
        })
    }

    const onConfirmDelete = (id) => {
        request("delete","customer/delete/"+id).then(res=>{getList()})
    }

    const handleCancel = () => {
        setVisibleModal(false)
    }

    const handSubmit = () => {
        if(customerId == null){
            request("post","customer/create",{
                "firstname":firstname,
                    "lastname":lastname,
                    "gender" : gender,
                    "dob" : dob, 
                    "tel" : tel,
                    "email" : email,
                    "is_active" : isActive
            }).then(res=>{
                getList()
                clearForm()
                setVisibleModal(false)
            })
        }else{
            request("put","customer/update",{
                "customer_id" : customerId,
                "firstname":firstname,
                "lastname":lastname,
                "gender" : gender,
                "dob" : dob, 
                "tel" : tel,
                "email" : email,
                "is_active" : isActive
            }).then(res=>{
                getList()
                clearForm()
                setVisibleModal(false)
            })
        }
       
    }

    const clearForm = () => {
        setFirstname("")
        setLastname("")
        setGender("1")
        setDob(null)
        setTel("")
        setEmail("")
        setIsActive(1)
        setCustomerID(null)
    }

    const handleCloseModal = () => {
        setVisibleModal(false)
        clearForm();
    }

    const handleOpenModal = () => {
        setVisibleModal(true)
        
    }

    const handleClickEdit = (item,index) => {
        setVisibleModal(true)

        setFirstname(item.firstname)
        setLastname(item.lastname)
        setGender(item.gender+"")
        setDob(item.dob+"")
        setTel(item.tel)
        setEmail(item.email)
        setIsActive(item.is_active)
        setCustomerID(item.customer_id)
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
                <Button onClick={handleOpenModal} type="primary"><SaveFilled/> Create New</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="td-left">No</th>
                        <th className="td-left">Firstname</th>
                        <th className="td-left">Lastname</th>
                        <th className="td-left">Gender</th>
                        <th className="td-left">Dob</th>
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
                                    <td className="td-left">{moment(item.dob).format("DD/MM/YYYY")}</td>
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
                                                onClick={()=>handleClickEdit(item,index)}
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
            <Modal
                open={visibleModal}
                title={customerId == null ? "New customer" : "Update customer"}
                onCancel={handleCloseModal}
                footer={null}
                maskClosable={false}
            >
                <div>date {dob+""}</div>
                {/* <div>
                    <div>firstname : {firstname}</div>
                    <div>lastname : {lastname}</div>
                    <div>gender : {gender}</div>
                    <div>tel : {tel}</div>
                    <div>email : {email}</div>
                    <div>is_active : {isActive}</div>
                </div> */}
                <Space direction="vertical" style={{width:"100%"}}>
                    <Input 
                        value={firstname}
                        placeholder="firstname" 
                        onChange={(event)=>{
                            setFirstname(event.target.value)
                        }}
                    />
                    <Input 
                        value={lastname}
                        placeholder="lastname" 
                        onChange={(event)=>{
                            setLastname(event.target.value)
                        }}
                    />
                    <Select
                        value={gender}
                        defaultValue={"1"}
                        style={{width:"100%"}}
                        onChange={(value)=>{
                            setGender(value)
                        }}
                    >
                        <Option value={"1"}>Male</Option>
                        <Option value={"0"}>Female</Option>
                    </Select>
                    <DatePicker 
                        // picker="year" 
                        // format={'YYYY/MM/DD'}
                        // defaultValue={moment()}
                        style={{width:"100%"}}
                        placeholder="Date of birth"
                        // value={dob}
                        onChange={(date,dateString)=>{
                            setDob(dateString)
                            // console.log(data)
                            // console.log(dateString)
                        }}
                    />

                    <Input 
                        value={tel}
                        placeholder="tel" 
                        onChange={(event)=>{
                            setTel(event.target.value)
                        }}
                    />

                    <Input 
                        value={email}
                        placeholder="email" 
                        onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                    />

                    <Radio.Group
                        value={isActive}
                        onChange={(event)=>{
                            setIsActive(event.target.value)
                        }}
                    >
                        <Radio value={1}>Actived</Radio>
                        <Radio value={0}>Disabled</Radio>
                    </Radio.Group>

                    <Space style={{display:'flex',justifyContent:"flex-end"}}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handSubmit} type="primary">{customerId == null ? "Save" : "Update"}</Button>
                    </Space>
                </Space>
            </Modal>
        </div>
    )
}

export default CustomerPage