import React, {Component} from "react";

class AuthorPage extends Component{
    
    componentDidMount()
    {
        //getAllBooksFromAuthor();
    }

    getAllBooksFromAuthor() {
        
    }
    

    render() {
        console.log(this.props.match.params.author);

        return(
            <div>
                Books By : {this.props.match.params.author}
            </div>
        )
    }
}


export default AuthorPage