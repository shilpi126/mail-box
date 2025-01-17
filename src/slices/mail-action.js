
import axios from "axios";
import mailSlice, { mailAction } from "./mailSlice";
const api = require("../secret")

const userData = JSON.parse(localStorage.getItem("userData")) || ""
const userEmail = userData.email;
const user = userEmail.slice(0, userEmail.indexOf("@"))

const sender = JSON.parse(localStorage.getItem("senderEmail")) || ""
//console.log(sender)
const senderEmail = sender.slice(0,sender.indexOf("@"));




export const fetchMailData = () => {

    return async (dispatch) => {

        dispatch(
            mailAction.showNotification({
                status:"pending",
                title:"fetching...",
                message:"fetching mail..."
            })
        )
    
        const fetchData = async () => {
            
            const response = await axios.get(`${api}/${user}.json`)

            const data = await response.data;
            //console.log(data)
            return data;
        }

        try{
            const mailData = await fetchData();

            dispatch(mailAction.getMail(mailData))
            
            dispatch(
            mailAction.showNotification({
                status:"success",
                title:"fetch mail",
                message:"mail fetch succsfully"
            })
        )
        }catch(error){
            dispatch(
                mailAction.showNotification({
                    status:"error",
                    title:"fetching error",
                    message:"fetching mail failed..."
                })
            )
        
        }

        setTimeout(()=>{
            dispatch(
                mailAction.showNotification({
                    status:"",
                    title:"",
                    message:""
                })
            )
        },2000)
        
    }
}




export const composeMailData = ({mailData}) => {
    return async (dispatch) => {
        dispatch(
            mailAction.showNotification({
                status:"pending",
                title:"Send Mail",
                message:"Send Mail..."
            })
        )

        const composemail = async () => {
            const res = await axios.post(`${api}/${senderEmail}.json`,mailData)
            console.log(res.data);
        
        }
        
        try{
            await composemail();
                
            dispatch(
                mailAction.showNotification({
                    status:"success",
                    title:"Send mail",
                    message:"Send succsfully..."
                })
            )
        }catch(error){
            dispatch(
                mailAction.showNotification({
                    status:"error",
                    title:"Sending error",
                    message:"Sending mail failed..."
                })
            )
        console.log(error.message)
        }
        setTimeout(()=>{
            dispatch(
                mailAction.showNotification({
                    status:"",
                    title:"",
                    message:""
                })
            )
        },2000)
    }
}


export const deleteMailData = (id) => {

    return async (dispatch) => {
        dispatch(
            mailAction.showNotification({
                status:"pending",
                title:"Delete Mail",
                message:"Deleting mail..."
            })
        )
        const deleteMail = async () => {
            
            const response = await axios.delete(`${api}/${user}/${id}.json`)
            const data = await response;
            
        }

        try{
            await deleteMail();

            dispatch(mailAction.deleteMail(id))
                  
            dispatch(
                mailAction.showNotification({
                    status:"success",
                    title:"Delete mail",
                    message:"mail Delete succsfully"
                })
            )
            console.log("mail deleted successfully...")
        }catch(error){
            dispatch(
                mailAction.showNotification({
                    status:"error",
                    title:"deleting error",
                    message:"deleting mail failed..."
                })
            )
        console.log(error)
        }
        setTimeout(()=>{
            dispatch(
                mailAction.showNotification({
                    status:"",
                    title:"",
                    message:""
                })
            )
        },2000)
    }
}







export const sentMailData = () => {

    return async (dispatch) => {
        dispatch(
            mailAction.showNotification({
                status:"pending",
                title:"fetching sent mail",
                message:"Fetching sent mail..."
            })
        )
        const sentData = async () => {
            const response = await axios.get(`${api}/${senderEmail}.json`)
            const data = await response.data;
            //console.log(data)
            return data;
        }

        try{
            const mailData = await sentData();

            dispatch(mailAction.getMail(mailData))
                 
            dispatch(
                mailAction.showNotification({
                    status:"success",
                    title:"fetch sent mail",
                    message:"fetch sent mail succsfully..."
                })
            )
        }catch(error){
            dispatch(
                mailAction.showNotification({
                    status:"error",
                    title:"sent mail fetching error",
                    message:"sent mail fetching failed..."
                })
            )
        console.log(error)
        }

        setTimeout(()=>{
            dispatch(
                mailAction.showNotification({
                    status:"",
                    title:"",
                    message:""
                })
            )
        },2000)
    }
}






export const readMailData = ({uniqueMail,id}) => {

    return async (dispatch) => {
        dispatch(
            mailAction.showNotification({
                status:"pending",
                title:"Reading",
                message:"reading mail..."
            })
        )
        const readMail = async() => {
            
              const response = await axios.patch(`${api}/${user}/${id}.json`,{...uniqueMail,read:true})
              const data = await response.data;
                    
           
              //console.log(data)
          }

        try{
            await readMail();

            dispatch(
                mailAction.showNotification({
                    status:"success",
                    title:"read mail",
                    message:"mail read succsfully"
                })
            )

        }catch(error){
            dispatch(
                mailAction.showNotification({
                    status:"error",
                    title:"reading error",
                    message:"reading mail failed..."
                })
            )
        console.log(error)
        }

        setTimeout(()=>{
            dispatch(
                mailAction.showNotification({
                    status:"",
                    title:"",
                    message:""
                })
            )
        },2000)
    }
}














