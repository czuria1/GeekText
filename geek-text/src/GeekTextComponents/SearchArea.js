import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
//import { reverse } from 'dns';

class SearchArea extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            books: [],  //Contains all the book returned by the search
            searchTerm: '',
            searchButtonClick: false,
        };

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        //this.updateList = this.updateList.bind(this);
    }

    setTextBoxListner()
    {
        var input = document.getElementById("searchText");

        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                document.getElementById("searchButton").click();
            }
        });
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    componentDidMount() {
        
    }

    

    searchButtonClicked(e) {
        
        if (this.state.searchTerm === "")
        {
            alert("Please enter a search term in the textbox");
            e.preventDefault();
        }
       
    }
  
  

    searchASCClicked() {   
        this.props.updateList();
    }
    

    render() {
        
        return(
            
            
            <div id="search-info-container" align="center">
       
            
            <div id="dropFunc" align="center" style = {styles.sortedDivStyle}>
                <p style = {styles.selectLabelStyle}>Genre</p>
<select style = {styles.selectStyle} defaultValue={this.state.genre} onChange = {this.GenreChange}>
<option disabled selected value> -- select an Genre -- </option>
<option value="Horror">Horror</option>
<option value="Science Fiction">Science Fiction</option>
<option value="Fiction">Fiction</option>
<option value="Mystery">Mystery</option>
<option value="Art">Art</option>
<option value="Poetry">Poetry</option>
<option value="Psy">Psy</option>
<option value="Science">Science</option>
<option value="Tra">Travel</option>
<option value="History">History</option>
<option value="Computing">Computing</option>
<option value="PSY">PSY</option>
<option value="PHI">PHI</option>
</select>


                </div>

            
                <button id="searchButton" >
<                    NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to={"/bookList/" + this.state.searchTerm}
                                onClick={this.searchButtonClicked}
                                >Search</NavLink>
                </button>

                <input onFocus={this.setTextBoxListner} 
                    id="searchText" 
                    type="text" 
                    placeholder = "Author, Title, Genre ... " 
                    onChange={this.handleSearch}/>

                <button id="topSearch">Top Sellers</button>
                <button id="searchButton">
                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to={"/bookList/" + this.state.searchTerm}
                                onClick={this.searchASCClicked}
                                >ASC/DESC</NavLink></button>
                
                
            </div>
        )
    }
}

export default SearchArea;

var styles={
    booksStyle:{
    display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around"
    },
    sortedDivStyle:{
    alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    selectStyle:{
    height:"2.0em",
      marginLeft:"4px",
      marginRight: "12px"
      
    },
    selectLabelStyle:{
    marginBottom:"auto",
    marginTop:"auto"
      
    }
}

function dropFunc(){
   document.getElementById.searchASCClicked.toggle("Show");

}