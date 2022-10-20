document.getElementById("readbtn").addEventListener("click", toggleread);


function toggleread() {
  
    var x = document.getElementById("readbtn");
    if (x.innerHTML === "Mark As Read") {
      x.innerHTML = "Read!";
      x.style.backgroundColor = "green";
      x.style.color = "white";
    } else {
      x.innerHTML = "Mark As Read";
      x.style.backgroundColor = "#ffcc33";
      x.style.color = "black";
    }
 
  }