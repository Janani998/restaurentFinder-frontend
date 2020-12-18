import { Box, Card, InputBase, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import React,{Component} from "react";
import Header from "../Header/Header";
import './RestaurentsList.css';
import queryString from 'query-string';
import RestaurentPreview from "../RestaurentPreview/RestaurentPreview";

class RestaurentsList extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            city : "",
            restaurentsCount: 0,
            restaurents : [],
            count : 0,
            currentPage : 1,
            countPerPage : 4,
            search : ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange  =this.handleChange.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount(){
        
        const parsedQuery = queryString.parse(this.props.history.location.search);

        this.setState({city : parsedQuery.city}, ()=>{
            
            fetch(`http://localhost:5000/${this.state.city}`)
        .then(res =>res.json())
        .then(data =>{
            this.setState({restaurentsCount : data.count},()=>{
                const dataCount = Math.ceil(this.state.restaurentsCount / this.state.countPerPage);
                this.setState({count : dataCount});
            })
        }).catch(error => console.log(error))
        const query = {};
        query.city = this.state.city;
        query.limit = this.state.countPerPage;
        query.offset = this.state.currentPage;
        const parsedString = queryString.stringify(query);
        console.log(parsedString);
        fetch(`http://localhost:5000/restaurents?${parsedString}`)
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            this.setState({restaurents : data},()=>{
            })
        }).catch(error => console.log(error))
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.currentPage !==this.state.currentPage){
            this.handlePagination();
        }
        if(prevState.search !== this.state.search){
            this.handleSearch();   
        }
       
    }


    handlePagination(){
            const query = {};
            query.city = this.state.city;
        query.limit = this.state.countPerPage;
        query.offset = this.state.currentPage;
        const parsedString = queryString.stringify(query);
        console.log(parsedString);
        fetch(`http://localhost:5000/restaurents?${parsedString}`)
        .then(res =>res.json())
        .then(data =>{
            this.setState({restaurents : data},()=>{
            })
        }).catch(error => console.log(error))
    }
    handleChange(event,value){
        this.setState({currentPage : value});
            
    }

    handleSearchChange(e){
        this.setState({search : e.target.value});
    }
    handleClick(value){
        this.props.history.push({pathname : '/restaurentdetails', state : value});
    }

    render(){ 
        return(
            <>
            <Header/>
          <Box className = "boxContainer">
            <Typography variant="h5" color="inherit">
                {`${this.state.city.toUpperCase()} RESTAURENTS`}
            </Typography>
        </Box>
          {this.state.restaurents.map(restaurent => (
               <Card className = "cardContainer" key = {restaurent._id} onClick = {() => this.handleClick(restaurent)}>
                    <div className = "imageDiv"></div>
                    <div className = "contents">
                        <RestaurentPreview name ={restaurent.name} locality = {restaurent.locality} cusines = {restaurent.cusines} />
                    </div>
                </Card>
          ))}
          <div className = "paginationBar">
            <Pagination  count={this.state.count} page ={this.state.currentPage} onChange= {this.handleChange} variant="outlined" color="primary" />
          </div>
          </>
        );
     }
}

export default RestaurentsList;