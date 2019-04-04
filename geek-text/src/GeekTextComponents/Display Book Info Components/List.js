import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BookListContainer = styled.div`
    width: 100%;
    text-align: -webkit-center;
`;

const CoverContainer = styled.div`
    padding-left: 10px;
    float: left;
`;

const DetailContainer = styled.div`
    padding-left: 275px;
    text-align: center;
`;

const Line = styled.hr`
    display: -ms-grid;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
`;

const List = (book) => {
    
    return ( <div>
                <BookListContainer>
                    <CoverContainer>
                        <img id="cover" 
                                src={book.bookInfo.cover} 
                                alt="Image not available" 
                                onClick={ function () {showModal(book)}}>
                        </img>
                    </CoverContainer>
                    <DetailContainer>
                        <p>{book.bookIndex + 1}. <NavLink id="authorLink" to={{pathname: "/bookDetails", state: {book: book}}}>{book.bookInfo.title}</NavLink></p>
                        <p><Link component={RouterLink} to={"/authorPage/" + book.bookInfo.author} variant="title">{book.bookInfo.author}</Link></p>
                        <p>{book.bookInfo.genre}</p>
                        <p>{book.bookInfo.publisher}</p>
                        <p>{book.bookInfo.pub_date}</p>
                        <p id="shoppingCartLink">Add To Shopping Cart</p>
                    </DetailContainer>
                    <Line></Line>
                </BookListContainer>
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