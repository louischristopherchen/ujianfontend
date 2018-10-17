import React, {Component} from 'react';

class BookD extends Component{
    
    render(){
    
    console.log(this.props.page)
    if(this.props.page==="")
    {   const {id}= this.props.map;
        return (<div className="col-xs-6" >
                <input type="button" className="btn btn-success" value={id} onClick={this.props.doPage}/>
                </div>);
    }//if

    
    
    
    }//render
}
export default BookD;