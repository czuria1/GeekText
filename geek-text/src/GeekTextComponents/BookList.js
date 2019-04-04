import React, {Component} from "react";
import "./ModalImage.css"
import "./BookList.css"
import ajaxme from "ajaxme";
import SearchArea from "./SearchArea";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
const size = 9;



// window.onload = store;


class BookList extends Component{

    constructor(props){
        super(props);
        this.state = {
            books: [],
            fi:[],
            onPage: 1,
            order: "ASC",
            pageSize:10,
            sort: "title"
         
        };
      this.retriveResults = this.retriveResults.bind(this);
     // this.DESCResults = this.DESCResults.bind(this);
      this.orderResults = this.orderResults.bind(this);
      this.sortResults = this.sortResults.bind(this);
      this.ASC = this.ASC.bind(this);
      this.DESC = this.DESC.bind(this);
        }

//  updateSearch(event) {
//      this.setState({search: event.target.value.substring(0,20)});
//  }



    //Copy and pasted from old files
    componentDidMount(){
        if(this.props.pageSize){
          this.setState({size: this.props.pageSize});
        }
    }

    
    // componentWillReceiveProps(p){
    //     if(p.size){
    //         this.setState({size: p.size});
    //     }
    //     console.log(p);
    //     if(props.author){
    //         //get
            
    //     }
    //     this.setState({books:})

    // }

