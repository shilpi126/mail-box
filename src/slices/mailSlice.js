import {createSlice} from "@reduxjs/toolkit"


const mailSlice = createSlice({
    name:"mailbox",
    initialState:{
        mailArr:[],
        sentMsg:[],
        countUnReadMail:0,
        notification:"",
        
    },
    reducers:{
        
        showNotification(state,action){
            
            state.notification={
                title:action.payload.title,
                status:action.payload.status,
                message:action.payload.message,

            }

            
        },
        
        
        getMail (state, action) {
            
            const data = action.payload;
            state.mailArr=[];  
            state.countUnReadMail=0;
            for(const key in data){
              if(data[key].read === false){
                  state.countUnReadMail++;
              }                  
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
        
            
        },

    

        deleteMail(state,action){
            const id = action.payload;
            const afterRemove =state.mailArr.filter((item)=> item.key !== id)
            state.mailArr=afterRemove
        },

        sentMail (state, action) {
            //console.log(action.payload)
            const data = action.payload;
            
            for(const key in data){
                                      
            state.sentMsg.push(
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

            
        },

    }
});

export const mailAction = mailSlice.actions;


export default mailSlice;
