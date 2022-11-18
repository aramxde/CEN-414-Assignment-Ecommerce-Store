$(document).ready(function(){
let cart = {};



if (localStorage.getItem("ishop")) {
    cart = JSON.parse(localStorage.getItem("ishop"));
}



		$("[product]").click(function(){
	
    let price = Number($(this).attr("data-price"));
    let title = $(this).attr("data-title");
    let id = $(this).attr("data-id");
	let icon = $(this).attr("data-icon");

if (id in cart) {
	
    cart[id].qty++;
	cart[id].total = cart[id].qty * cart[id].price;
} else {
	
    let cartItem = {
		icon:  icon,
        title: title,
        price: price,
        qty: 1,
		total: price
    };
    cart[id] = cartItem;
}
 	
    localStorage.setItem("ishop", JSON.stringify(cart));
	   	
});

		});