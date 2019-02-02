import React from 'react';
import BookCard from './BookCard';

const test = (props) =>{
    
    var arr = [];

    for (const bookIndex in props.books) {
        arr.push(props.books[bookIndex].title + "`" + props.books[bookIndex].genre)
    }

    return arr;
}

const getBookInfo = () =>
{
    console.log("here");
}

const BookList = (props) => 
{
    let bookInfoArray = test(props);

    return(
        <div>
            <h2>{
                    this.getBookInfo.bind(this)
                    //bookInfoArray[0].split('`')[0]
                }</h2>
        </div>
    )
}

export default BookList;