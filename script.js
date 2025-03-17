
  const AddButtons =document.querySelectorAll(".userInput button")
  // const inputValue=document.querySelector("#input")
  const contentDivs =document.querySelectorAll(".content")

  contentDivs.forEach((div)=>{
    div.addEventListener("drop",dropHandler)
    div.addEventListener("dragover",dragoverHandler)
  })
  AddButtons.forEach((btn)=>{
    btn.addEventListener("click",createTask)
  })
  
  
  
  function createTask(e){
    const btn = e.target;
    const input = btn.previousElementSibling;
    console.log(input)
    const contentDiv = btn.parentElement.previousElementSibling;
    

    const taskDiv=document.createElement("div")
    const text=document.createElement("p")
    const date=document.createElement("span")

    taskDiv.classList.add("task")
    taskDiv.draggable=true
    taskDiv.id= Date.now()
    taskDiv.addEventListener("dragstart",dragstartHandler)

    text.innerHTML=input.value;

    date.classList.add("date")
    date.innerHTML=new Date().toLocaleString();


    taskDiv.append(text,date)
    contentDiv.append(taskDiv)
    input.value=""

  }

  function dragstartHandler(e){
    e.dataTransfer.setData("text/html",e.target.id)
  }


  function dropHandler(e){
    e.preventDefault();
    const data=e.dataTransfer.getData("text/html");
    e.target.appendChild(document.getElementById(data));

  }

  function dragoverHandler(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }