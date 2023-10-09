// Seleciona todas as tarefas e colunas do HTML
const tarefas = document.querySelectorAll('.tarefas')
const colunas = document.querySelectorAll('.coluna')

// Variavel para armazenas e tarefa que está sendo arrastada
let tarefaArrastada = null

//Adiciona ouvintes de eventos para cada tarefa
tarefas.forEach(tarefa => {
    tarefa.addEventListener('dragstart', iniciarArrasto);
    tarefas.addEventListener('dragend', finalizarArrasto);
})

// Adiciona os ouvintes de eventos para as colunas
colunas.forEach(coluna => {
    coluna.addEventListener('dragover', permitirSOltar);
    coluna.addEventListener('drop', soltarTarefa);
})

function iniciarArrasto(event){
    // Função para iniciar o arrasto da tarefa
    tarefaArrastada = this;

    //Define o efeito visual do arrastar
    this.classList.add('tarefa-arrastadando')
}

function finalizarArrasto(event){
    this.classList.remove
    ('tarefa-arrastando')
}

function permitirSOltar(event){
    // Função para permitir soltar a tarefa na coluna
    event.preventDefalt();
}

function soltarTarefa(event){
    // Função para soltar a tarefa na coluna
    event.preventDefault();

    // Verifica se há uma tarefa sendo arrastada
    if (tarefaArrastada) {
        this.querySelector('.tarefas').appendChild(tarefaArrastada);
        tarefaArrastada = null;
    }
}

// Adiciona o form do HTML
const formAdicionarTarefa = document.getElementById('adicionar-tarefa');

formAdicionarTarefa.addEventListener('submit', adicionarTarefa);