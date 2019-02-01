import React from 'react';
import BookCard from './BookCard';

const BookList = (props) => 
{
    return(
        <div>
            {
                
                props.books.map((book, i) => 
                {
                    return <BookCard
                                key={i}
                                title={book[7].title}></BookCard>
                })
                
            }
        </div>
    )
}

export default BookList;