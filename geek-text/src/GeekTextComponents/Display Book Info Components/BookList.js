import React, {Component} from "react";
import "./ModalImage.css"
import "./BookList.css"
import ajaxme from "ajaxme";
import SearchArea from "../SearchArea";
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
        this.updateList = this.updateList.bind(this);
    }

    updateList() {
        var revList = this.state.books;
        revList.reverse();

        this.setState({
            books: revList
        });
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
                console.log("success", XMLHttpRequest);
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
        
        if (this.state.books.length !== 0)
        {
            var bookList = this.state.books.map(function(book, index){
                return <List bookInfo={book} key={index} bookIndex={index}></List>;
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
                <div style = {styles.sortedDivStyle}>
                <p style = {styles.selectLabelStyle}>Genre</p>
<select style = {styles.selectStyle} defaultValue={this.state.genre} onChange = {this.GenreChange}>
<option value="Horror">Horror</option>
<option value="Science Fiction">Science Fiction</option>
<option value="Fiction">Fiction</option>
<option value="Mystery">Mystery</option>
<option value="Art">Art</option>
<option value="Poetry">Poetry</option>
<option value="Psy">Psy</option>
<option value="Science">Science</option>
<option value="Tra">Travel</option>
<option value="History">History</option>
<option value="Computing">Computing</option>
<option value="PSY">PSY</option>
<option value="PHI">PHI</option>
</select>


                </div>

                <SearchArea ascFunc={this.updateList}></SearchArea>
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

//W3Schools way of doing drop box and I can see it without switching pages
var styles={
    booksStyle:{
    display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around"
    },
    sortedDivStyle:{
    alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    selectStyle:{
    height:"2.0em",
      marginLeft:"4px",
      marginRight: "12px"
      
    },
    selectLabelStyle:{
    marginBottom:"auto",
    marginTop:"auto"
      
    }
}