import React, {Component} from "react";
import "./ModalImage.css"
import "./BookList.css"
import ajaxme from "ajaxme";
import SearchArea from "./SearchArea";
import List from "./List";
import ModalCover from "./ModalCover";

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
                return <List bookInfo={book} key={index}></List>;
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

    render() { 
        
        this.retriveResults();
        return ( 
            <div>
                <SearchArea></SearchArea>
                {this.showNoResults()}
                <div id="list">
                    <ModalCover></ModalCover>
                    {this.returnList()}
                </div>
            </div>
         );
    }
}
 
export default BookList;