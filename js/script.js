// Seleciona o cabeçalho
const cabecalho = document.querySelector("header");

// Observa a rolagem da página
window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
        cabecalho.classList.add("header-rolagem");
    } else {
        cabecalho.classList.remove("header-rolagem");
    }
});

// Elementos que receberão animação
const elementosAnimados = document.querySelectorAll(
    ".hero-content, .hero-imagem, .beneficio-item, " +
    ".produto-card, .categoria-item, .sobre-imagem, " +
    ".sobre-conteudo, .instagram-post"
);

// Adiciona a classe inicial
elementosAnimados.forEach(function (elemento, indice) {
    elemento.classList.add("revelar");

    // Pequeno intervalo entre os elementos
    elemento.style.transitionDelay = `${(indice % 6) * 80}ms`;
});

// Observa quando cada elemento aparece na tela
const observador = new IntersectionObserver(
    function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

// Inicia a observação
elementosAnimados.forEach(function (elemento) {
    observador.observe(elemento);
});

// Botão voltar ao topo
const botaoTopo = document.querySelector("#botao-topo");

// Mostra ou esconde o botão
window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        botaoTopo.classList.add("mostrar");
    } else {
        botaoTopo.classList.remove("mostrar");
    }
});

// Volta suavemente ao início
botaoTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Menu mobile
const botaoMenu = document.querySelector("#menu-botao");
const menuNavegacao = document.querySelector("#menu-navegacao");
const linksMenu = menuNavegacao.querySelectorAll("a");

function fecharMenu() {
    botaoMenu.classList.remove("aberto");
    menuNavegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", function () {
    const menuEstaAberto = menuNavegacao.classList.toggle("aberto");

    botaoMenu.classList.toggle("aberto", menuEstaAberto);
    botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
});

linksMenu.forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        fecharMenu();
    }
});

// Destaca no menu a seção visível na tela
const secoesDoSite = document.querySelectorAll(
    "#inicio, #produtos, #categorias, #sobre, #contato"
);

const linksDoMenu = document.querySelectorAll(
    '.menu-navegacao a[href^="#"]'
);

function atualizarLinkAtivo() {
    let secaoAtual = "inicio";

    const chegouAoFinal =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

    if (chegouAoFinal) {
        secaoAtual = "contato";
    } else {
        secoesDoSite.forEach((secao) => {
            const posicaoDaSecao = secao.offsetTop - 180;

            if (window.scrollY >= posicaoDaSecao) {
                secaoAtual = secao.id;
            }
        });
    }

    linksDoMenu.forEach((link) => {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === `#${secaoAtual}`) {
            link.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", atualizarLinkAtivo);
window.addEventListener("load", atualizarLinkAtivo);

// Botões dos produtos
const numeroWhatsapp = "";

const botoesProdutos = document.querySelectorAll(".produto-botao");

botoesProdutos.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        evento.preventDefault();

        const produto = botao.dataset.produto;

        if (numeroWhatsapp === "") {
            alert(
                `Produto selecionado: ${produto}\n\n` +
                "O WhatsApp será configurado após a apresentação do site."
            );

            return;
        }

        const mensagem =
            `Olá! Vim pelo site da Regina Artesanatos e gostaria de saber mais sobre: ${produto}.`;

        const endereco =
            `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

        window.open(endereco, "_blank", "noopener,noreferrer");
    });
});
