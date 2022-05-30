let myLibrary = [];


// Check if there are any already stored data in local storage.
if(!localStorage.getItem("myLibrary")){
    myLibrary = [];
}
else{
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    showBooks();
    addObjToImg();
}
//Book object
function Book(bookName,author,pages,read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages ; 
    this.read = read;
}
//Popup Controls.
let addBookClicked = false;
document.getElementById("add-book").onclick = function() {
    if(addBookClicked == false){
        addBookClicked = true;
        document.getElementById("add-book-popup").style.visibility = "visible";
    }
    else{
        addBookClicked = false;
        document.getElementById("add-book-popup").style.visibility = "hidden";
    }
}
document.getElementById("close-addbook-popup").onclick = function() {
    addBookClicked = false;
    document.getElementById("add-book-popup").style.visibility = "hidden";
}
document.getElementById("submit-book-btn").onclick = function() {
    addBookClicked = false;
    document.getElementById("add-book-popup").style.visibility = "hidden";
    const book = Object.create(Book);
    book.bookName = document.getElementById("book-name").value;
    book.author = document.getElementById("book-author").value;
    book.pages = document.getElementById("book-pages").value;
    book.read = true;
    myLibrary.push(book);
    saveData();
    showBooks();
    addObjToImg();
}
// Creating details pop-up through DOM, adding book details in it and adding controls.
let createdControl = false;
function addObjToImg(){
    let booksOnScreen = document.getElementsByClassName("onScreenBook");
    for (let i = 0; i < booksOnScreen.length; i++) {
        booksOnScreen[i].onclick = function(){
            if(createdControl == false){
                createdControl = true;
                let mainContainer = document.getElementById("main-container");
                let detailsDiv = document.createElement("div");
                detailsDiv.id = "details-popup";
                detailsDiv.classList.add("pop-up");
                let closeButton = document.createElement("button");
                closeButton.id = "detail-close-button";
                closeButton.classList.add("close-popup");
                closeButton.innerHTML = "X";
                closeButton.onclick = function(){ 
                    document.getElementById("details-popup").remove();
                    createdControl = false;
                }
                detailsDiv.appendChild(closeButton);
                let detailsName = document.createElement("div");
                detailsName.id = "details-popup-name";
                detailsName.classList.add("details-popup-element");
                detailsName.innerHTML = "Book name: " + myLibrary[i].bookName;
                detailsDiv.appendChild(detailsName);
                let detailsAuthor = document.createElement("div");
                detailsAuthor.id = "details-popup-author";
                detailsAuthor.classList.add("details-popup-element");
                detailsAuthor.innerHTML = "Book author: " + myLibrary[i].author;
                detailsDiv.appendChild(detailsAuthor);
                let detailsPages = document.createElement("div");
                detailsPages.id = "details-popup-pages";
                detailsPages.classList.add("details-popup-element");
                detailsPages.innerHTML = "Book page count: " + myLibrary[i].pages;
                detailsDiv.appendChild(detailsPages);
                let isReadButton = document.createElement("button");
                isReadButton.id = "popup-isRead-button";
                if(myLibrary[i].read){
                    isReadButton.classList.add("read-green");
                }
                else{
                    isReadButton.classList.add("unread-red");
                }                
                isReadButton.onclick = function(){
                    if(isReadButton.classList.contains("read-green")){
                        myLibrary[i].read = false;
                        isReadButton.classList.add("unread-red");
                        isReadButton.classList.remove("read-green");
                    }
                    else{
                        myLibrary[i].read = true;
                        isReadButton.classList.add("read-green");
                        isReadButton.classList.remove("unread-red");
                    }

                }
                detailsDiv.appendChild(isReadButton);
                let removeButton = document.createElement("button");
                removeButton.innerHTML = "Remove Book";
                removeButton.onclick = function(){
                    myLibrary.splice(i,1);
                    document.getElementById("details-popup").remove();
                    createdControl = false;
                    showBooks();
                    saveData();
                    addObjToImg();
                }
                detailsDiv.appendChild(removeButton);
                mainContainer.appendChild(detailsDiv);
            }

        }
    }
}
//Function to show book items on page.
function showBooks(){
    let library = document.getElementById("book-container");
    while (library.firstChild) {
        library.removeChild(library.lastChild);
      }
    for(let i = 0; i < myLibrary.length; i++ ){
        const bookImg = document.createElement("img");
        bookImg.id = "book-" + i;
        bookImg.classList.add("onScreenBook");
        bookImg.src = 'Repo/Icons/book.svg'
        document.getElementById("book-container").appendChild(bookImg);



    }
}
//Store the data to local storage
function saveData(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}