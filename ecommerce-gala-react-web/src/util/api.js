import axios from "axios"
const baseUrl = "http://localhost:8080/api/"

export const request = (method="",url="",data={}) => {
    var token = "dafsdjoeijflksjeDFASFDf"
    return axios({
        url : baseUrl + url,
        method : method,
        data : data
    }).then(res=>{
        return res
    }).catch(err=>{
        console.log(err)
        return err
    })
}