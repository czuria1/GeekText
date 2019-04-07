import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
//import { reverse } from 'dns';
import ajaxme from "ajaxme";

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

     reverse(s){
          return s.split("").reverse().join("");
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
        else
        {
            document.getElementById("searchText").value = "";
        }
       
    }
    //Dropdown list
    dropFunction(){
document.getElementById("myDrop").classList.toggle("show");
    }
    //Being able to close
    onClick(e){
        var i = 0;
        if(!e.target.matches(".opdown")){
            var dropdowns = document.getElementsByClassName("items");
            for (i = 0; i < dropdowns.length; i++) {
                var openDrops = dropdowns[i];
                if(openDrops.classList.contains("show")){
                    openDrops.classList.remove("show");
                }
        }
    }
}



    render() {
        
        return(
            
          
            <div id="search-info-container" align="center">
       
      
            <div id="dropFunc" align="left" to={"/bookList/" + this.state.searchTerm}
                                onClick={this.searchButtonClicked} style = {styles.sortedDivStyle}>
                {/* <p style = {styles.selectLabelStyle}>Genre</p>
<select style = {styles.selectStyle} onChange = "location = this.value;" defaultValue={this.state.genre} onChange = {this.GenreChange}>
 <option disabled selected value> -- select an Genre -- </option> 
<option value="#/bookList/Horror">Horror</option>
<option value="Science Fiction">Science Fiction</option>
<option  value="Fiction">Fiction</option>
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
</select> */}


{/* Until I can fix drop down this will suffice */}
{/* <div class="dropdown">
  <button onclick="dropFunction()" classs = "opdown" >Select Genre</button>
  <div id="myDrop" class = "items" > */}
  <br></br>
  <section align ="left" float = "left">
      <nav>
      <p >Select any Genre of your choosing</p>
    <a href="#/bookList/Horror">    |Horror|  </a>
    <a href="#/bookList/Tra">   |Travel| </a>
<a href="#/bookList/Fiction">   |Fiction|    </a>
<a href="#/bookList/Mystery">   |Mystery|    </a><br></br>
<a href="#/bookList/Art">   |Art|    </a>
<a href="#/bookList/Poetry">    |Poetry|  </a>
<a href="#/bookList/Science">   |Science|    </a>
<a href="#/bookList/PHI">   |Health|    </a><br></br>
<a href="#/bookList/Science Fiction">   |Science Fiction|    </a>

{/* <a href="#/bookList/History">   History    </a><br></br>
<a href="#/bookList/Computing"> Computing    </a> */}
<a href="#/bookList/PSY">   |Psychological|    </a>

</nav>
</section>

  {/* </div>
</div> */}




                </div>

            
                <button id="searchButton" >
                < NavLink style={{ textDecoration: 'none',  color: 'black'}} 
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


