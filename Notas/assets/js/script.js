
const containerDeNotas = document.getElementById("app");

const btnAdicionarNotas = containerDeNotas.querySelector(".add-note");


pegarNotas().forEach(note => {
    const noteElement = criarElementoNota(note.id, note.content);
    containerDeNotas.insertBefore(noteElement, btnAdicionarNotas);
});



btnAdicionarNotas.addEventListener("click", () => adicionarNota());



function pegarNotas() {
    return JSON.parse(localStorage.getItem("banco-notas") || "[]");
}



function salvarNotas(notes) {
    localStorage.setItem("banco-notas", JSON.stringify(notes));
}



function criarElementoNota(id, content) {

    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Nota Vazia...";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    })

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Tem certeza que quer deletar??");

        if (doDelete) {
            deleteNote(id, element);
        }
    })

    return element;
}



function adicionarNota() {
    const existingNotes = pegarNotas();

    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = criarElementoNota(noteObject.id, noteObject.content);
    containerDeNotas.insertBefore(noteElement, btnAdicionarNotas);

    existingNotes.push(noteObject);
    salvarNotas(existingNotes);
}



function updateNote(id, newContent) {
    const notes = pegarNotas();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    salvarNotas(notes);
}



function deleteNote(id, element) {
    const notes = pegarNotas().filter(note => note.id != id);
    salvarNotas(notes);
    containerDeNotas.removeChild(element);
}