let amigos = [];
let amigosAnteriores = [];

function validarNome(nome) {
    return /^[a-zA-Z\s]+$/.test(nome);
}

function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const inputGostos = document.getElementById("gostos");
    const nome = inputNome.value.trim();
    const gostos = inputGostos.value.trim();

    if (nome === "") {
        alert("Por favor, insira o nome do amigo.");
        return;
    }

    if (nome.trim() === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (!validarNome(nome)) {
        alert("O nome deve conter apenas letras e espaços.");
        return;
    }

    if (amigos.find(amigo => amigo.nome.toLowerCase() === nome.toLowerCase())) {
        alert("Este nome já foi adicionado (verifique maiúsculas/minúsculas).");
        return;
    }

    amigos.push({ nome, gostos });
    inputNome.value = "";
    inputGostos.value = "";
    atualizarListaAmigos();
}

function atualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = `${amigo.nome} (${amigo.gostos})`;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.classList.add("remove-button"); // Adiciona a classe para estilo
        botaoRemover.onclick = () => removerAmigo(amigo.nome);
        li.appendChild(botaoRemover);

        listaAmigos.appendChild(li);
    });
}

function removerAmigo(nome) {
    amigos = amigos.filter(amigo => amigo.nome !== nome);
    atualizarListaAmigos();
}

function embaralharAmigos() {
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }
}

function sortearAmigo() {
    let amigos = []; // Variáveis locais
    let amigosAnteriores = [];

    // Obtém os amigos da lista
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.querySelectorAll("li").forEach(li => {
        const texto = li.textContent;
        const nome = texto.substring(0, texto.indexOf(" (")); // Extrai o nome
        const gostos = texto.substring(texto.indexOf("(") + 1, texto.indexOf(")")); // Extrai os gostos

        amigos.push({ nome, gostos });
    });

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (amigos.length < 3) {
        alert("É preciso ter pelo menos três participantes para realizar o sorteio.");
        return;
    }

    // Embaralha os amigos usando o algoritmo de Fisher-Yates
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }

    // Garante que ninguém tire o próprio nome
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i].nome === amigos[(i + 1) % amigos.length].nome) {
            [amigos[i], amigos[(i + 1) % amigos.length]] = [amigos[(i + 1) % amigos.length], amigos[i]];
        }
    }

    // Exibe os resultados
    amigos.forEach((amigo, index) => {
        const amigoSorteado = amigos[(index + 1) % amigos.length];
        const li = document.createElement("li");
        li.textContent = `${amigo.nome} tirou ${amigoSorteado.nome}`;
        resultado.appendChild(li);
    });
}

function reiniciarJogo() {
    amigos = [];
    amigosAnteriores = [];
    atualizarListaAmigos();
    document.getElementById("resultado").innerHTML = "";
}

function copiarResultados() {
    const resultado = document.getElementById("resultado");
    const texto = resultado.innerText;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Resultados copiados para a área de transferência!"))
            .catch(err => console.error("Erro ao copiar:", err));
    } else {
        alert("Seu navegador não suporta a cópia automática.");
    }
}