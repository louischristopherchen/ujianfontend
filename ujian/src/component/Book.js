import React,{Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import '../support/css/component/book.css';


class Book extends Component{
    state ={data:[],page:"",bookID:0,slot:[]};
    componentWillMount(){
        if(this.state.page===""){
        this.doGet();
        }
        else if(this.state.page==="detail"){
        this.doPage();
        }
        
    }
    
    doGet = ()=>{
      axios.get(API_URL+'/book')
        .then(scs=>{
            this.setState({data:scs.data});
            console.log(scs.data);
        }).catch(err=>{
            alert("error");
        })
    }
    renderPage =()=>
    {   
        return (this.state.data.map(map => {
            const {id,nama,jam}= map;
            if(this.state.page==="")
            {   
                return (<div className="col-xs-6" >
                        <input type="button" className="btn btn-success" value={nama+""+jam+""} onClick={()=>this.doPage(id)}/>
                        </div>)
            }}
        ))
    }

    renderPageDetail=()=>
        {
            
            return(
          this.state.slot.map(val => {
            const {id,sit,status}= val;
                if(status==="available")
                {
                    return (<div className="col-xs-6" >
                        <input type="checkbox" ref={"cb"+id} value={id}/>{sit}
                        </div>);  
                }
                else if(status==="sold")
                {
                    return (<div className="col-xs-6" >
                    <input type="checkbox"  value={sit} disabled/>{sit}
                    </div>);     
                }
                else{
                    return (<div className="col-xs-6" >
                    <input type="checkbox"  value={sit} checked disabled/>{sit}
                    </div>);   
        
                }
            
        })//map
    );
    }//renderPageDetail

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
                            jam:data.jam,
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
                    jam:data.jam,
                    totalHarga:totalHarga,
                    slot:sit,
                  }).then((res) => {
                    alert("success");
                    console.log(res);  
                  }).catch((err) => {
                      alert("Add Error!");
                      console.log(err);
                  });   
                
                  
        this.doRedirect();
                }else{
                    alert("pls input");
                }
    }
    doRedirect(){
        axios.get(API_URL+'/book')
        .then(scs=>{
            this.setState({data:scs.data,page:"done",bookID:0,slot:[]});
            
        }).catch(err=>{
            alert("error");
        })
    }
    doPage(no){
        axios.get(API_URL+'/book/'+no)
        .then(scs=>{ 
            this.setState({data:scs.data, page:"detail",bookID:no,slot:scs.data.slot});
        });
        
    }
    doBack=()=>{
        axios.get(API_URL+'/book')
        .then(scs=>{
            this.setState({data:scs.data,page:"",bookID:0,slot:[]});
            
        }).catch(err=>{
            alert("error");
        })
    }
    render(){
        if(this.state.page==="")
        {
            return (

                <div className="container">
                <div className="col-xs-4">{this.renderPage()} </div>
                <div className="col-xs-8">
                <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                            <th>No</th>
                            <th>Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>*</td>
                            <td>*</td>
                        </tr>
                        </tbody>
                             
                        </table>
                      </div>
                </div>    
                    </div>);
        }//if
        else if(this.state.page==="detail"){
            return (

                <div className="container">
                <div className="col-xs-4">
                <div className="row">
                {this.renderPageDetail()}
                </div>
                <p/><input type="button" className="btn btn-success"  value="Add" onClick={()=>this.doBook(this.refs)}/>
                <input type="button" className="btn btn-success"  value="Back" onClick={this.doBack}/>
                </div>
                <div className="col-xs-8">
                <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                              <th>Icon</th>
                              <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>available</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"  checked/></td>
                            <td>choosing</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"  disabled/></td>
                            <td>sold</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"  checked disabled/></td>
                            <td>onprogress</td>
                        </tr>
                        </tbody>
                             
                        </table>
                      </div>
                </div>    
                    </div>);
            }//else if
            return <Redirect to="/transaction" />;
        
    }
}
const mapStateToProps = (state) =>{
    const auth = state.auth;
    // return{usersAlgo:users};
    return {auth};
}
export default connect(mapStateToProps)(Book);
