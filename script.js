const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
let editBool = false;

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
    container.classList.remove("initial")
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

//Hide Create Flashcard Card
closeBtn.addEventListener("click", (hideQuestion = () => {
    container.classList.remove("hide"); //make home screen (container) visible again
    addQuestionCard.classList.add("hide");//hide form screen
    if (editBool) {
        editBool = false;
        submitQuestion();
    }
})
);

//Submit Question by clicking "save" button
cardButton.addEventListener("click",
    (submitQuestion = () => {
        editBool = false; //close edit mode
        tempQuestion = question.value.trim();//get the question entered by user
        tempAnswer = answer.value.trim();//get the answer entered by user
        if (!tempQuestion || !tempAnswer) {
            //display error message if input field is empty
            errorMessage.classList.remove("hide");
        } else {
            // open home screen again (container)
            container.classList.remove("hide");
            //hide error message if input is not empty
            errorMessage.classList.add("hide");
            viewList();//add new question to screen
            question.value = "";//clear question area
            answer.value = "";//clear answer area
        }
    })
);

//a function to generate a flashcard
function viewList() {
    var listCard = document.getElementsByClassName("card-list-container");
    //generate a new flashcard div
    var div = document.createElement("div");
    div.classList.add("card");
    //add the question entered by the user
    div.innerHTML +=
        `<p class="question-div">${question.value}</p>`;
    //add the answer entered by the user
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div");
    displayAnswer.innerText = answer.value;

    //create button (link) to show/hide answer
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide");//open/close answer
    });

    div.appendChild(link); //add show/hide button to card
    div.appendChild(displayAnswer);//add answer to card

    //create a div containing edit and delete buttons
    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("buttons-con");
    //create edit button
    var editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click", () => {
        editBool = true;//open edit mode
        modifyElement(editButton, true);
        addQuestionCard.classList.remove("hide");// open form
    });
    buttonsCon.appendChild(editButton);
    disableButtons(false);

    // create delete button
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);//delete question
    });
    buttonsCon.appendChild(deleteButton);//add delete button to buttons-con

    div.appendChild(buttonsCon);//add buttons to card
    listCard[0].appendChild(div);//add new card to screen
    hideQuestion();//close form
}

//modify elements
//a function to edit or delete flashcard
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;//get the top div of the clicked button
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    if (edit) {//if in edit mode
        let parentAns = parentDiv.querySelector(".answer-div").innerText;//get the answer
        answer.value = parentAns; //write the answer back to the input field
        question.value = parentQuestion;//write the question back
        disableButtons(true);//disable buttons
    }
    parentDiv.remove(); //remove flashcard from DOM
};

//disable edit and delete buttons
const disableButtons = (value) => {
    let editButton = document.getElementsByClassName("edit");
    // Enable or disable buttons by navigating through one by one
    Array.from(editButton).forEach((element) => {
        element.disabled = value;
    });
};
window.onload = () => {
    container.classList.add("initial");
}