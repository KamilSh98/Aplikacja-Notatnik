const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]")
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Dodaj nową notatkę";
    popupTitle.innerText = "Dodaj nową notatkę";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.discription}</span>
                        </div>
                        <div class="lower-content">
                            <span>${note.date}</span>
                            <div class="options">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}','${note.discription}')"><i class="uil uil-pen">Edytuj</i></li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash">Usuń</i></li>  
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
            showNotes();
        }
    });
}

function deleteNote(noteId){
    let confirmDel = confirm("Jesteś pewny, że chcesz usunać daną notatkę?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes()
}

function updateNote(NoteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Edytuj notatkę";
    popupTitle.innerText = "Edytuj notatkę";
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate();
        hour = dateObj.getHours();
        minute = dateObj.getMinutes();

        let noteInfo = {
            title: noteTitle, discription: noteDesc,
            date: `Dodano: ${day} ${month} ${year} ${hour}:${minute}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        } else {
            notes[updateId] = noteInfo;
        }
        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});