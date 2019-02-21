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

const SearchArea = (props) => 
{
  
    return(
        <div align="center">
            <button id="searchButton" onClick={props.searchButtonClicked}>Search...</button>
            <input onFocus={setTextBoxListner} id="searchText" type="text" placeholder = "Author, Title, Genre ... "onChange={props.handleSearch}/>
            <button id="topSearch" onClick={props.searchButtonClicked}>Top Sellers</button>
        </div>
    )
}

export default SearchArea;