
const test = (props) =>
{
    
    var arr = [];

    for (const bookIndex in props.books) {
        arr.push(props.books[bookIndex].title + "`" + props.books[bookIndex].genre)
    }

    return arr;
}

function tet (bookInfoArray) 
{
   var list = document.createElement('ul');
   list.style.listStyleType = "none"

   for (let index = 0; index < bookInfoArray.length; index++) 
   {
        var title = document.createElement('li');
        var genre = document.createElement('li');
        var line = document.createElement('hr');

        // Set its contents:
        title.appendChild(document.createTextNode("Title: " + bookInfoArray[index].split('`')[0]));
        genre.appendChild(document.createTextNode("Genre: " + bookInfoArray[index].split('`')[1]));

        // Add it to the list:
        list.appendChild(title);
        list.appendChild(genre);
        list.appendChild(line);
   }

   return list;
    
}

const BookList = (props) => 
{
    var bookInfoArray = test(props);
    var list = tet(bookInfoArray);
    document.getElementById("book-info-container").appendChild(list)

    return null;
}

export default BookList;