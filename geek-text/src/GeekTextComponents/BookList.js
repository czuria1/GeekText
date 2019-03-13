import React, {Component} from "react";
import "./ModalImage.css"
import "./BookList.css"
import ajaxme from "ajaxme";
import SearchArea from "./SearchArea";
import { NavLink } from "react-router-dom";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [] 
        };
        this.retriveResults = this.retriveResults.bind(this);
        this.returnList = this.returnList.bind(this);
        this.showNoResults = this.showNoResults.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.term === this.props.match.params.term && this.state.books.length === nextState.books.length)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    retriveResults() {
        //Used to connect to the server
        ajaxme.post({
          url: "http://localhost/server.php/post",
          data: "method=getSearchInfo&searchParam=" + `${this.props.match.params.term}`,
          success: function(XMLHttpRequest) {
            //If the search returns no result from the db
            if (XMLHttpRequest.responseText !== "0 results") 
            {
                this.setState({
                    books: JSON.parse(XMLHttpRequest.responseText)
                });
            }
            else
            {
                this.setState({
                    books: []
                });
            }
          }.bind(this),
          error: function(XMLHttpRequest) {
            console.log("error", XMLHttpRequest);
          },
          abort: function(XMLHttpRequest) {
            console.log("abort", XMLHttpRequest);
          },
          loadstart: function(XMLHttpRequest) {},
          progress: function(XMLHttpRequest) {}
        });
    }

    returnList() {
        //todo put coverContainer before detailContainer to fox styling issue
        if (this.state.books.length !== 0)
        {
            var bookList = this.state.books.map(function(book, index){
                return <div key={index} id="bookListContainer">
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
                        <div id="detailContainer">
                            <p>{book.title}</p>
                            <p><NavLink id="authorLink" to={"/authorPage/" + book.author}>{book.author}</NavLink></p>
                            <p>{book.genre}</p>
                            <p>{book.publisher}</p>
                            <p>{book.pub_date}</p>
                            <p>{book.description}</p>
                            <p>{book.rating}</p>
                            <p id="shoppingCartLink">Add To Shopping Cart</p>
                        </div>
                        <hr id="line"></hr>
                    </div>;
              })
    
            return bookList;
        }
    }

    showNoResults() {

        if (this.state.books.length === 0)
        {
            return <div id="noResultsContainer">
                    <p>No titles found (0 hits) - Try these tips:</p>
                    <p>Try a different kind of search:</p>
                    <p>Do a browse search by title, typing just the first few letters of the title.</p>
                    <p>Do a browse search by author, typing just the first few letters of the author's first or last name.</p>
                    <p>Do a browse search by genre, typing just the first few letters of the genre</p>
                </div>;
        }
    }

    closeModalImage() {
        var modalDiv = document.getElementById("myModal");
        modalDiv.style.display = "none";
   }

    render() { 
        
        this.retriveResults();
        return ( 
            <div>
                <SearchArea></SearchArea>
                {this.showNoResults()}
                <div id="list">
                    <div id="myModal" className="modal">
                        <span id="closeButton" className="close" onClick={this.closeModalImage}>X</span>
                        <img className="modal-content" id="img01"></img>
                        <div id="caption"></div>
                    </div>
                    {this.returnList()}
                </div>
            </div>
         );
    }
}
 
export default BookList;