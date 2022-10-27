//Get the modal
let modal = document.getElementById('myModal');

//Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];

//When the user clicks on <span> (x) close the modal
span.onclick = function(){
    CloseModal();
}

function OpenModal(){
    let labels = document.getElementsByTagName('label');
    console.log(labels);
    modal.style.display = 'block';
}
function CloseModal(){
    modal.style.display = 'none';
}

window.onclick = function(event){
    if (event.target == modal) {
        CloseModal();
    }
}