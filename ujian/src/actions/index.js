import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';

export const sedangLogin =(user)=>{
    return(dispatch)=>{

        axios.get(API_URL+'/user',{
            params:{
                username : user.username,
                password : user.password
                //databse:ref input login
            }
        }).then(user=>{
            console.log(user.data);
            //console untuk ngecek global state
            dispatch({
                type:"USER_LOGIN_BERHASIL",
                payload:{userID:user.data[0].id,username:user.data[0].username,nama:user.data[0].nama,error:""}
                    });
        }).catch(err=> {
            console.log(err);
            dispatch( {type:"USER_LOGIN_GAGAL"});
    
        })

    }
   
};

export const doRegister = (user)=>{
    return (dispatch)=>{
        axios.post(API_URL+'/user',user)
        .then((scs)=> {
            console.log(scs);
            dispatch({
                type:"USER_LOGIN_BERHASIL",
                payload:{username:scs.data.username,nama:scs.data.nama,error:""}
                    });

        })
        .catch((err)=> {
            console.log(err);
        })
    }
};
export const keepLogin =(user)=>{
    return(dispatch)=>{

        axios.get(API_URL+'/user',{
            params:{
                username : user.username,
            }
        }).then(user=>{
            console.log(user.data);
            //console untuk ngecek global state
            dispatch({
                type:"USER_LOGIN_BERHASIL",
                payload:{username:user.data[0].username,nama:user.data[0].nama,error:""}
                    });
        }).catch(err=> {
            console.log(err);
            dispatch( {type:"USER_LOGIN_GAGAL"});
    
        })

    }
   
};