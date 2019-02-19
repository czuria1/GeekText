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
        var modalDiv = document.createElement('div');
        modalDiv.id = "myModal";
        modalDiv.className = "modal";
        modalDiv.style.display = "none";
        modalDiv.style.position = "fixed";
        modalDiv.style.zIndex = "1";
        modalDiv.style.paddingTop = "100px";
        modalDiv.style.left = "0";
        modalDiv.style.top = "0";
        modalDiv.style.width = "100%";
        modalDiv.style.height = "100%";
        modalDiv.style.overflow = "auto";
        modalDiv.style.backgroundColor = "rgb(0,0,0)";
        modalDiv.style.backgroundColor = "rgb(0,0,0.9)";

        var close = document.createElement('span');
        close.className = "close";
        close.appendChild(document.createTextNode("&times;"));
        close.style.position = "absolute";
        close.style.top = "15px";
        close.style.right = "35px";
        close.style.color = "#f1f1f1";
        close.style.fontSize = "40px";
        close.style.fontWeight = "bold";
        close.style.transition = "0.3s";

        var modalImage = document.createElement('img');
        modalImage.className = "modal-content";
        modalImage.id = "img01";
        modalImage.style.margin = "auto";
        modalImage.style.display = "block";
        modalImage.style.width = "80%";
        modalImage.style.maxWidth = "700px";
        modalImage.style.animationName = "zoom";
        modalImage.style.animationDuration = "0.6s";

        var caption = document.createElement('div');
        caption.id = "caption";
        caption.style.margin = "auto";
        caption.style.display = "block";
        caption.style.width = "80%";
        caption.style.maxWidth = "700px";
        caption.style.textAlign = "center";
        caption.style.color = "#ccc";
        caption.style.padding = "10px 0";
        caption.style.height = "150px";
        caption.style.animationName = "zoom";
        caption.style.animationDuration = "0.6s";

        modalDiv.appendChild(close);
        modalDiv.appendChild(modalImage);
        modalDiv.appendChild(caption);


        var list = document.createElement('ul');
        list.style.listStyleType = "none"

        list.appendChild(modalDiv);

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
            cover.id = "cover";
            cover.style.borderRadius = "5px";
            cover.style.cursor = "pointer";
            cover.style.transition = "0.3s"
            cover.onclick = function() {
                modalDiv.style.display = "block";
                modalImage.src = cover.src;
                caption.innerHTML = "inner";
            }

            close.onclick = function() {
                modalDiv.style.display = "none";
            }
            
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