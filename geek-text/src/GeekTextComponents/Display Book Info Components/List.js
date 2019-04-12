import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Link, ListItem } from "@material-ui/core";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {List as ListExt} from "@material-ui/core";
import {Button} from 'react-bootstrap';
import {addFromListToCart} from '../shoppingcartcomponents/actions/cartActions';
import {store} from '../../index';

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
                        <ListExt>
                            <ListItem>Title: <Link 
                                component={RouterLink} 
                                to={{pathname: "/bookDetails", state: {book: book}}} 
                                style={{color: "MediumBlue"}}
                                underline="always">
                                {book.bookInfo.title}
                            </Link></ListItem>
                            <ListItem>Author: <Link 
                                component={RouterLink} 
                                to={"/authorPage/" + book.bookInfo.author}
                                style={{color: "MediumBlue"}}
                                underline="always">
                                {book.bookInfo.author}
                            </Link></ListItem>
                            <ListItem>Genre: {book.bookInfo.genre}</ListItem>
                            <ListItem>Publisher: {book.bookInfo.publisher}</ListItem>
                            <ListItem>Publish Date: {book.bookInfo.pub_date}</ListItem>
                            <ListItem><Button variant="outline-dark" onClick={()=>{store.dispatch(addFromListToCart(book))}}>Add Item to Shopping cart</Button></ListItem>
                        </ListExt>
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
 
export default List