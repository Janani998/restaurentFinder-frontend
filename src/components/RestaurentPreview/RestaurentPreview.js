import React,{Component} from "react";
import './RestaurentPreview.css';

class RestaurentPreview extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {name , locality, cusines} = this.props;
        return(
            <>
                <div className = "name">{name}</div>
                    <div className = "locality">{locality.toUpperCase()}</div>
                    <div className = "cusineContainer">
                        {cusines.map(cusine => (
                            <div className = "cusineDiv" key = {cusine}>{cusine.toUpperCase()}</div>
                        ))}
                </div>
            </>
        );
    }
}

export default RestaurentPreview;