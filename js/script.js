window.addEventListener("DOMContentLoaded", () => {

  const nameOverlay = document.getElementById("name-overlay");
  const welcomeOverlay = document.getElementById("welcome-overlay");

  const nameInput = document.getElementById("name-input");
  const nameOkBtn = document.getElementById("name-ok");
  const welcomeMessage = document.getElementById("welcome-message");
  const closeWelcome = document.getElementById("welcome-close");

  // 1️⃣ Abre o popup para perguntar o nome
  nameOverlay.classList.remove("hidden");

  nameOkBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();

    // Previne continuar sem digitar nada
    if (!name) return;

    // Esconde popup do nome
    nameOverlay.classList.add("hidden");

    // Mostra popup com a mensagem personalizada
    welcomeMessage.innerHTML = `Seja bem-vindo ao meu site, <strong>${name}</strong>!`;
    welcomeOverlay.classList.remove("hidden");
  });

  // 2️⃣ Botão final para fechar tudo
  closeWelcome.addEventListener("click", () => {
    welcomeOverlay.classList.add("hidden");
  });

});


// sistema de busca do site

// Função para remover acentos
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product");

searchInput.addEventListener("input", () => {
  const search = normalizeText(searchInput.value);

  products.forEach(prod => {
    const title = normalizeText(prod.querySelector("h3").innerText);
    const price = normalizeText(prod.querySelector("p").innerText);

    // Busca por múltiplas palavras
    const words = search.split(" ");

    // Verifica se todas as palavras aparecem no título ou no preço
    const match = words.every(word =>
      title.includes(word) || price.includes(word)
    );

    prod.style.display = match ? "block" : "none";
  });
});


// Modal
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

// Quando clicar na imagem do produto → abrir modal
document.querySelectorAll(".product img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

// Fechar clicando fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Fechar apertando ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

// ---------------------
// Carregar produtos salvos
// ---------------------
function loadProducts() {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    const container = document.querySelector(".products");

    produtosSalvos.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("product");
        item.innerHTML = `
            <img src="${p.img}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.preco}</p>
            <a class="btn" href="${p.link}" target="_blank">Ver Produto</a>
        `;
        container.appendChild(item);
    });
}

if (document.querySelector(".products")) {
    loadProducts();
}

// ---------------------
// Adicionar Produto
// ---------------------
function addProduct() {
    const img = document.getElementById("img").value;
    const titulo = document.getElementById("titulo").value;
    const preco = document.getElementById("preco").value;
    const link = document.getElementById("link").value;

    const produto = { img, titulo, preco, link };

    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.push(produto);

    localStorage.setItem("produtos", JSON.stringify(lista));

    document.getElementById("msg").innerText = "Produto adicionado!";
}
