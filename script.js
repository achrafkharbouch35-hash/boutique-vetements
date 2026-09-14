/* =====================================================
   VELORA — FASHION STORE
   ===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

const WHATSAPP_NUMBER = "212600000000";


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Oversized Essential Tee",
        category: "Streetwear",
        price: 249,
        label: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        description: "T-shirt oversized premium avec une coupe contemporaine et un tissu doux."
    },

    {
        id: 2,
        name: "Minimal Black Dress",
        category: "Femme",
        price: 599,
        label: "NEW",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
        description: "Robe noire élégante au design minimaliste, parfaite pour une silhouette moderne."
    },

    {
        id: 3,
        name: "Classic Tailored Jacket",
        category: "Homme",
        price: 899,
        label: "PREMIUM",
        image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=85",
        description: "Veste structurée inspirée du tailoring contemporain."
    },

    {
        id: 4,
        name: "Relaxed Linen Shirt",
        category: "Homme",
        price: 449,
        label: "NEW",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
        description: "Chemise en lin à la coupe décontractée et intemporelle."
    },

    {
        id: 5,
        name: "Urban Cargo Pants",
        category: "Streetwear",
        price: 499,
        label: "TRENDING",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
        description: "Pantalon cargo urbain avec une coupe moderne et confortable."
    },

    {
        id: 6,
        name: "Satin Evening Top",
        category: "Femme",
        price: 399,
        label: "NEW",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
        description: "Top satiné élégant conçu pour une allure sophistiquée."
    },

    {
        id: 7,
        name: "Essential Knit Sweater",
        category: "Homme",
        price: 549,
        label: "ESSENTIAL",
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85",
        description: "Pull confortable à la texture douce et au style minimal."
    },

    {
        id: 8,
        name: "Modern Denim",
        category: "Streetwear",
        price: 479,
        label: "TRENDING",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
        description: "Denim moderne pensé pour composer facilement vos looks quotidiens."
    }

];


/* =====================================================
   STATE
===================================================== */

let cart = JSON.parse(localStorage.getItem("veloraCart")) || [];
let favorites = JSON.parse(localStorage.getItem("veloraFavorites")) || [];

let currentProduct = null;
let selectedSize = "M";


/* =====================================================
   DOM
===================================================== */

const loader = document.getElementById("loader");

const header = document.getElementById("header");

const productGrid = document.getElementById("productGrid");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const productModal = document.getElementById("productModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalAdd = document.getElementById("modalAdd");

const favoriteCount = document.getElementById("favoriteCount");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastText = document.getElementById("toastText");

const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");


/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1800);

    renderProducts();
    updateCart();
    updateFavorites();

    setupRevealAnimations();
    setupCursor();

});


/* =====================================================
   HEADER SCROLL
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   PRODUCT RENDER
===================================================== */

