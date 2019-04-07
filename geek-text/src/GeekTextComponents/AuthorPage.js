import React, {Component} from "react";
import ajaxme from "ajaxme";
import BookList from "./BookList";

class AuthorPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: []   //Contains all books written by the author
        };

        //Bind the methods to the component
        this.getAllBooksFromAuthor = this.getAllBooksFromAuthor.bind(this);
        this.resetBookState = this.resetBookState.bind(this);
    }
    
    componentDidMount()
    {
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
    
    //Sets the books array to empty to prevent continuos rendering of the booklist
    resetBookState() {
        this.setState({
            books: []
        })
    }

    //Returns the Booklist component if the books array is populated
    retrieveList() {
        return(
            <button>hello</button>
        )
    }

    render() {
        
        return(
            <div align="center" id="author-book-info-container">
                {}
                Books By : {
                    
                            
                
                
                
                            }
            </div>
        )
    }
}


export default AuthorPage