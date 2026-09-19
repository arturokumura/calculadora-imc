# Calculadora de IMC

Aplicação web para cadastrar pessoas e calcular o Índice de Massa Corporal (IMC) de cada uma, classificando o resultado automaticamente em faixas de peso. Desenvolvida com **HTML, CSS e JavaScript puro**, sem frameworks ou bibliotecas externas.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/b22bf234-59b7-4f2b-aef5-8d118d54a4ba" />


## Funcionalidades

- **Cadastro com validação:** nome, altura e peso, com checagem de campos vazios e de valores fora de faixa realista (altura entre 0,50 m e 2,50 m; peso entre 20 kg e 300 kg).
- **Aceita vírgula ou ponto** como separador decimal (`1,75` ou `1.75`).
- **Cálculo e classificação do IMC** em quatro faixas, com etiquetas coloridas na tabela:

  | Faixa | IMC |
  |---|---|
  | Abaixo do peso | menos de 18,5 |
  | Peso normal | 18,5 a 24,9 |
  | Sobrepeso | 25 a 29,9 |
  | Obesidade | 30 ou mais |

- **Ajuste rápido de peso:** botões `+Peso` e `-Peso` alteram o peso em 1 kg e recalculam o IMC e a classificação na hora, respeitando os limites de 20 kg e 300 kg.
- **Remoção individual** de qualquer pessoa da lista.
- **Ordenação** da lista por nome (ordem alfabética) ou por IMC (crescente).
- **Remoção por extremos:** remove de uma vez a pessoa com o maior ou o menor IMC da lista.
- **Layout responsivo:** formulário e tabela lado a lado em telas grandes, empilhados em telas menores, com rolagem horizontal na tabela quando necessário.

## Tecnologias

- **HTML5** com estrutura semântica (`header`, `main`, `section`, `table` com `caption`, `label` associado a cada campo)
- **CSS3** com variáveis customizadas (`:root`), Flexbox, media queries e estilos de foco para acessibilidade por teclado
- **JavaScript (ES6+)** puro: manipulação do DOM, eventos, `Array.filter`, `Array.sort`, `Array.splice` e `localeCompare`
- **Google Fonts** (Manrope)

## Como executar

Não há dependências nem etapa de build.

```bash
git clone https://github.com/arturokumura/calculadora-imc.git
cd calculadora-imc
```

Depois, abra o arquivo `index.html` no navegador (duplo clique ou `Open with Live Server`, se usar o VS Code).

## Estrutura do projeto

```
.
├── index.html   # Estrutura da página
├── css.css      # Estilos e layout responsivo
└── main.js      # Lógica: cadastro, cálculo, tabela, ordenação e remoções
```

## Como funciona

- Os dados ficam em um array em memória. Cada pessoa recebe um `id` único, e é por ele que a remoção individual acontece, o que evita apagar o item errado depois de uma reordenação.
- A função `atualizarTabela()` limpa e reconstrói o corpo da tabela a partir do array sempre que algo muda, então a interface reflete sempre o estado atual dos dados.
- O cálculo (`calcularIMC`) e a classificação (`classificarIMC`) são funções separadas, reutilizadas na tabela, na ordenação e na remoção por maior/menor IMC.

## Aviso

O IMC é uma medida simplificada e não deve ser usado como única referência para avaliar a saúde ou o peso de uma pessoa. Outros fatores individuais também devem ser considerados.

## Autor

**ARTUR SILVA OKUMURA**
[LinkedIn](https://linkedin.com/in/arturokumura) · [GitHub](https://github.com/arturokumura)
