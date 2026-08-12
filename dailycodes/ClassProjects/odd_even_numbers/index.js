let root=document.getElementById("root");


for (let i=0;i<=1000;i++){
        let h1=document.createElement("h1");
        h1.textContent=i;
        if (i%2==0){
                h1.style.color="green";
        }else{
                h1.style.color="red";
                h1.style.textAlign="end";
        }
        root.appendChild(h1)
}