function renderProducts(filter = "all") {

    productGrid.innerHTML = "";

    const filteredProducts = filter === "all"
        ? products
        : products.filter(product => product.category === filter);


    filteredProducts.forEach((product, index) => {

        const isFavorite = favorites.includes(product.id);

        const card = document.createElement("article");

        card.className = "product-card reveal";

        card.style.transitionDelay = `${index * 70}ms`;

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-label">
                    ${product.label}
                </span>

                <div class="product-actions">

                    <button
                        class="product-action favorite-product ${isFavorite ? "liked" : ""}"
                        data-id="${product.id}"
                        aria-label="Ajouter aux favoris"
                    >

                        <svg viewBox="0 0 24 24">
                            <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7C3.2 5.8 5.4 4 8 4c1.6 0 3.1.8 4 2.1C12.9 4.8 14.4 4 16 4c2.6 0 4.8 1.8 4.8 4.7z"></path>
                        </svg>

                    </button>

                    <button
                        class="product-action quick-view"
                        data-id="${product.id}"
                        aria-label="Voir le produit"
                    >

                        <svg viewBox="0 0 24 24">
                            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path>
                            <circle cx="12" cy="12" r="2.5"></circle>
                        </svg>

                    </button>

                    <button
                        class="product-action quick-add"
                        data-id="${product.id}"
                        aria-label="Ajouter au panier"
                    >

                        <svg viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>

                    </button>

                </div>

            </div>

            <div class="product-details">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <strong class="product-price">
                    ${formatPrice(product.price)}
                </strong>

            </div>
        `;

        productGrid.appendChild(card);

    });


    observeReveals();

}


/* =====================================================
   PRICE FORMAT
===================================================== */

function formatPrice(price) {

    return `${price.toLocaleString("fr-FR")} MAD`;

}


/* =====================================================
   FILTERS
===================================================== */

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        renderProducts(button.dataset.filter);

    });

});


/* =====================================================
   PRODUCT ACTIONS
===================================================== */

document.addEventListener("click", event => {

    const favorite = event.target.closest(".favorite-product");

    if (favorite) {

        toggleFavorite(Number(favorite.dataset.id));

        return;
    }


    const quickAdd = event.target.closest(".quick-add");

    if (quickAdd) {

        addToCart(Number(quickAdd.dataset.id));

        return;
    }


    const quickView = event.target.closest(".quick-view");

    if (quickView) {

        openProductModal(Number(quickView.dataset.id));

    }

});


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

        showToast(
            "Retiré des favoris",
            "Le produit a été retiré."
        );

    } else {

        favorites.push(id);

        showToast(
            "Ajouté aux favoris",
            "Le produit a été sauvegardé."
        );

    }

    localStorage.setItem(
        "veloraFavorites",
        JSON.stringify(favorites)
    );

    updateFavorites();

    const activeFilter =
        document.querySelector(".filter.active")?.dataset.filter || "all";

    renderProducts(activeFilter);

}


function updateFavorites() {

    favoriteCount.textContent = favorites.length;

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id, size = "M") {

    const product = products.find(item => item.id === id);

    if (!product) return;


    const existing = cart.find(
        item => item.id === id && item.size === size
    );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: size,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast(
        "Ajouté au panier",
        `${product.name} · Taille ${size}`
    );

}


/* =====================================================
   CART STORAGE
===================================================== */

function saveCart() {

    localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = formatPrice(totalPrice);


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">○</div>

                <h4>
                    Votre panier est vide
                </h4>

                <p>
                    Ajoutez vos pièces préférées
                    pour commencer votre commande.
                </p>

            </div>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const element = document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <span>${item.category}</span>

                <h4>${item.name}</h4>

                <strong>
                    ${formatPrice(item.price)}
                </strong>

                <div class="quantity">

                    <button
                        data-action="decrease"
                        data-id="${item.id}"
                        data-size="${item.size}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="increase"
                        data-id="${item.id}"
                        data-size="${item.size}"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                data-action="remove"
                data-id="${item.id}"
                data-size="${item.size}"
            >
                ×
            </button>

        `;

        cartItems.appendChild(element);

    });

}


/* =====================================================
   CART ACTIONS
===================================================== */

cartItems.addEventListener("click", event => {

    const button = event.target.closest("[data-action]");

    if (!button) return;


    const id = Number(button.dataset.id);
    const size = button.dataset.size;
    const action = button.dataset.action;


    const item = cart.find(
        product => product.id === id && product.size === size
    );

    if (!item) return;


    if (action === "increase") {

        item.quantity++;

    }


    if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(
                product =>
                    !(product.id === id && product.size === size)
            );

        }

    }


    if (action === "remove") {

        cart = cart.filter(
            product =>
                !(product.id === id && product.size === size)
        );

    }


    saveCart();
    updateCart();

});


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");

    document.body.classList.add("no-scroll");

}


function closeCartPanel() {

    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;


    currentProduct = product;


    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCategory.textContent = product.category;

    modalName.textContent = product.name;

    modalPrice.textContent = formatPrice(product.price);

    modalDescription.textContent = product.description;


    selectedSize = "M";

    document.querySelectorAll(".sizes button")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.textContent === "M"
            );

        });


    productModal.classList.add("open");

    document.body.classList.add("no-scroll");

}


function closeProductModal() {

    productModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


modalClose.addEventListener(
    "click",
    closeProductModal
);

modalBackdrop.addEventListener(
    "click",
    closeProductModal
);


modalAdd.addEventListener("click", () => {

    if (!currentProduct) return;

    addToCart(
        currentProduct.id,
        selectedSize
    );

    closeProductModal();

});


/* =====================================================
   SIZE SELECT
===================================================== */

document.querySelectorAll(".sizes button").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".sizes button")
            .forEach(item => item.classList.remove("selected"));

        button.classList.add("selected");

        selectedSize = button.textContent;

    });

});


