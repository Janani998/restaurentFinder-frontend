import React,{Component} from "react";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import './Header.css';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AppBar position="static">
                <Toolbar className = "header" variant="dense" >
                    <div>
                        <RestaurantIcon className = "icon" />
                        <Typography variant="h5" color="inherit">
                            RESTAURENT FINDS
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;