let cart = [];
let totalPrice = 0;

function addToCart(item, price) {
    // Mahsulot savatda bor yoki yo'qligini tekshirish
    const existingItem = cart.find(cartItem => cartItem.item === item);
    
    if (existingItem) {
        // Agar mahsulot savatda mavjud bo'lsa, sonini oshiramiz
        existingItem.quantity += 1;
    } else {
        // Agar mavjud bo'lmasa, yangi mahsulot qo'shamiz
        cart.push({ item, price, quantity: 1 });
    }
    
    totalPrice += price;
    updateCart();
}

function removeFromCart(item) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    
    if (cartItem) {
        // Agar mahsulot savatda mavjud bo'lsa, uning narxini umumiy summadan olib tashlaymiz
        totalPrice -= cartItem.price * cartItem.quantity;
        
        // Mahsulotni savatdan o'chiramiz
        cart = cart.filter(cartItem => cartItem.item !== item);
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    
    // Savatni yangilab, mahsulotlarni ko'rsatish
    cart.forEach((cartItem, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${cartItem.item} - ${cartItem.quantity} ta - ${cartItem.price * cartItem.quantity} so‘m 
        <button onclick="removeFromCart('${cartItem.item}')">O‘chirish</button>`;
        cartItems.appendChild(li);
    });

    // Umumiy summani yangilash
    document.getElementById("total-price").textContent = totalPrice;
}

document.getElementById("checkout-button").addEventListener("click", function() {
    if(cart.length === 0) {
        alert("Savat bo'sh! Iltimos, mahsulot tanlang.");
        return;
    }
    
    alert(`Sizning buyurtmangiz qabul qilindi. Umumiy summa: ${totalPrice} so‘m`);
    cart = [];
    totalPrice = 0;
    updateCart();
});
