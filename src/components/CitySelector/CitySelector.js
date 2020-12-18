import React,{Component} from "react";
import Button from '@material-ui/core/Button';
import './CitySelector.css';
import queryString from 'query-string';
import Header from "../Header/Header";

class CitySelector extends Component{
    constructor(){
        super();
        this.state = {
            cities : [],
            role : "",
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleAddRestatuent = this.handleAddRestatuent.bind(this);
    }
    componentDidMount(){
        const parsedQuery = queryString.parse(this.props.history.location.search);
        this.setState({role : parsedQuery.role});
        fetch('http://localhost:5000/')
        .then(res =>res.json())
        .then(data =>{
            this.setState({cities : data})
        }).catch(error => console.log(error))
    }

    handleClick(e){
        const selectedCity = e.target.innerText;
        this.props.history.push({pathname : `/restaurentslist`,search : `?city=${selectedCity.toLowerCase()}`});
    }
    handleAddRestatuent(){
        this.props.history.push('/addRestaurent');
    }
    render(){
        return(
            <>
            <Header/>
            {this.state.role && 
                    <Button variant="contained" color="secondary" onClick = {this.handleAddRestatuent}>
                        Add Restaurent
                    </Button>}
            <div className = "citiesDisplay">
            {this.state.cities.map(city => 
            <Button key = {city} variant="outlined" color="primary" className = "btn" onClick = {this.handleClick}>
                {city}
            </Button>)}
            </div>
            </>
        );
    }
}

export default CitySelector;