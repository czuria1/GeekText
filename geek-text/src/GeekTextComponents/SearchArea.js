import React from 'react';

const SearchArea = (props) => 
{
    return(
        <div>
            <button onClick={props.searchButtonClicked}>click me</button>
            <input type="text" onChange={props.handleSearch}/>
        </div>
    )
}

export default SearchArea;