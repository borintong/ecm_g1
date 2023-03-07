import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {useNavigate} from "react-router-dom"
import "./HomePage.css"

const HomeScreen  = () => {

  const navigate = useNavigate()

  const onClick = () => {
    navigate("/product")
  }

  return (
    <div>
      <div className={"home"} onClick={onClick}>Click me</div>
      {[3,4,5,6,6,6,6,4,5,5,5].map((item)=>(
            <h1 style={{height:80}}>12</h1>
      ))}
    </div>
  )
  
};

export default HomeScreen;