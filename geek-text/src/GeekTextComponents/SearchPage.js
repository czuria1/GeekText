import React, {Component, Fragment} from "react";
import SearchArea from "./SearchArea";
import ajaxme from "ajaxme";
import BookList from "./BookList";


var yes = true;
//This  is for genreating page numbers res. I remebered this from a react tutorial
const page1 = 'shift<';
const page2 = 'shift>';

const range = (from, to, j = 1) => {
    let i = from;
    const range = [];

    while (i <= to){
        range.push(i);
        i += j;
    }
    return range;
}





class SearchPage extends Component {

    constructor(props) {
        super(props);
        const{ exact = null, pages = 10, neighbors = 0} = props;
        this.pages = typeof pages == 'number' ? pages : 10; 
        this.exact = typeof exact == 'number' ? exact : 0;
////////////////////////////////////////////////////////////////////////////
//Trying to show the additional pages     
        //Only have 30 books so keep it low
        //Shows only the tabs left for book
        this.neighbors = typeof neighbors === 'number' ? Math.max(0, Math.min(neighbors, 2)) : 0;
        this.exactPages = Math.ceil(this.exact / this.pages);
        this.state = {
            currentPage: 1, //Current page being 1
            books: [],  //Contains all the book returned by the search
            search: ''  //Contains the key search term to obtain the books
        };

       

        //Bind the methods to the component
        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.resetBookState = this.resetBookState.bind(this);
    }

    //Sets the state "search" to anything the user types in the search box
    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    searchButtonClicked(){

        //window.open("http://google.com");

        //If nothing is in the search box
        if (this.state.search === ""){
            alert("Please enter a search term in the textbox");
            return;
        }

        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getSearchInfo&searchParam=' + `${this.state.search}`,
            success: function(XMLHttpRequest) {
                //If the search returns no result from the db
                if (XMLHttpRequest.responseText === "0 results")
                {
                    this.showResultsNotFound();
                    return;
                }
                console.log(XMLHttpRequest.responseText);
                
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

    showResultsNotFound() {
        var rootDiv = document.getElementById("book-info-container");
        var noResults = document.createElement('p');
        var diffSearch = document.createElement('p');
        var searchByAuthorTip = document.createElement('p');
        var searchByTitleTip = document.createElement('p');
        var searchByGenreTip = document.createElement('p');
        noResults.appendChild(document.createTextNode("No titles found (0 hits) - Try these tips:"));
        diffSearch.appendChild(document.createTextNode("Try a different kind of search:"));
        searchByAuthorTip.appendChild(document.createTextNode("Do a browse search by title, typing just the first few letters of the title."));
        searchByTitleTip.appendChild(document.createTextNode("Do a browse search by author, typing just the first few letters of the author's first or last name."));
        searchByGenreTip.appendChild(document.createTextNode("Do a browse search by genre, typing just the first few letters of the genre"));
        rootDiv.appendChild(noResults);
        rootDiv.appendChild(diffSearch);
        rootDiv.appendChild(searchByAuthorTip);
        rootDiv.appendChild(searchByTitleTip);
        rootDiv.appendChild(searchByGenreTip);
    }

    //Sets the books array to empty to prevent continuos rendering of the booklist
    resetBookState() {
        this.setState({
            books: []
        })
    }

    //Returns the Booklist component if the books array is populated
    retrieveList() {
        
        if(this.state.books.length !== 0)
        {
            return (
                <BookList books={this.state.books} resetBookState={this.resetBookState}></BookList>
            );
        }
        else
        {
            return;
        }
    }

    getPages = () => {
        const neighbors = this.neighbors;
        const exactPages = this.exactPages; 
        const currentPage = this.currentPage;
        //show pages on left side and right side and hide numbers that aren't in range
        const allPages = (this.neighbors * 2) +3;
        const allSquares = allPages +2;
        if(exactPages > allSquares){
            //Had backwards fixed
          const start = Math.max(2, currentPage - neighbors);
          const end = Math.min(exactPages - 1, neighbors + currentPage);
          let prange = range(start, end);
        const spill1 = start > 2;
        const spill2 = (exactPages - end) > 1;
        const off = allPages - (prange.length + 1);

        switch(yes){
            case(!spill1 && spill2):{
                const secondaryPages = range( end +1, end + off);
                prange = [prange, secondaryPages, page2];    //This was completely off 
                break;
            }
            case(spill1 && !spill2):{
                const secondaryPages = range( start +1, end + off);
                prange = [page1, secondaryPages, prange];
                break;
            }
            case(spill1 && spill2):
                
              default:{
                prange = [page1, prange, page2];
                break;         
            }
        }


        return [1, prange, exactPages]
        }
        return range(1,exactPages);

    }
//
    render() {
        //Ref. React tutorial
        if(!this.exact || this.exactPages === 1) return null;
        const {currentPage} = this.state;
        const pages = this.getPages();

        return (
            <Fragment>
                <nav aria-labels= "Book Pages">
                <ul className = "searchpage">
                {pages.map((page, index) =>{
                    if (page === page2) return (
                        <li key = {index} className = "page-items">
                        <a className = "pglink" href = "#" aria-label = "Shift->" onClick = {this.handleMoveRight}>
                        <span className = "sources">Next</span>
                        <span aria-hidden = "true">Right</span>
                        </a>
                        </li>
                    );
                    if (page === page1) return (
                        <li key = {index} className = "page-items">
                        <a className = "pglink" href = "#" aria-label = "Shift<-" onClick = {this.handleMoveLeft}>
                        <span className = "sources">Back</span>
                        <span aria-hidden = "true">Left</span>
                        </a>
                        </li>
                    );
                    return(
                        <li key = {index} className = {`page-items${currentPage === page ? ' activity' : ''}`}>
                        <a className = "pglink" href = "#" onClick = {this.handleClick(page)}>{page}</a>
                        </li>
                    );
                    
                })}
                </ul>
                <div align="center" id="book-info-container">
                 {this.retrieveList()}
                
                 <div> 
                    <SearchArea handleSearch={this.handleSearch} 
                                searchButtonClicked={this.searchButtonClicked}></SearchArea>
                 </div>
             </div>
                </nav>
                
            </Fragment>

         
             
        );
    }
}

export default SearchPage;