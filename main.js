let botaoSubmit = document.querySelector("form");
let tabelaCorpo = document.querySelector("#tabela-corpo");
let vetor = [];
let proximoId = 1; 

function calcularIMC(p, a) {
    return p / (a * a);
}

function classificarIMC(p, a) {
    let imcVal = calcularIMC(p, a);
    let status = "";
    let classe = ""; 

    if (imcVal < 18.5) {
        status = "Abaixo do peso";
        classe = "abaixo";
    } else if (imcVal < 25) {
        status = "Peso normal";
        classe = "normal";
    } else if (imcVal < 30) {
        status = "Sobrepeso";
        classe = "sobrepeso";
    } else {
        status = "Obesidade";
        classe = "obesidade";
    }

    return {
        valor: imcVal.toFixed(2),
        status: status,
        classe: classe
    };
}

// ---------- CADASTRO ----------
botaoSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    let nome = document.querySelector(".campoNome").value;
    let altura = parseFloat(document.querySelector(".campoAltura").value.replace(",", "."));
    let peso = parseFloat(document.querySelector(".campoPeso").value.replace(",", "."));

    if (nome.trim() === "") {
        alert("Digite o nome da pessoa!");
        return;
    }
    if (isNaN(altura) || altura < 0.5 || altura > 2.5) {
        alert("Digite uma altura valida entre 0.50m e 2.50m!");
        return;
    }
    if (isNaN(peso) || peso < 20 || peso > 300) {
        alert("Digite um peso valido entre 20kg e 300kg!");
        return;
    }

    let pessoa = { id: proximoId, nome: nome, altura: altura, peso: peso };
    proximoId++;

    vetor.push(pessoa);
    atualizarTabela();

    document.querySelector("form").reset();
});

function atualizarTabela() {
    tabelaCorpo.innerHTML = "";

    vetor.forEach((pessoa) => {
        let resultadoIMC = classificarIMC(pessoa.peso, pessoa.altura);

        let cNome = document.createElement("td");
        let cAltura = document.createElement("td");
        let cPeso = document.createElement("td");
        let cImc = document.createElement("td");
        let cStatus = document.createElement("td");
        let cOPcoes = document.createElement("td");

        let cAumentarPeso = document.createElement("button");
        let cDiminuirPeso = document.createElement("button");
        let remover = document.createElement("button");

        cNome.innerText = pessoa.nome;
        cAltura.innerText = pessoa.altura;
        cPeso.innerText = pessoa.peso;
        cImc.innerText = resultadoIMC.valor;

        let etiqueta = document.createElement("span");
        etiqueta.className = "status status-" + resultadoIMC.classe;
        etiqueta.innerText = resultadoIMC.status;
        cStatus.appendChild(etiqueta);

        cAumentarPeso.textContent = "+Peso";
        cDiminuirPeso.textContent = "-Peso";
        remover.textContent = "Remover";

        cAumentarPeso.className = "btn-aumentar";
        cDiminuirPeso.className = "btn-diminuir";
        remover.className = "btn-remover";

        cAumentarPeso.addEventListener("click", () => {
            if (pessoa.peso + 1 <= 300) {
                pessoa.peso = parseFloat((pessoa.peso + 1).toFixed(1));
                atualizarTabela();
            } else {
                alert("O peso máximo permitido é 300kg!");
            }
        });

        cDiminuirPeso.addEventListener("click", () => {
            if (pessoa.peso - 1 >= 20) {
                pessoa.peso = parseFloat((pessoa.peso - 1).toFixed(1));
                atualizarTabela();
            } else {
                alert("O peso mínimo permitido é 20kg!");
            }
        });

        remover.addEventListener("click", () => {
            vetor = vetor.filter(p => p.id !== pessoa.id);
            atualizarTabela();
        });

        let linha = document.createElement("tr");
        linha.appendChild(cNome);
        linha.appendChild(cAltura);
        linha.appendChild(cPeso);
        linha.appendChild(cImc);
        linha.appendChild(cStatus);

        cOPcoes.appendChild(cAumentarPeso);
        cOPcoes.appendChild(cDiminuirPeso);
        cOPcoes.appendChild(remover);
        linha.appendChild(cOPcoes);

        tabelaCorpo.appendChild(linha);
    });
}

// ---------- ORDENAR ----------
document.querySelector("#btn_ordenar_nome").addEventListener("click", () => {
    vetor.sort((a, b) => a.nome.localeCompare(b.nome));
    atualizarTabela();
});

document.querySelector("#btn_ordenar_imc").addEventListener("click", () => {
    vetor.sort((a, b) => {
        let imcA = calcularIMC(a.peso, a.altura);
        let imcB = calcularIMC(b.peso, b.altura);
        return imcA - imcB;
    });
    atualizarTabela();
});

// ---------- REMOVER MAIOR IMC ----------
document.querySelector("#btn_remover_maior").addEventListener("click", () => {
    if (vetor.length === 0) {
        alert("Não tem ninguém na lista!");
        return;
    }

    let posicaoMaior = 0;
    for (let i = 1; i < vetor.length; i++) {
        let imcAtual = calcularIMC(vetor[i].peso, vetor[i].altura);
        let imcMaior = calcularIMC(vetor[posicaoMaior].peso, vetor[posicaoMaior].altura);
        if (imcAtual > imcMaior) {
            posicaoMaior = i;
        }
    }

    vetor.splice(posicaoMaior, 1); 
    atualizarTabela();
});

// ---------- REMOVER MENOR IMC ----------
document.querySelector("#btn_remover_menor").addEventListener("click", () => {
    if (vetor.length === 0) {
        alert("Não tem ninguém na lista!");
        return;
    }

    let posicaoMenor = 0;
    for (let i = 1; i < vetor.length; i++) {
        let imcAtual = calcularIMC(vetor[i].peso, vetor[i].altura);
        let imcMenor = calcularIMC(vetor[posicaoMenor].peso, vetor[posicaoMenor].altura);
        if (imcAtual < imcMenor) {
            posicaoMenor = i;
        }
    }

    vetor.splice(posicaoMenor, 1);
    atualizarTabela();
});