    onChangePage = (page) =>{
        console.log(Math.ceil(this.state.fi.length/size));
        this.setState({
            onPage: page,
        });

    }
        orderResults(event){
            this.setState({order:event.target, fi: sortKeys(this.state.fi, this.state.sort,event.target.value)});
        }
        sortResults(event){
            this.setState({sort: event.target.value, fi: sortKeys(this.state.fi,event.target.value, this.state.order)});
        }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        console.log(this.state);
        if (this.props.match.params.term === nextProps.match.params.term && nextState.order == this.state.order)
        {
            
            return false;
        }
        else
        {
            var parent = document.getElementById("route-container");
            var child = document.getElementById("listContainer");
            child.remove();
            var listContainer = document.createElement('div');
            listContainer.id = "listContainer";
            parent.appendChild(listContainer);
            return true;
        }
       
        
    }

    DESC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
    }
    
    ASC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
    }

    retriveResults() {
        //Used to connect to the server
        ajaxme.post({
          url: "http://localhost/server.php/post",
          data: "method=getSearchInfo&searchParam=" + `${this.props.match.params.term}` + `&sortParam=` + `${this.state.order}`,
          success: function(XMLHttpRequest) {
            //If the search returns no result from the db
            if (XMLHttpRequest.responseText === "0 results") 
            {
                this.showResultsNotFound();
                return;
            }
            else if (document.getElementById("noResultsContainer") !== null)
            {
                document.getElementById("noResultsContainer").remove();
            }

            console.log("success", XMLHttpRequest.responseText);

            this.setState({
                books: JSON.parse(XMLHttpRequest.responseText)
            });

            this.newMethod();
    
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

    descResults() {
        //Used to connect to the server
        ajaxme.post({
          url: "http://localhost/server.php/post",
          data: "method=getDESCInfo&searchParam=" + `${this.props.match.params.term}`,
          success: function(XMLHttpRequest) {
            //If the search returns no result from the db

            console.log("success", XMLHttpRequest.responseText);

            this.setState({
                books: JSON.parse(XMLHttpRequest.responseText)
            });

            this.newMethod();
    
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

    newMethod() {
        var bookInfoArray = this.ConvertToStringArray();
        var list = this.appendHTMLElements(bookInfoArray, this.props);
        if (this.props.linkClicked) {
            document.getElementById("author-book-info-container").appendChild(list);
        }
        else {
            document.getElementById("listContainer").appendChild(list);
        }
    }

    showResultsNotFound() {
        var rootDiv = document.getElementById("search-info-container");
        var noResultsContainer = document.createElement('div');
        noResultsContainer.id = "noResultsContainer";
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
        noResultsContainer.appendChild(noResults);
        noResultsContainer.appendChild(diffSearch);
        noResultsContainer.appendChild(searchByAuthorTip);
        noResultsContainer.appendChild(searchByTitleTip);
        noResultsContainer.appendChild(searchByGenreTip);
        rootDiv.appendChild(noResultsContainer);
    }

    ConvertToStringArray ()
    {
        var arr = [];

        for (const bookIndex in this.state.books) {
            arr.push(this.state.books[bookIndex].title + "`" + 
                    this.state.books[bookIndex].author + "`" + 
                    this.state.books[bookIndex].genre + "`" +
                    this.state.books[bookIndex].publisher + "`" +
                    this.state.books[bookIndex].pub_date + "`" +
                    this.state.books[bookIndex].description + "`" +
                    this.state.books[bookIndex].rating + "`" +
                    this.state.books[bookIndex].cover);
        }

        return arr;
    }

    shoppingCartClicked(shoppingCartLink) {
        shoppingCartLink.addEventListener("click", function(e){
            e.preventDefault();
        });
    }

    appendHTMLElements (bookInfoArray, props) 
    {
        var { modalDiv, modalImage, caption, close } = this.createModalImage();


        var list = document.createElement('div');
        list.id = "list";

        list.appendChild(modalDiv);

        for (let index = 0; index < bookInfoArray.length; index++) 
        {
            //Create list elements
            var { line,
                  bookListContainer,
                  coverContainer,
                  detailContainer,
                  shoppingCartLink, 
                  authorLink, 
                  title, 
                  authorContainer, 
                  span, 
                  genre, 
                  publisher, 
                  pub_date, 
                  description, 
                  rating, 
                  cover } = this.createElements(bookInfoArray, index, modalDiv, modalImage, caption);

            this.addElementId(line, shoppingCartLink, authorLink, bookListContainer, coverContainer, detailContainer);

            close.onclick = function() {
                modalDiv.style.display = "none";
            }
            
            // Set its contents:
            this.setElementContents(title, 
                                    bookInfoArray, 
                                    index, 
                                    authorContainer, 
                                    span, 
                                    authorLink, 
                                    genre, 
                                    publisher, 
                                    pub_date, 
                                    description, 
                                    rating, 
                                    shoppingCartLink);
            
            //Pass the author name to the author page
            var authorPageLinkString = authorLink.innerText;
            authorPageLinkString = authorPageLinkString.substring(authorPageLinkString.indexOf(" ") + 1);
            authorLink.href = "#/authorPage/" + `${authorPageLinkString}`; 

            // Add it to the list:
            this.appendChildren(detailContainer,
                                coverContainer,
                                bookListContainer,
                                list, 
                                cover, 
                                title, 
                                props, 
                                authorContainer, 
                                genre, 
                                publisher, 
                                pub_date, 
                                description, 
                                rating, 
                                shoppingCartLink, 
                                line);
        }

        return list;
    }
    
    appendChildren(detailContainer, coverContainer, bookListContainer, list, cover, title, props, authorContainer, genre, publisher, pub_date, description, rating, shoppingCartLink, line) {
        list.appendChild(bookListContainer);
        bookListContainer.appendChild(coverContainer);
        bookListContainer.appendChild(detailContainer);
        coverContainer.appendChild(cover);
        detailContainer.appendChild(title);
        if (!props.linkClicked) {
            detailContainer.appendChild(authorContainer);
        }
        detailContainer.appendChild(genre);
        detailContainer.appendChild(publisher);
        detailContainer.appendChild(pub_date);
        detailContainer.appendChild(description);
        detailContainer.appendChild(rating);
        detailContainer.appendChild(shoppingCartLink);
        list.appendChild(line);
    }

    setElementContents(title, bookInfoArray, index, authorContainer, span, authorLink, genre, publisher, pub_date, description, rating, shoppingCartLink) {
        title.appendChild(document.createTextNode("Title: " + bookInfoArray[index].split('`')[0]));
        authorContainer.appendChild(span);
        span.appendChild(authorLink);
        authorLink.appendChild(document.createTextNode("Author: " + bookInfoArray[index].split('`')[1]));
        genre.appendChild(document.createTextNode("Genre: " + bookInfoArray[index].split('`')[2]));
        publisher.appendChild(document.createTextNode("Publisher: " + bookInfoArray[index].split('`')[3]));
        pub_date.appendChild(document.createTextNode("Publish Date: " + bookInfoArray[index].split('`')[4]));
        description.appendChild(document.createTextNode("Description: " + bookInfoArray[index].split('`')[5]));
        rating.appendChild(document.createTextNode("Rating: " + bookInfoArray[index].split('`')[6]));
        shoppingCartLink.appendChild(document.createTextNode("Add to shopping cart"));
    }

    addElementId(line, shoppingCartLink, authorLink, bookListContainer, coverContainer, detailContainer) {
        line.id = "line";
        shoppingCartLink.id = "shoppingCartLink";
        authorLink.id = "authorLink";
        bookListContainer.id = "bookListContainer";
        coverContainer.id = "coverContainer";
        detailContainer.id = "detailContainer";
    }

    createElements(bookInfoArray, index, modalDiv, modalImage, caption) {
        var detailContainer = document.createElement('div');
        var coverContainer = document.createElement('div');
        var bookListContainer = document.createElement('div');
        var cover = document.createElement('img');
        this.setCoverAttributes(cover, bookInfoArray, index, modalDiv, modalImage, caption);
        var title = document.createElement('p');
        var authorContainer = document.createElement('p');
        var span = document.createElement('p');
        var authorLink = document.createElement('a');
        var genre = document.createElement('p');
        var publisher = document.createElement('p');
        var pub_date = document.createElement('p');
        var description = document.createElement('p');
        var rating = document.createElement('p');
        var shoppingCartLink = document.createElement('a');
        shoppingCartLink.href = "";
        this.shoppingCartClicked(shoppingCartLink);
        var line = document.createElement('hr');
        return { line, bookListContainer, coverContainer, detailContainer, shoppingCartLink, authorLink, title, authorContainer, span, genre, publisher, pub_date, description, rating, cover };
    }

    setCoverAttributes(cover, bookInfoArray, index, modalDiv, modalImage, caption) {
        cover.src = bookInfoArray[index].split('`')[7];
        cover.alt = "Image not available";
        cover.id = "cover";
        cover.onclick = function () {
            modalDiv.style.display = "block";
            modalImage.src = bookInfoArray[index].split('`')[7];
            caption.innerHTML = bookInfoArray[index].split('`')[0];
        };
    }


    createModalImage() {
        var modalDiv = document.createElement('div');
        modalDiv.id = "myModal";
        modalDiv.className = "modal";
        var close = document.createElement('span');
        close.className = "close";
        close.appendChild(document.createTextNode("X"));
        var modalImage = document.createElement('img');
        modalImage.className = "modal-content";
        modalImage.id = "img01";
        var caption = document.createElement('div');
        caption.id = "caption";
        modalDiv.appendChild(close);
        modalDiv.appendChild(modalImage);
        modalDiv.appendChild(caption);
        return { modalDiv, modalImage, caption, close };
    }

    render() {
      

        // if(bool = true){
        // this.retriveResults();
        // bool = false;
        // }
        // else{
        // this.descResults();
        // bool = true;
        // }
        console.log("FEJEKMEFSSEGERWGRRGRSGRG");
        this.retriveResults();

        return (

//             <body>
//                 finalStore();
//     <div style="text-align:center;">
//     <input type="button" id="first" onclick="firstPage()" value="first" />
//     <input type="button" id="next" onclick="nextPage()" value="next" />
//     <input type="button" id="previous" onclick="previousPage()" value="previous" />
//     <input type="button" id="last" onclick="lastPage()" value="last" />

//     <div id="list"></div>
//     </div>
// </body>
            
            <div >
                
                <p>ORDER THE BOOKS</p>
                <select defaultValue = {this.state.order} onChange = {this.ASC}>
                <option value ={"ASC"} onClick = {this.ASC} >ASCENDING!!!</option>
                <option value ={"DESC"}onClick = {this.DESC} >DESCENDING!!!</option>
                </select>
                
                <SearchArea></SearchArea>
                <div id="listContainer">
                </div>
                <Pagination onChangePage = {this.onChangePage}
                            showSizeChanger
                            onPage = {this.state.onPage}
                            total = {this.state.books.length}
                            pageSize = {this.state.pageSize}
                            pageSizeOptions = {'10,20'}
                            
                            /> 
            </div>
        )
    }
}

export default BookList;


function sortKeys(array, key, order) {
return array.sort(function(i,j){
    var a = i[key];
    var b = j[key];
    if(a < b){
        return order * (-1);

    }
    else if(a > b){
        return order * 1;
    }
    else{
        return 0
    }
})

}