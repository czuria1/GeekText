import React, { Component } from "react";
import ajaxme from "ajaxme";
import "./ModalImage.css"
import SearchArea from "./SearchArea";
import List from "./List";
import ModalCover from "./ModalCover";

class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []   //Contains all books written by the author
        };

        //Bind the methods to the component
        this.getAllBooksFromAuthor = this.getAllBooksFromAuthor.bind(this);
        this.returnList = this.returnList.bind(this);
        this.getAllBooksFromAuthor();
    }

    getAllBooksFromAuthor() {
        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getAllBooksFromAuthor&searchParam=' + `${this.props.match.params.author}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    books: JSON.parse(XMLHttpRequest.responseText)
                })
            }.bind(this),
            error: function (XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function (XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function (XMLHttpRequest) {
            },
            progress: function (XMLHttpRequest) {
            }
        });
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
                <div id="list">
                    <ModalCover></ModalCover>
                    {this.returnList()}
                </div>
            </div>
        )
    }
}


export default AuthorPage