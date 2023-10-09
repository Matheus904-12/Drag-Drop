document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const tarefas = document.querySelectorAll('.tarefa');
    const colunas = document.querySelectorAll('.coluna');
    const botaoTrocarTema = document.getElementById('trocar-tema');
    const botaoAdicionarCartao = document.getElementById('adicionar-cartao');
    const formAdicionarTarefa = document.getElementById('adicionar-tarefa');
    const novaTarefaInput = document.getElementById('nova-tarefa');

    let temaAtual = 'claro';

    function alternarTema() {
        body.classList.toggle('tema-escuro', temaAtual === 'claro');
        temaAtual = (temaAtual === 'claro') ? 'escuro' : 'claro';
    }

    botaoTrocarTema.addEventListener('click', alternarTema);

    function iniciarArrasto(event) {
        this.classList.add('tarefa-arrastando');
    }

    function finalizarArrasto(event) {
        this.classList.remove('tarefa-arrastando');
    }

    function permitirSoltar(event) {
        event.preventDefault();
    }

    function soltarTarefa(event) {
        event.preventDefault();
        const tarefaArrastada = document.querySelector('.tarefa-arrastando');
        if (tarefaArrastada) {
            this.querySelector('ul').appendChild(tarefaArrastada);
        }
    }

    function adicionarTarefa(event) {
        event.preventDefault();
        const novaTarefa = novaTarefaInput.value;
        if (novaTarefa) {
            const novaTarefaElemento = document.createElement('li');
            novaTarefaElemento.innerHTML = novaTarefa;
            novaTarefaElemento.draggable = true;
            novaTarefaElemento.classList.add('tarefa');
            document.getElementById('tarefa-fazer').appendChild(novaTarefaElemento);
            novaTarefaInput.value = '';

            novaTarefaElemento.addEventListener('dragstart', iniciarArrasto);
            novaTarefaElemento.addEventListener('dragend', finalizarArrasto);
        }
    }

    formAdicionarTarefa.addEventListener('submit', adicionarTarefa);

    function editarTarefa(event) {
        event.stopPropagation();
        const tarefa = this;
        tarefa.innerHTML = `
            <div class="tarefa-editar">
                <textarea></textarea>
                <button type="button">Salvar</button>
            </div>
        `;

        const textarea = tarefa.querySelector('textarea');
        const button = tarefa.querySelector('button');

        button.addEventListener('click', function() {
            tarefa.innerHTML = textarea.value;
            tarefa.addEventListener('dragstart', iniciarArrasto);
            tarefa.addEventListener('dragend', finalizarArrasto);
        });
    }

    tarefas.forEach(tarefa => {
        tarefa.addEventListener('click', editarTarefa);
    });

    colunas.forEach(coluna => {
        coluna.addEventListener('dragover', permitirSoltar);
        coluna.addEventListener('drop', soltarTarefa);
    });

    function adicionarCartao(event) {
        event.preventDefault();

        const novoCartao = document.createElement('li');
        novoCartao.classList.add('tarefa');
        novoCartao.draggable = true;
        novoCartao.innerHTML = `
            <div class="tarefa-editar">
                <textarea></textarea>
                <button type="button">Salvar</button>
            </div>
        `;

        document.getElementById('tarefa-fazer').appendChild(novoCartao);
        novoCartao.addEventListener('dragstart', iniciarArrasto);
        novoCartao.addEventListener('dragend', finalizarArrasto);

        const button = novoCartao.querySelector('button');
        button.addEventListener('click', function() {
            const textarea = this.previousElementSibling;
            novoCartao.innerHTML = textarea.value;
            novoCartao.addEventListener('click', editarTarefa);
        });
    }

    botaoAdicionarCartao.addEventListener('click', adicionarCartao);
});
