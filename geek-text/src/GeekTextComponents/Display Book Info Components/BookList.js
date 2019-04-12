import React, {Component} from "react";
import "./ModalImage.css"
import List from "./List";
import ModalCover from "./ModalCover";
import ServerCall from "../ServerCall";
import styled from "styled-components";
import ajaxme from "ajaxme";
import SearchArea from "./SearchArea";
// import Pagination from "react-js-pagination";
// import 'rc-pagination/assets/index.css';`

const pageSize = 10;


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
            books: [],
            fi:[],
            onPage: 1,
            order: "ASC",
            pageSize:10,
            //js-pagination
            apageSize:10,
            itemsCountPerPage: 10,
            totalItemsCount: 10,
            sort: "title"
        };
        this.retriveResults = this.retriveResults.bind(this);
        this.returnList = this.returnList.bind(this);
        this.showNoResults = this.showNoResults.bind(this);
        this.changeState = this.changeState.bind(this);
        this.ASC = this.ASC.bind(this);
        this.DESC = this.DESC.bind(this);
    }

    componentDidMount() {
        this.retriveResults(this.props.match.params.term);
        if(this.props.pageSize){
            this.setState({size: this.props.pageSize});
          }
    }
   

    
    onChangePage = (page) =>{
        console.log(Math.ceil(this.state.books.length/pageSize));
        this.setState({
            onPage: page,
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        console.log(this.state);
        if (this.props.match.params.term === nextProps.match.params.term && this.state.books.length === nextState.books.length && nextState.order === this.state.order)
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
   

   
   

    DESC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
    }
    
    ASC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
    }

    

    retriveResults(term) {
        console.log(this.state.order);
        ServerCall("getSearchInfo", term + ";"+ this.state.order, this.changeState);
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
      //  this.retriveResults();
        return ( 

            <div>
                {this.showNoResults()}
                <ListContainer>
                    <ModalCover></ModalCover>
                    {this.returnList()}
                </ListContainer>
                <p>ORDER THE BOOKS</p>
            <select defaultValue = {this.state.order} onChange = {this.ASC}>
            <option value ={"ASC"} onClick = {this.ASC} >DESCENDING</option>
            <option value ={"DESC"}onClick = {this.DESC} >ASCENDING</option>
            </select>
            
            <div id="listContainer">
           
            </div>
        
            {/* <Pagination class = "d-flex justify-content-center"
activePage={this.state.activePage}
itemsCountPerPage={10}
totalItemsCount={450}
pageRangeDisplayed={5}
onChange={this.handlePageChange}
itemClass='page-item'
linkClass= 'page-link'
//  onChangePage = {this.onChangePage}
                        
                        // onChange={onChange}
                        
                        // onPage = {this.state.onPage}
                        // pageSize = {this.state.pageSize}
                        // pageSizeOptions = {'10,20'}
                        // showQuickJumper
                        // showSizeChanger
                        total = {this.state.books.length}
                        

                        />  */}
            </div>
         );
    }
}
 
export default BookList;