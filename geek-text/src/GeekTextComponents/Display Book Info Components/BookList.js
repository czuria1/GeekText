import React, {Component} from "react";
import "./ModalImage.css"
import SearchArea from "./SearchArea";
import List from "./List";
import ModalCover from "./ModalCover";
import FilterSearch from "./FilterSearch";
import ServerCall from "../ServerCall";
import styled from "styled-components";

const ListContainer = styled.div`
    width: 60%;
    padding-top: 100px;
    float: right;
`;

const NoResultsContainer = styled.div`
    text-align: center;
`;

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [] 
        };
        this.retriveResults = this.retriveResults.bind(this);
        this.returnList = this.returnList.bind(this);
        this.showNoResults = this.showNoResults.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        this.retriveResults(this.props.match.params.term);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        console.log("currProps",this.props.match.params.term);
        console.log("nextProps", nextProps.match.params.term);
        console.log("this.state.books.length", this.state);
        console.log("nextState.books.length", nextState);
        if (nextProps.match.params.term === this.props.match.params.term && this.state.books.length === nextState.books.length)
        {
            return false;
        }
        else
        {
            this.retriveResults(nextProps.match.params.term);
            return true;
        }
    }

    changeState(response) {
        this.setState({
            books: response
        });
    }

    retriveResults(term) {
        ServerCall("getSearchInfo", term, this.changeState);
    }

    returnList() {
        if (this.state.books.length !== 0 && this.state.books !== "0 results")
        {
            var bookList = this.state.books.map(function(book, index){
                return <List bookInfo={book} key={index} bookIndex={index}></List>;
              })
    
            return bookList;
        }
    }

    showNoResults() {
        if (this.state.books === "0 results")
        {
            return <NoResultsContainer>
                    <p>No titles found (0 hits) - Try these tips:</p>
                    <p>Try a different kind of search:</p>
                    <p>Do a browse search by title, typing just the first few letters of the title.</p>
                    <p>Do a browse search by author, typing just the first few letters of the author's first or last name.</p>
                    <p>Do a browse search by genre, typing just the first few letters of the genre</p>
                </NoResultsContainer>;
        }
    }

    render() { 
        console.log("render");
        return ( 
            <div>
                <SearchArea></SearchArea>
                <FilterSearch></FilterSearch>
                {this.showNoResults()}
                <ListContainer>
                    <ModalCover></ModalCover>
                    {this.returnList()}
                </ListContainer>
            </div>
         );
    }
}
 
export default BookList;