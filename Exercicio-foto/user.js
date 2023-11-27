document.addEventListener('DOMContentLoaded', function () {
    renderizarCabecalho();
});


function renderizarCabecalho() {
    const headerLogin = document.getElementById("userHeader");
    const loginButton = document.getElementById("loginButton");
    const nomeUsuarioElement = document.getElementById("nomeUsuario");
    const popup = document.getElementById("popup");
    const conteudoPopup = document.getElementById("conteudoPopup");
    const emailUsuarioPopup = document.getElementById("emailUsuario");

    // Obtenha o nome e email do usuário armazenados no localStorage
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const emailUsuario = localStorage.getItem('emailUsuario');

    // Verifica se os elementos existem antes de manipulá-los
    if (headerLogin && loginButton && nomeUsuarioElement && popup && conteudoPopup && emailUsuarioPopup) {
        if (nomeUsuario) {
            // Usuário logado
            console.log("Usuário logado:", nomeUsuario);
            headerLogin.style.display = "block";
            nomeUsuarioElement.textContent = nomeUsuario;  // Exibe o nome do usuário
            loginButton.style.display = "none";
        } else {
            // Usuário não logado
            console.log("Usuário não logado");
            headerLogin.style.display = "none";
            loginButton.style.display = "block";
        }

        // Adiciona um evento de clique ao headerLogin
        headerLogin.addEventListener("click", function () {
            // Exibe o popup
            popup.style.display = "block";

            // Preenche o conteúdo do popup com o nome e email do usuário
            conteudoPopup.textContent = nomeUsuario;
            emailUsuarioPopup.textContent = emailUsuario; // Adiciona o email do usuário ao popup
            console.log("Email do usuário:", nomeUsuario);
            console.log("Email do usuário:", emailUsuario);
        });
    } else {
        console.error("Elemento não encontrado. Verifique os IDs no HTML.");
    }
}

// Chama a função para renderizar o cabeçalho
renderizarCabecalho();


function logout() {
    // Remove o nome do usuário do localStorage
    localStorage.removeItem('nomeUsuario');
    // Limpe outros dados de usuário, se houver
    window.location.href = "index.html";
}



let popupVisivel = false;

function mostrarOcultarPopup() {
    const popupElement = document.getElementById('popup');

    popupVisivel = !popupVisivel;
    popupElement.classList.toggle('show', popupVisivel);
}


  // Função para adicionar um item ao carrinho
  function addCarrinho(itemNome, itemPreco) {
    // Verifica se o coração está pintado
    const coracaoPintado = document.getElementById('coracao-pintado');
    if (coracaoPintado.style.display === 'inline-block') {
        // Adiciona apenas se o coração estiver pintado
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.nome === itemNome);

        if (itemExistente) {
            // Se o item já estiver no carrinho, aumenta a quantidade
            itemExistente.quantidade += 1;
        } else {
            // Se o item não estiver no carrinho, adiciona ao carrinho
            carrinho.push({ nome: itemNome, preco: itemPreco, quantidade: 1 });
        }

        // Atualiza o localStorage e o DOM
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoDOM();
    } else {
        // Se o coração estiver vazio, limpa o carrinho
        limparCarrinho();
    }
}

// Função para alternar entre coração vazio e coração pintado
function toggleCarrinho(itemNome, itemPreco) {
    const coracaoVazio = document.getElementById('coracao-vazio');
    const coracaoPintado = document.getElementById('coracao-pintado');

    // Alterna entre coração vazio e coração pintado
    coracaoVazio.style.display = coracaoVazio.style.display === 'none' ? 'inline-block' : 'none';
    coracaoPintado.style.display = coracaoPintado.style.display === 'none' ? 'inline-block' : 'none';

    // Adiciona ao carrinho apenas se o coração estiver pintado
    if (coracaoPintado.style.display === 'inline-block') {
        addCarrinho(itemNome, itemPreco);
    } else {
        // Se o coração estiver vazio, limpa o carrinho
        limparCarrinho();
    }

    // Chama a função para alternar o contador
    alternarContador();
} 

// Função para alternar entre coração vazio e coração pintado
function toggleCoracao() {
    const coracaoVazio = document.getElementById('coracao-vazio');
    const coracaoPintado = document.getElementById('coracao-pintado');

    coracaoVazio.style.display = coracaoVazio.style.display === 'none' ? 'inline-block' : 'none';
    coracaoPintado.style.display = coracaoPintado.style.display === 'none' ? 'inline-block' : 'none';
}

// Função para abrir/fechar a lista de favoritos
function toggleFavoritos() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.style.display = carrinhoItens.style.display === 'none' ? 'block' : 'none';
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarCarrinhoDOM();
    alternarContador();
}

// Função para adicionar mais uma unidade do produto
function addMaisUm(itemNome) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.nome === itemNome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoDOM();
    }
}

// Função para remover uma unidade do produto
function removeCarrinho(itemNome) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.nome === itemNome);

    if (itemExistente) {
        itemExistente.quantidade -= 1;

        if (itemExistente.quantidade === 0) {
            // Remove o item do carrinho se a quantidade for zero
            const index = carrinho.indexOf(itemExistente);
            carrinho.splice(index, 1);
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoDOM();
    }
}

function alternarContador() {
    const coracaoVazio = document.getElementById('coracao-vazio');
    const coracaoPintado = document.getElementById('coracao-pintado');

    coracaoVazio.style.display = coracaoVazio.style.display === 'none' ? 'inline-block' : 'none';
    coracaoPintado.style.display = coracaoPintado.style.display === 'none' ? 'inline-block' : 'none';
}

// Função para atualizar o DOM com os itens do carrinho
function atualizarCarrinhoDOM() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const itensLista = document.getElementById('itens-lista');
    const precoTotal = document.getElementById('preco-total');
    const contFavoritos = document.getElementById('cont-favoritos');
    const coracaoVazio = document.getElementById('coracao-vazio');
    const coracaoPintado = document.getElementById('coracao-pintado');

    // Limpa a lista de itens
    itensLista.innerHTML = '';

    // Recupera os itens do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Atualiza a quantidade de favoritos
    contFavoritos.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);

    // Atualiza a lista de itens no carrinho
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item">
                <span>${item.nome}</span>
                <button class="remove" onclick="removeCarrinho('${item.nome}')">-</button>
                <span class="quantity">${item.quantidade}</span>
                <button class="add" onclick="addMaisUm('${item.nome}')">+</button>
                <span class="preco-total">R$${(item.preco * item.quantidade).toFixed(2)}</span>
            </div>
        `;
        itensLista.appendChild(li);
    });

    // Calcula o preço total
    const total = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    precoTotal.textContent = `Valor Total: R$${total.toFixed(2)}`;

    // Exibe ou oculta o carrinho dependendo se há itens no carrinho
    carrinhoItens.style.display = carrinho.length > 0 ? 'block' : 'none';

    // Atualiza o estado do coração
    if (carrinho.length > 0) {
        coracaoVazio.style.display = 'none';
        coracaoPintado.style.display = 'inline-block';
    } else {
        coracaoVazio.style.display = 'inline-block';
        coracaoPintado.style.display = 'none';
    }
}

// Atualiza o DOM ao carregar a página
window.onload = function () {
    atualizarCarrinhoDOM();
};