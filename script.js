// Inicializar carrinho a partir do LocalStorage
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const contadorCarrinho = document.getElementById('contador-carrinho');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalSpan = document.getElementById('total');
const produtoImagens = {
    'Cupcake de Baunilha': 'baunilha1.jpg',
    'Cupcake de Chocolate': 'chocolate1.jpg',
    'Cupcake de Coco': 'coco1.jpg',
    'Cupcake de Limao': 'limao1.jpg',
    'Cupcake de Morango': 'Morango1.jpg',
    'Cupcake de RedVelvet': 'Red1.jpg'
};


function atualizarContador() {
    if (contadorCarrinho) contadorCarrinho.textContent = carrinho.length;
}


function atualizarCarrinho() {
    if (itensCarrinho) {
        itensCarrinho.innerHTML = '';
        let total = 0;

        carrinho.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('produto-carrinho');
            
            
            const imagemProduto = produtoImagens[item.nome] || 'placeholder.jpg'; 

            div.innerHTML = `
                <img src="imagens/${imagemProduto}" alt="${item.nome}" class="thumbnail">
                <div class="detalhes-produto">
                    <p class="nome-produto">${item.nome} (${item.quantidade})</p>
                    <p class="preco-produto">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            `;
            itensCarrinho.appendChild(div);
            total += item.preco * item.quantidade;
        });

        if (totalSpan) totalSpan.textContent = total.toFixed(2);
    }
}


function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
    atualizarCarrinho();
}


function exibirMensagem(texto) {
    const mensagem = document.createElement('div');
    mensagem.className = 'popup-mensagem';
    mensagem.textContent = texto;

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.classList.add('popup-mensagem-show');
    }, 100); 

    setTimeout(() => {
        mensagem.classList.remove('popup-mensagem-show');
        setTimeout(() => mensagem.remove(), 500); 
    }, 3000); 
}


function adicionarAoCarrinho(nome, preco) {
    
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        
        itemExistente.quantidade += 1;
    } else {
        
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    exibirMensagem(`${nome} foi adicionado ao carrinho!`);
}



function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
}


document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.add-carrinho');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.getAttribute('data-nome');
            const preco = parseFloat(botao.getAttribute('data-preco'));
            adicionarAoCarrinho(nome, preco);
        });
    });

    atualizarContador();
    atualizarCarrinho();
});


document.getElementById('finalizar-compra')?.addEventListener('click', () => {
    document.getElementById('pagamento').style.display = 'block';
});


document.getElementById('confirmar-pagamento')?.addEventListener('click', () => {
    const metodo = document.querySelector('input[name="pagamento"]:checked')?.value;

    document.getElementById('detalhes-pix').style.display = metodo === 'pix' ? 'block' : 'none';
    document.getElementById('detalhes-cartao').style.display = metodo === 'cartao' ? 'block' : 'none';
});


salvarCarrinho();


const botaoRemoverTodos = document.getElementById('remover-todos');
const botaoFinalizarCompra = document.getElementById('finalizar-compra');


function atualizarVisibilidadeBotoes() {
    if (carrinho.length > 0) {
        botaoFinalizarCompra.style.display = 'inline-block';
        botaoRemoverTodos.style.display = carrinho.length > 1 ? 'inline-block' : 'none';
    } else {
        botaoFinalizarCompra.style.display = 'none';
        botaoRemoverTodos.style.display = 'none';
    }
}

function removerTodos() {
    carrinho.length = 0; 
    salvarCarrinho(); 
    exibirMensagem('Todos os itens foram removidos do carrinho!');
    atualizarVisibilidadeBotoes();
}


botaoRemoverTodos?.addEventListener('click', removerTodos);
botaoFinalizarCompra?.addEventListener('click', () => {
    document.getElementById('pagamento').style.display = 'block';
});


document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    atualizarVisibilidadeBotoes();
});


document.addEventListener('DOMContentLoaded', () => {
    
    window.onload = function () {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none'; 
    };
});
