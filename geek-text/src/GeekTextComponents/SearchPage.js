import React, {Component} from "react";
import SearchArea from "./SearchArea";
import ajaxme from "ajaxme";

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
        ajaxme.post({
            url: 'http://127.0.0.1/server.php/post',
            data: 'name=Guest',
            success: function(XMLHttpRequest) {
                console.log('success', XMLHttpRequest);
            },
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
                console.log('loadstart', XMLHttpRequest);
            },
            progress: function(XMLHttpRequest) {
                console.log('progress', XMLHttpRequest.percent);
            }
        });
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