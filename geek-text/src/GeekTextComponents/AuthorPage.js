import React, {Component} from "react";
import ajaxme from "ajaxme";
//import "./ModalImage.css"
//import "./BookList.css"

import SearchArea from "./SearchArea";

class AuthorPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: []   //Contains all books written by the author
        };

        //Bind the methods to the component
        this.getAllBooksFromAuthor = this.getAllBooksFromAuthor.bind(this);
        this.returnList = this.returnList.bind(this);
        this.closeModalImage = this.closeModalImage.bind(this);
        this.getAllBooksFromAuthor();
    }

    getAllBooksFromAuthor() {
        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getAllBooksFromAuthor&searchParam=' + `${this.props.match.params.author}`,
            success: function(XMLHttpRequest) {
                this.setState({
                    books: JSON.parse(XMLHttpRequest.responseText)
                })
            }.bind(this),
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
            },
            progress: function(XMLHttpRequest) {
            }
        });
    }

    returnList() {
        var bookList = this.state.books.map(function(book, index){
            return <div key={index} id="bookListContainer">
                    <div id="detailContainer">
                        <p>{book.title}</p>
                        <p>{book.genre}</p>
                        <p>{book.publisher}</p>
                        <p>{book.pub_date}</p>
                        <p>{book.description}</p>
                        <p>{book.rating}</p>
                        <p id="shoppingCartLink">Add To Shopping Cart</p>
                        <hr id="line"></hr>
                    </div>
                    <div id="coverContainer">
                        <img id="cover" 
                             src={book.cover} 
                             alt="Image not available" 
                             onClick={function(){  
                                                    var modalDiv = document.getElementById("myModal");
                                                    var modalImage = document.getElementById("img01");
                                                    var caption = document.getElementById("caption");
                                                    modalDiv.style.display = "block";
                                                    modalImage.src = book.cover;
                                                    caption.innerHTML = book.title;
                                                }}>
                        </img>
                    </div>
                </div>;
          })

        return bookList;
    }

    closeModalImage() {
         var modalDiv = document.getElementById("myModal");
         modalDiv.style.display = "none";
    }

    render() {
        return(
            <div >
                <SearchArea></SearchArea>
                <div id="list">
                    <div id="myModal" className="modal">
                        <span id="closeButton" className="close" onClick={this.closeModalImage}>X</span>
                        <img className="modal-content" id="img01"></img>
                        <div id="caption"></div>
                    </div>
                    {this.returnList()}
                </div>
            </div>
        )
    }
}


export default AuthorPage