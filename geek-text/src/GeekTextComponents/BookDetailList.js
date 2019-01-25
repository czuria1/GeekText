import React from 'react';
import BookItem from "./BookItem";

const BookDetailList = (props) => 
{
    return(
        <div>
            {
                props.books.map((book, i) => {
                   return  <BookItem key={i}
                                     cover={book.volumeInfo.imageLinks.thumbnail} 
                                     bookTitle={book.volumeInfo.title}
                                     description={book.volumeInfo.description}
                                     genre={book.volumeInfo.categories}
                                     publishing={book.volumeInfo.publisher}
                            ></BookItem>
                })
            }
        </div>
    )
}

export default BookDetailList;