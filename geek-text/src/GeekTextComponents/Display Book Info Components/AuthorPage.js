import React, { Component } from "react";
import "./ModalImage.css"
import List from "./List";
import ModalCover from "./ModalCover";
import styled from "styled-components";
import ServerCall from "../ServerCall";

const ListContainer = styled.div`
    width: 60%;
    padding-top: 100px;
    float: right;
`;

class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []   //Contains all books written by the author
        };

        //Bind the methods to the component
        this.getAllBooksFromAuthor = this.getAllBooksFromAuthor.bind(this);
        this.returnList = this.returnList.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        this.getAllBooksFromAuthor();
    }
    
    changeState(response) {
        this.setState({
            books: response
        });
    }

    getAllBooksFromAuthor() {
        ServerCall("getAllBooksFromAuthor", this.props.match.params.author, this.changeState);
    }

    returnList() {
        var bookList = this.state.books.map(function (book, index) {
            return <List bookInfo={book} key={index} bookIndex={index}></List>;
        })

        return bookList;
    }

    render() {
        return (
            <div >
                <ListContainer>
                    <ModalCover></ModalCover>
                    {this.returnList()}
                </ListContainer>
            </div>
        )
    }
}


export default AuthorPage