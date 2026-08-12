let root=document.getElementById("root");

let button=document.createElement("button");
button.textContent="submit";

root.appendChild(button)

let isClicked=false;
button.addEventListener("click",function(){
    button.textContent="submitted";
    isClicked=!isClicked;
    if (isClicked){
    root.style.backgroundColor="black";
    }
    else{
            root.style.backgroundColor="green";
    }

    root.style.height="100v