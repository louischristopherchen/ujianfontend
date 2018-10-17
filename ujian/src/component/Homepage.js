import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {API_URL}from '../support/api-url/apiurl';
import { Carousel } from 'react-responsive-carousel';

class HomePage extends Component{
    state ={data:[],dataM:[],bookID:0,movieID:0,jadwal:"",page:"",slot:[],movie:[],totalharga:0};
    componentWillMount(){
        if(this.state.page===""){
            this.doGet();
            }
            else if(this.state.page==="detail"){
            this.doPageMovie();
            }  
    }
    doGet()
    {
        axios.get(API_URL+"/movie")
        .then(scs=>{
        this.setState({movie:scs.data});
       
        });
    }
  
    renderCarouselD=()=>{

        return   this.state.movie.map(temp=>
        <div className="merdeka">
        <img src={temp.url} style={{height:"500px",width:"800px"}}/>
        <p className="legend" onClick={()=>this.doPageMovie(temp.id)}>{temp.nama}</p> 
        </div>
        )
      
        
      }
      doPageMovie(no){
        axios.get(API_URL+'/movie/'+no)
        .then(scs=>{ 
            this.setState({dataM:scs.data, page:"detail",bookID:no,slot:scs.data.slot});
        });
    }
    doJadwal(a){
        axios.get(API_URL+'/book/',{
            params:{
                 waktu : a.cb.value,
                nama:this.state.dataM.nama               
            }
        }).then(scs=>{ 
            console.log(scs.data);
            this.setState({data:scs.data[0], page:"detail",bookID:scs.data[0].id,slot:scs.data[0].slot,jadwal:a.cb.value});
        });
        
    }
    renderSit=()=>
    {
            if(this.state.jadwal!==""){
        return( 
      this.state.slot.map(val => {
        const {id,sit,status}= val;
            if(status==="available")
            {
                return (<div className=" col-xs-1" >
                    <input type="checkbox" ref={"cb"+id} value={id}/>{sit}
                    </div>);  
            }
            else if(status==="sold")
            {
                return (<div className="col-xs-1" >
                <input type="checkbox"  value={sit} disabled/>{sit}
                </div>);     
            }
            else{
                return (<div className="col-xs-1" >
                <input type="checkbox"  value={sit} checked disabled/>{sit}
                </div>);   
    
            }
        
    })//map
);}
return <div></div>
}
renderLayar=()=>{
    if(this.state.jadwal!==""){
      return <input type="button" className="btn btn-success form-control"  value="Layar" />
  }
}
renderButton=()=>{
      if(this.state.jadwal!==""){
        return <input style={{align:"center"}}type="button" className="btn btn-success form-control"  value="CheckOut" onClick={()=>this.doBook(this.refs)}/>
    }
}

renderTotal=()=>{
    if(this.state.jadwal!==""){
      return <div>TOTAL:{this.state.totalharga}</div>
  }
}
doBook=(a)=>{
     
    var data=this.state.data;
    var sit=[];
    console.log(data.slot);
    for( var i in a)
    {
        if(this.refs[i].checked)
        {
            data.slot[this.refs[i].value-1].status="sold"
            
        sit.push(data.slot[this.refs[i].value-1].sit);
        }
        
        
    }   
    
    if(sit.length!==0){
            axios.put(API_URL +'/book/'+this.state.bookID,{
                        id:data.id,
                        nama:data.nama,
                        waktu:data.waktu,
                        harga:data.harga,
                        slot:data.slot
                      }).then((scs)=>{
                        console.log(scs);        
                      }).catch((err)=>{
                        console.log(err);
                        alert("fail");
                      })
          var totalHarga=sit.length*data.harga;
            axios.post(API_URL + "/transaction", {
                username:this.props.auth.username,
                namaBioskop:data.nama,
                waktu:data.waktu,
                totalHarga:totalHarga,
                slot:sit,
              }).then((res) => {
                alert("checkOut"+totalHarga);
                this.setState({totalharga:totalHarga});
                console.log(res);  
              }).catch((err) => {
                  alert("Add Error!");
                  console.log(err);
              });   
            

            }else{
                alert("pls input");
            }
}
   
    render(){
     
      if(this.state.page==="")
    {
        return(
            <div>            
             <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showIndicators={false} className="container">
             {this.renderCarouselD()}
             </Carousel>
            </div>
        );
    }//if
    else if(this.state.page==="detail"&& this.state.dataM!==[])
    {   console.log(this.state.jadwal);
        const {id,url,description,nama}=this.state.dataM;
        return(
            <div>            
             <div className="col-xs-12 col-md-4">
             <img src={url} style={{height:"200px",width:"300px"}}/>
           </div>
           <div className="col-xs-12 col-md-4" style={{textAlign:"left"}}>
            <h1>{nama}</h1>
                {description}
                <select ref="cb" onChange={()=>this.doJadwal(this.refs)}>
                <option>-----</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                </select>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <div className="col-xs-12" style={{align:"center"}}>
                {this.renderLayar()}
                <div className="col-xs-offset-2">
                {this.renderSit()}
                </div>
                <br/><br/>
                {this.renderTotal()}
                <br/><br/>
                {this.renderButton()}
                <p/>
                </div>
             
           </div>
           <div className="col-xs-12 col-md-4">
            </div>
            
            </div>
        );
    }
    }
}

const mapStateToProps = (state) =>{
    const auth = state.auth;
    // return{usersAlgo:users};
    return {auth};
}
export default connect(mapStateToProps)(HomePage);