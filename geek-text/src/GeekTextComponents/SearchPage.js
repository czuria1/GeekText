import React, {Component} from "react";
import SearchArea from "./SearchArea";

class BookDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    handleSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    searchButtonClicked(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "./GeekTextServer.cs", true);
        console.log(xhttp);
    }

    render() {
        return (
             <div>
                 <SearchArea handleSearch={this.handleSearch} searchButtonClicked={this.searchButtonClicked}></SearchArea>
             </div>
        );
    }
}

export default BookDetails;