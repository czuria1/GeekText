
const ConvertToStringArray = (props) =>
{
    var arr = [];

    for (const bookIndex in props.books) {
        arr.push(props.books[bookIndex].title + "`" + 
                 props.books[bookIndex].author + "`" + 
                 props.books[bookIndex].genre + "`" +
                 props.books[bookIndex].publisher + "`" +
                 props.books[bookIndex].pub_date + "`" +
                 props.books[bookIndex].description + "`" +
                 props.books[bookIndex].rating);
    }

    return arr;
}

function appendHTMLElements (bookInfoArray) 
{
   var list = document.createElement('ul');
   list.style.listStyleType = "none"

   for (let index = 0; index < bookInfoArray.length; index++) 
   {
        var title = document.createElement('li');
        var author = document.createElement('li');
        var authorLink = document.createElement('a');
        var genre = document.createElement('li');
        var publisher = document.createElement('li');
        var pub_date = document.createElement('li');
        var description = document.createElement('li');
        var rating = document.createElement('li');
        var line = document.createElement('hr');
        line.width = "550px";
        authorLink.href = "";

        // Set its contents:
        title.appendChild(document.createTextNode("Title: " + bookInfoArray[index].split('`')[0]));
        author.appendChild(document.createTextNode("Author: " + bookInfoArray[index].split('`')[1]));
        authorLink.appendChild(author);
        genre.appendChild(document.createTextNode("Genre: " + bookInfoArray[index].split('`')[2]));
        publisher.appendChild(document.createTextNode("Publisher: " + bookInfoArray[index].split('`')[3]));
        pub_date.appendChild(document.createTextNode("Publish Date: " + bookInfoArray[index].split('`')[4]));
        description.appendChild(document.createTextNode("Description: " + bookInfoArray[index].split('`')[5]));
        rating.appendChild(document.createTextNode("Rating: " + bookInfoArray[index].split('`')[6]));

        // Add it to the list:
        list.appendChild(title);
        list.appendChild(authorLink);
        list.appendChild(genre);
        list.appendChild(publisher);
        list.appendChild(pub_date);
        list.appendChild(description);
        list.appendChild(rating);
        list.appendChild(line);
   }

   return list;
    
}

const BookList = (props) => 
{
    var bookInfoArray = ConvertToStringArray(props);
    var list = appendHTMLElements(bookInfoArray);
    document.getElementById("book-info-container").appendChild(list)

    return null;
}

export default BookList;