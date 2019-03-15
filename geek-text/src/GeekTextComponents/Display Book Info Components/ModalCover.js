import React from 'react';

const ModalCover = () => {
    return ( <div id="myModal" className="modal">
                <span id="closeButton" className="close" onClick={closeModalImage}>X</span>
                <img className="modal-content" id="img01"></img>
                <div id="caption"></div>
            </div> );
}

function closeModalImage() {
    var modalDiv = document.getElementById("myModal");
    modalDiv.style.display = "none";
}
 
export default ModalCover;