/* =====================================================
   SEARCH
===================================================== */

searchBtn.addEventListener("click", () => {

    searchPanel.classList.add("open");

    document.body.classList.add("no-scroll");

    setTimeout(() => {
        searchInput.focus();
    }, 300);

});


closeSearch.addEventListener("click", closeSearchPanel);


function closeSearchPanel() {

    searchPanel.classList.remove("open");

    document.body.classList.remove("no-scroll");

    searchInput.value = "";

    searchResults.innerHTML = "";

}


searchInput.addEventListener("input", () => {

    const query = searchInput.value
        .trim()
        .toLowerCase();


    if (!query) {

        searchResults.innerHTML = "";

        return;

    }


    const results = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );


    if (results.length === 0) {

        searchResults.innerHTML = `
            <p style="color:#777">
                Aucun produit trouvé.
            </p>
        `;

        return;

    }


    searchResults.innerHTML = results
        .map(product => `

            <div
                class="search-result"
                data-search-id="${product.id}"
            >

                <span>
                    ${product.name}
                </span>

                <strong>
                    ${formatPrice(product.price)}
                </strong>

            </div>

        `)
        .join("");

});


searchResults.addEventListener("click", event => {

    const result =
        event.target.closest("[data-search-id]");

    if (!result) return;

    const id = Number(result.dataset.searchId);

    closeSearchPanel();

    openProductModal(id);

});


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* =====================================================
   NEWSLETTER
===================================================== */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const input =
            event.target.querySelector("input");

        if (!input.value) return;


        showToast(
            "Bienvenue chez VELORA",
            "Vous êtes maintenant inscrit."
        );

        input.value = "";

    });


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast(
                "Panier vide",
                "Ajoutez un produit avant de commander."
            );

            return;

        }


        let message =
            "Bonjour VELORA 👋\n\n" +
            "Je souhaite passer la commande suivante :\n\n";


        cart.forEach(item => {

            message +=
                `• ${item.name}\n` +
                `  Taille : ${item.size}\n` +
                `  Quantité : ${item.quantity}\n` +
                `  Prix : ${formatPrice(item.price * item.quantity)}\n\n`;

        });


        const total = cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


        message +=
            `Total : ${formatPrice(total)}\n\n` +
            "Merci !";


        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=` +
            encodeURIComponent(message);


        window.open(url, "_blank");

    });


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(title, text) {

    toastTitle.textContent = title;

    toastText.textContent = text;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function setupRevealAnimations() {

    observeReveals();

}


function observeReveals() {

    const elements =
        document.querySelectorAll(".reveal:not(.observed)");


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        entry.target.classList.add("observed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: .12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =====================================================
   CURSOR
===================================================== */

function setupCursor() {

    const cursor =
        document.getElementById("cursor");

    const follower =
        document.getElementById("cursorFollower");


    if (window.innerWidth <= 768) return;


    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    window.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateCursor() {

        followerX +=
            (mouseX - followerX) * .13;

        followerY +=
            (mouseY - followerY) * .13;


        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;


        requestAnimationFrame(animateCursor);

    }


    animateCursor();


    document.addEventListener("mouseover", event => {

        if (
            event.target.closest("a") ||
            event.target.closest("button") ||
            event.target.closest(".product-card")
        ) {

            document.body.classList.add("cursor-hover");

        }

    });


    document.addEventListener("mouseout", event => {

        if (
            event.target.closest("a") ||
            event.target.closest("button") ||
            event.target.closest(".product-card")
        ) {

            document.body.classList.remove("cursor-hover");

        }

    });

}


/* =====================================================
   CATEGORY LINKS
===================================================== */

document
    .querySelectorAll("[data-category]")
    .forEach(link => {

        link.addEventListener("click", event => {

            const category =
                link.dataset.category;

            const filter =
                document.querySelector(
                    `.filter[data-filter="${category}"]`
                );


            if (filter) {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                filter.classList.add("active");

                renderProducts(category);

            }

        });

    });


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCartPanel();
        closeProductModal();
        closeSearchPanel();

        mobileMenu.classList.remove("open");

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   IMAGE ERROR FALLBACK
===================================================== */

document.addEventListener("error", event => {

    if (event.target.tagName === "IMG") {

        event.target.style.background =
            "#ddd";

    }

}, true);


/* =====================================================
   END
===================================================== */
