const productsTable = document.getElementById("products_table");
var inCart = document.getElementById("cart_total");
var cartItems = document.getElementById("cart_table").getElementsByTagName('tbody')[0];

const products = [
    {
        productId: 1,
        productName: 'Moto G3',
        productType: 'Mobile',
        productPrice: 15000,
        productQty: 0,
        productImg: "https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g-3rd-gen-r.jpg",
        action: 'Add to cart',
        removeAction: 'Remove'
    },
    {
        productId: 2,
        productName: 'Samsung Galaxy S45',
        productType: 'Mobile',
        productPrice: 65000,
        productQty: 0,
        productImg: "https://www5.lunapic.com/do-not-link-here-use-hosting-instead/161988489487363616?2975736337",
        action: 'Add to cart',
        removeAction: 'Remove'
    },
    {
        productId: 3,
        productName: 'Nirma',
        productType: 'Washing Powder',
        productPrice: 40,
        productQty: 0,
        productImg: "https://www5.lunapic.com/do-not-link-here-use-hosting-instead/161988489487363616?3795488473",
        action: 'Add to cart',
        removeAction: 'Remove'
    },
    {
        productId: 4,
        productName: 'Moto F4',
        productType: 'Mobile',
        productPrice: 15009,
        productQty: 0,
        productImg: "https://www5.lunapic.com/do-not-link-here-use-hosting-instead/161988489487363616?6907135558",
        action: 'Add to cart',
        removeAction: 'Remove'
    }
];

var cart = [];
var cartTotal = 0;

function addProductRows() {
    var tbody = document.createElement("tbody");
    products.forEach(element => {
        var tBodyTr = document.createElement("tr");
        var imgtd = document.createElement("td");
        var img = document.createElement("img");
        img.src= element.productImg;
        img.alt = element.productName;
        img.style = "height : 120px; width : 80px";
        imgtd.appendChild(img);
        tBodyTr.appendChild(imgtd);
        var td1 = document.createElement("td");
        td1.innerHTML = element.productName;
        tBodyTr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = element.productType;
        tBodyTr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = "Rs. " + element.productPrice;
        tBodyTr.appendChild(td3);

        var td4 = document.createElement("td");
        var inputQty = document.createElement("input");
        inputQty.type = "text";
        inputQty.id = element.productId + "_qty";
        td4.appendChild(inputQty);
        tBodyTr.appendChild(td4);

        var td5 = document.createElement("td");
        var action = document.createElement("input");
        action.type = "submit";
        action.value = element.action;
        action.id = element.productId + "_action";
        action.onclick = addToCart;
        td5.appendChild(action);
        tBodyTr.appendChild(td5);

        tBodyTr.classList.add("tbodyStyle")
        tbody.appendChild(tBodyTr);
    });
    productsTable.appendChild(tbody);
}

function removeFromCart(event) {
    cartItems.innerHTML = "";
    var prodId = event.target.id.substring(0, 1);
    var currentQty = cart[prodId - 1].productQty;
    var indexToRemove = cart.indexOf(products[prodId - 1]);
    cartTotal -= cart[prodId - 1].productPrice * currentQty;
    inCart.value = cartTotal;
    var cartAfterRemove = cart.splice(indexToRemove, 1);
    products[prodId - 1].productQty = 0;
    //console.log("Products array after remove " + JSON.stringify(products));
    //console.log("Cart array after remove " + JSON.stringify(cart));
    for (let index = 0; index < cartAfterRemove.length; index++) {
        const element = cart[index];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = element.productName;
        var td2 = document.createElement("td");
        td2.innerHTML = element.productPrice;
        var td3 = document.createElement("td");
        td3.innerHTML = element.productQty;
        var td4 = document.createElement("td");
        var action = document.createElement("input");
        action.type = "submit";
        action.value = element.removeAction;
        action.id = element.productId + "_removeAction";
        action.onclick = removeFromCart;
        td4.appendChild(action);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        cartItems.appendChild(tr);
    }
}

function addToCart(event) {
    cartItems.innerHTML = "";
    var prodId = event.target.id.substring(0, 1);
    var currentQty = document.getElementById(prodId + "_qty").value;
    products[prodId - 1].productQty = currentQty;
    cart.push(products[prodId - 1]);
    cart = cart.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    //console.log("Products array " + JSON.stringify(products));
    //console.log("Cart array " + JSON.stringify(cart));
    for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = element.productName;
        var td2 = document.createElement("td");
        td2.innerHTML = element.productPrice;
        var td3 = document.createElement("td");
        td3.innerHTML = element.productQty;
        var td4 = document.createElement("td");
        var action = document.createElement("input");
        action.type = "submit";
        action.value = element.removeAction;
        action.id = element.productId + "_removeAction";
        action.onclick = removeFromCart;
        td4.appendChild(action);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        cartItems.appendChild(tr);
    }
    cartTotal += cart[prodId - 1].productPrice * currentQty;
    inCart.value = cartTotal;
    document.getElementById(prodId + "_qty").value = "";
}