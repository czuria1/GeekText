import React, {Component} from "react";

class BookList extends Component{

    constructor(props){
        super(props);

        props.resetBookState();
    }

    ConvertToStringArray (props)
    {
        var arr = [];

        for (const bookIndex in props.books) {
            arr.push(props.books[bookIndex].title + "`" + 
                    props.books[bookIndex].author + "`" + 
                    props.books[bookIndex].genre + "`" +
                    props.books[bookIndex].publisher + "`" +
                    props.books[bookIndex].pub_date + "`" +
                    props.books[bookIndex].description + "`" +
                    props.books[bookIndex].rating + "`" +
                    props.books[bookIndex].cover);
        }

        return arr;
    }

    wishListClicked(addToWishList) {
        addToWishList.addEventListener("click", function(e){
            e.preventDefault();
        });
    }

    appendHTMLElements (bookInfoArray, props) 
    {
        var list = document.createElement('ul');
        list.style.listStyleType = "none"

        for (let index = 0; index < bookInfoArray.length; index++) 
        {
            
            //Create list elements
            var cover = document.createElement('img');
            var title = document.createElement('li');
            var authorContainer = document.createElement('li');
            var span = document.createElement('span');
            var authorLink = document.createElement('a');
            var genre = document.createElement('li');
            var publisher = document.createElement('li');
            var pub_date = document.createElement('li');
            var description = document.createElement('li');
            var rating = document.createElement('li');
            var addToWishList = document.createElement('a');
            var line = document.createElement('hr');
            line.width = "550px";
            addToWishList.style.color = authorLink.style.color = "blue";
            addToWishList.href = "";
            cover.src = bookInfoArray[index].split('`')[7];
            cover.alt = "Image not available";
            this.wishListClicked(addToWishList);

            // Set its contents:
            title.appendChild(document.createTextNode("Title: " + bookInfoArray[index].split('`')[0]));
            authorContainer.appendChild(span);
            span.appendChild(authorLink);
            authorLink.appendChild(document.createTextNode("Author: " + bookInfoArray[index].split('`')[1]));
            genre.appendChild(document.createTextNode("Genre: " + bookInfoArray[index].split('`')[2]));
            publisher.appendChild(document.createTextNode("Publisher: " + bookInfoArray[index].split('`')[3]));
            pub_date.appendChild(document.createTextNode("Publish Date: " + bookInfoArray[index].split('`')[4]));
            description.appendChild(document.createTextNode("Description: " + bookInfoArray[index].split('`')[5]));
            rating.appendChild(document.createTextNode("Rating: " + bookInfoArray[index].split('`')[6]));
            addToWishList.appendChild(document.createTextNode("Add to shopping cart"));
            
            //Pass the author name to the author page
            var authorPageLinkString = authorLink.innerText;
            authorPageLinkString = authorPageLinkString.substring(authorPageLinkString.indexOf(" ") + 1);
            authorLink.href = "#/authorPage/" + `${authorPageLinkString}`; 

            // Add it to the list:
            list.appendChild(cover);
            list.appendChild(title);
            
            if (!props.linkClicked)
            {
                list.appendChild(authorContainer);
            }
            
            list.appendChild(genre);
            list.appendChild(publisher);
            list.appendChild(pub_date);
            list.appendChild(description);
            list.appendChild(rating);
            list.appendChild(addToWishList);
            list.appendChild(line);
                
        }

        return list;
        
    }
    
    render() {

        var bookInfoArray = this.ConvertToStringArray(this.props);
        var list = this.appendHTMLElements(bookInfoArray, this.props);

        if (this.props.linkClicked)
        {
            document.getElementById("author-book-info-container").appendChild(list);
        }
        else
        {
            document.getElementById("book-info-container").appendChild(list);
        }

        return (
             <div>
             </div>
        );
    }
}

export default BookList;