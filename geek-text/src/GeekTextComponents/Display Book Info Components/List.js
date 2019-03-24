import React from 'react';
import { NavLink } from "react-router-dom";

const List = (book) => {
    
    return ( <div>
                <div id="bookListContainer">
                    <div id="coverContainer">
                        <img id="cover" 
                                src={book.bookInfo.cover} 
                                alt="Image not available" 
                                onClick={ function () {showModal(book)}}>
                        </img>
                    </div>
                    <div id="detailContainer">
                        <p>{book.bookIndex + 1}. <NavLink id="authorLink" to={{pathname: "/bookDetails", state: {book: book}}}>{book.bookInfo.title}</NavLink></p>
                        <p><NavLink id="authorLink" to={"/authorPage/" + book.bookInfo.author}>{book.bookInfo.author}</NavLink></p>
                        <p>{book.bookInfo.genre}</p>
                        <p>{book.bookInfo.publisher}</p>
                        <p>{book.bookInfo.pub_date}</p>
                        <p id="shoppingCartLink">Add To Shopping Cart</p>
                    </div>
                    <hr id="line"></hr>
                </div>
            </div> );
}

function showModal(book) {
    var modalDiv = document.getElementById("myModal");
    var modalImage = document.getElementById("img01");
    var caption = document.getElementById("caption");
    modalDiv.style.display = "block";
    modalImage.src = book.bookInfo.cover;
    caption.innerHTML = book.bookInfo.title;
}
 
export default List;