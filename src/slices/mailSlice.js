import {createSlice} from "@reduxjs/toolkit"


const mailSlice = createSlice({
    name:"mailbox",
    initialState:{
        "mail":[],

    },
    reducers:{
        sendMail (state, action) {
            const newMail = action.payload;
            console.log(newMail)
            state.mail = state.mail.push(newMail);
            console.log(state.mail)
        }
    }
});

export const mailAction = mailSlice.actions;


export default mailSlice;
