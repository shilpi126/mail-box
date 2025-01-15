import {createSlice} from "@reduxjs/toolkit"


const mailSlice = createSlice({
    name:"mailbox",
    initialState:{
        mailArr:[],

    },
    reducers:{
        getMail (state, action) {
            //console.log(action.payload)
            const data = action.payload;
            
            for(const key in data){
                                      
            state.mailArr.push(
                {
                 key:key,
                 content:data[key].content,
                 time:data[key].time,
                 subject:data[key].subject,
                 send:data[key].send,
                 reciver:data[key].reciver,
                 read:data[key].read,
                 starred:data[key].starred,
                 sender:data[key].sender,
                 receive:data[key].receive,
               });

                }

           //console.log(state.mailArr)
        }
    }
});

export const mailAction = mailSlice.actions;


export default mailSlice;
