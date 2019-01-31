import React from 'react';

const SearchArea = (props) => 
{
    return(
        <div>
            <button onClick={props.searchButtonClicked}>Search...</button>
            <input type="text" onChange={props.handleSearch}/>
            
        </div>
    )
}

export default SearchArea;