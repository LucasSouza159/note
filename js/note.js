const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Adicionar nova nota";
  addBtn.innerText = "Adicionar nota";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function removeNote(noteId) {
  let confirmDel = confirm("Você tem certeza que deseja deletar essa nota?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
function editarNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = `Editando a nota: ${title}`;
  addBtn.innerText = "Salvar Edição";
}

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.title}</p>
                    <span
                      >${filterDesc}</span
                    >
                  </div>
                  <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="menu">
                        <li onclick="editarNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Editar</li>
                        <li onclick="removeNote(${id})"><i class="uil uil-trash"></i>Remover</li>
                      </ul>
                    </div>
                  </div>
                </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()];
    day = currentDate.getDate();
    year = currentDate.getFullYear();

    let noteInfo = { title, description, date: `${day} ${month}, ${year}` };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
