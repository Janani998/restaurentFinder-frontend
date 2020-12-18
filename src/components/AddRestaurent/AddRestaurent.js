import { Paper, Typography } from "@material-ui/core";
import React,{Component} from "react";
import './AddRestaurent.css';

class AddRestaurent extends Component{
    constructor(){
        super();
        this.state = {
            restaurentName : "",
            locality : "",
            cusineName : "",
            cusines : [],
            dishName : "",
            dishDescription : "",
            dishes : [],
            streetName : "",
            city : "",
            state : "",
            country : "",
            errorMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCusineAdd = this.handleCusineAdd.bind(this);
        this.handleDishAdd = this.handleDishAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }
    handleCusineAdd(){
        const cusinesCopy = [...this.state.cusines];
        cusinesCopy.push(this.state.cusineName.toLowerCase());
        this.setState({cusines : cusinesCopy});
        this.setState({cusineName : ""});
    }
    handleDishAdd(){
        const dishesCopy = [...this.state.dishes];
        const dishObj = {
            name : this.state.dishName.toLowerCase(),
            description : this.state.dishDescription
        }
        dishesCopy.push(dishObj);
        this.setState({dishes : dishesCopy});
        this.setState({dishName : ""});
        this.setState({dishDescription : ""});
    }

    handleSubmit = (event) => {
        if(!this.state.restaurentName){
            this.setState({errorMessage : "Please Enter Restaurent Name"});
            return;
        }
        if(this.state.cusines.length === 0 ){
            this.setState({errorMessage : "Please Add Cusines"});
            return;
        }
        if(!this.state.dishes.length === 0){
            this.setState({errorMessage : "Please Add dishes"});
            return;
        }
        if(!this.state.streetName){
            this.setState({errorMessage : "Please Enter Street Name"});
            return;
        }
        if(!this.state.locality){
            this.setState({errorMessage : "Enter Locality"});
            return;
        }
        if(!this.state.city){
            this.setState({errorMessage : "Please Enter City"});
            return;
        }
        if(!this.state.state){
            this.setState({errorMessage : "Please Enter State"});
            return;
        }
        if(!this.state.country){
            this.setState({errorMessage : "Please Enter Country"});
            return;
        }
        
        alert('A form was submitted: ');
        // console.log(restaurentObj);
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify({
                name : this.state.restaurentName,
                locality : this.state.locality.toLowerCase(),
                cusines : this.state.cusines,
                dishes : this.state.dishes,
                streetName : this.state.streetName,
                city : this.state.city.toLowerCase(),
                state : this.state.state.toLowerCase(),
                country : this.state.country.toLowerCase()
            })
          }).then(function(response) {
            return response.json();
          });
    
        event.preventDefault();
        this.setState({
            restaurentName : "",
            locality : "",
            cusineName : "",
            cusines : [],
            dishName : "",
            dishDescription : "",
            dishes : [{}],
            streetName : "",
            city : "",
            state : "",
            country : "",
            errorMessage : ""
        })
    }

    render(){
        return(
            <div className = "container">
            <Paper className = "paperContainer" varient ='elevation' elevation={3} >
            <h1>ADD RESTAURENT</h1>
            {this.state.errorMessage && <div className = "errorMessage">{this.state.errorMessage}</div>}
                <div className= "formContainer">
                    <label>
                    Restaurent Name:
                    <input type="text" className="inputField" value={this.state.restaurentName} name="restaurentName" onChange={this.handleChange} />
                    </label>
                    <div>
                        <label>
                            Cusines:
                            <input type="text" className="inputField" value={this.state.cusineName} name="cusineName" onChange={this.handleChange} />
                            <div className = "message">
                            Press Add After Entering value
                            </div>
                            
                            <div>
                                <button onClick = {this.handleCusineAdd}>Add</button>
                            </div>
                            
                        </label>
                    </div>
                    <br/>
                    <br/>
                    <div >
                        <div className = "subHeading">Dishes:</div>
                        <div class = "dishContents">
                            <label>
                                Dish Name:
                                <input type="text" className="inputField" value={this.state.dishName} name="dishName" onChange={this.handleChange} />
                            </label>
                            <label>
                                Dish Description
                                <textarea className="inputField" value={this.state.dishDescription} name="dishDescription" onChange={this.handleChange} ></textarea>
                            </label>
                            <div className = "message">Press Add After Entering value</div>
                            
                        </div>
                            <button onClick = {this.handleDishAdd}>Add</button>
                    </div>
                    <div className = "heading">Address</div>
                    
                        <label>
                            Street Name:
                            <input type="text" className="inputField" value={this.state.streetName} name="streetName" onChange={this.handleChange} />
                        </label>
                        <label>
                            Locality:
                            <input type="text" className="inputField" value={this.state.locality} name="locality" onChange={this.handleChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" className="inputField" value={this.state.city} name="city" onChange={this.handleChange} />
                        </label>
                        <label>
                            State:
                            <input type="text" className="inputField" value={this.state.state} name="state" onChange={this.handleChange} />
                        </label>
                        <label>
                            Country:
                            <input type="text" className="inputField" value={this.state.country} name="country" onChange={this.handleChange} />
                        </label>
                
                    <div className = "buttonContainer">
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
        
                </div>
                </Paper>
            </div>
            
        );
    }
}

export default AddRestaurent;