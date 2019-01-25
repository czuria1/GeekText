import React from 'react';

const BookItem = (props) => 
{
    return(
        <div>
            <img src={props.cover} alt=""></img>
            <h3>{props.bookTitle}</h3>
            <h3>{props.description}</h3>
            <h3>{props.genre}</h3>
            <h3>{props.publishing}</h3>
        </div>
    )
}

export default BookItem;