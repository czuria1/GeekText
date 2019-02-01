import React from 'react';

const SearchArea = (props) => 
{
    return(
        <div>
            <button onClick={props.searchButtonClicked}>Search...</button>
            <input type="text" placeholder = "Author, Title, Genre ... "onChange={props.handleSearch}/>
            
        </div>
    )
}

export default SearchArea;