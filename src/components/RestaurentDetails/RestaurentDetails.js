import React,{Component} from "react";
import Header from "../Header/Header";
import RestaurentPreview from "../RestaurentPreview/RestaurentPreview";
import './RestaurentDetails.css';
import queryString from 'query-string';

class RestaurentDetails extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const detailsObj = this.props.history.location.state;
        return(
            <>
                <Header/>
                <div className = "contentDisplay">
                    <div className = "firstbox design">
                    <RestaurentPreview name ={detailsObj.name} locality = {detailsObj.locality.toUpperCase()} cusines = {detailsObj.cusines} />
                    </div>
                    <div className = "secondbox design">
                        <div className="heading">Address</div>
                        <div className = "content space">{detailsObj.streetName}</div>
                        <div className = "content space">{detailsObj.locality.toUpperCase()}</div>
                        <div className = "content space">{detailsObj.city.toUpperCase()},{detailsObj.state.toUpperCase()},{detailsObj.country.toUpperCase()}</div>
                    </div>
                    <div className = "thirdBox design">
                        <div className="heading">Menus</div>
                        {detailsObj.dishes.map(dish => (
                        <div key = {dish._id} className = "menu design">
                            <div className = "subHeading">{dish.name}</div>
                            <div className = "content">{dish.description}</div>
                        </div>
                    ))}
                    </div>
                    
                </div>
            </>
        );
    }
}

export default RestaurentDetails;