const INITIAL_BEBAS = {userID:"",username:"",nama:"",error:"",cookieCheck:false};
export default (state= INITIAL_BEBAS,action) =>{
    switch(action.type)
    {
        case "USER_LOGIN_BERHASIL": return action.payload;
        case "USER_LOGIN_GAGAL": return {...state,error:"Auth error"};
        case "USER_LOGOUT": return INITIAL_BEBAS;
        default: return state;
    }

}