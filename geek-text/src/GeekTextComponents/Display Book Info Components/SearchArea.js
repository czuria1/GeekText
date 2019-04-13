import React, { Component } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { Link } from '@material-ui/core';
import SearchIcon from 'react-icons/lib/fa/search';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "@material-ui/core";

export default class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: [],  //Contains all the book returned by the search
            searchTerm: ''
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }
    

    setTextBoxListner()
    {
        var input = document.getElementById("searchText");
        
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                
                document.getElementById("linkToList").click();
            }
        });
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchButtonClicked(e) {
        if (this.state.searchTerm === "")
        {
            alert("Please enter a search term in the textbox");
            e.preventDefault();
        }
    }

    render() {
        return(
            <InputGroup style={{display: 'flex', alignItems: 'center'}}>
                <FormControl
                    id="searchText"
                    style={{borderRadius: '1.2rem'}}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={this.handleSearch}
                    onFocus={this.setTextBoxListner}
                    />
                <InputGroup.Append style={{paddingLeft: '3%'}}>
                <Link id="linkToList" 
                    component={RouterLink} 
                    to={"/bookList/" + this.state.searchTerm}
                    onClick={this.searchButtonClicked}
                    ><Button style={{color: 'white'}}>
                        <SearchIcon size={20}></SearchIcon>
                    </Button>
                </Link>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}