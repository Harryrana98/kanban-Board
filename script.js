
  const AddButton =document.querySelector(".Add")
  const inputValue=document.querySelector("#input")
  const contentDiv=document.querySelector(".content")


  AddButton.addEventListener("click", function(){
    contentDiv.append(inputValue.value)
  })