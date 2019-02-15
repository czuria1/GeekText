import React from 'react';

function setTextBoxListner()
{
    var input = document.getElementById("searchText");

    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            document.getElementById("searchButton").click();
        }
    });
}

//Didn't work so another method is needed

const SearchArea = (props) => 
{
  
    return(


        
        <div>



            
            
            <button id="searchButton" onClick={props.searchButtonClicked}>Search...</button>
            <input onFocus={setTextBoxListner} id="searchText" type="text" placeholder = "Author, Title, Genre ... "onChange={props.handleSearch}/>
            <button id="topSearch" onClick={props.searchButtonClicked}>Top Sellers</button>
        


<button onclick = "dropFunction()" class = "droptab">DropList</button>

<div id = "dDown" class = "dContent">
<input type = "text" placeholder = "Sort" 
        id = "dropInput" onkeyup = "filterFunction()">

<a href="#Author">Author</a>
<a href="#Date">Date</a>
<a href="#Genre">Genre</a>
<a href="#Price">Price</a>
<a href="#Publisher">Publisher</a>
<a href="#Rating">Rating</a>
<a href="#Title">Title</a>

</div>

</div>
    )
}

export default SearchArea;