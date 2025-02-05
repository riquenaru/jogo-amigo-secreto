let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira o nome dos participantes.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    input.value = "";
    atualizarListaAmigos();
}

function atualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function embaralharAmigos() {
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }
}

function mostrarResultados() {
    if (amigos.length < 3) {
        alert("É preciso ter pelo menos três participantes para realizar o sorteio.");
        return;
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    let sorteioRealizado = false;
    while (!sorteioRealizado) {
        embaralharAmigos();
        sorteioRealizado = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === amigos[(i + 1) % amigos.length]) {
                sorteioRealizado = false;
                break;
            }
        }
    }

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = `${amigo} tirou ${amigos[(index + 1) % amigos.length]}`;
        resultado.appendChild(li);
    });
}

function sortearAmigo() {
    mostrarResultados();
}