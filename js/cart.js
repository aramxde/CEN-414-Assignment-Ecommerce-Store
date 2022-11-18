
		    var sub_total = 0;
    var cartitem = 0;
		 var cart = {};
$(document).ready(function() {
   

drawcart();

    

    $("#empty-cart").click(function() {
        cart = {};
        localStorage.setItem("ishop", JSON.stringify(cart));
		
    });
	 $("#checkout").click(function() {
        cart = {};
        localStorage.setItem("ishop", JSON.stringify(cart));
		alert(" Purchase Successful!!!       	Thank You For Shopping at I-Shop ");
		
    });



});
function drawcart(){
    sub_total = 0;
    cartitem = 0;
    if (localStorage.getItem("ishop")) {
        cart = JSON.parse(localStorage.getItem("ishop"));
    }
    let tbody = $("#tbody");
	tbody.empty();

    for (let id in cart) {
        let item = cart[id];
        if (item.qty == 0) {
            delete cart[id];
            localStorage.setItem("ishop", JSON.stringify(cart));

        }
        let tr = $("<tr></tr>");
		

		
        let title_td = $("<td></td>").text(item.title);
		title_td.prepend(`<img class="card-img-top" ` + `src="` + item.icon + `" style="width:70px; height:70px;">`);
        tr.append(title_td);

        let price_td = $("<td></td>").text("$ " + item.price.toLocaleString("en-US"));
        tr.append(price_td);

        if (item.qty < 10) {

            var qty_td = $("<td></td>").text(item.qty + ` .`);
        } else {
            var qty_td = $("<td></td>").text(item.qty);
        }
        qty_td.prepend(` <span class="badge badge-primary" target="reduce" data-id="` + id + `">&minus;</span>  `);
        qty_td.append(` <span class="badge badge-primary" target="increase" data-id="` + id + `">&plus;</span>`);
        tr.append(qty_td);


        let total_td = $("<td></td>").text("$ " + item.total.toLocaleString("en-US"));
        tr.append(total_td);

        let delete_td = $("<td></td>").text(`Delete`);
        delete_td.attr("data-id", id);
        delete_td.attr("deleter", "delete");
        delete_td.addClass("btn btn-outline-danger");
        delete_td.attr("style", "font-size: 20px;text-align: center;border: none;");
        tr.append(delete_td);

        tbody.append(tr);
           sub_total += item.total;
       cartitem = cartitem + Number(cart[id].qty);
	

   
    }
	
	$("[target='reduce']").click(function() {
        let value = $(this).attr("data-id");
        qtychanger(value, "reduce");
    });

    $("[target='increase']").click(function() {
        let value = $(this).attr("data-id");
        qtychanger(value, "increase");
    });
	
	$("[deleter='delete']").click(function() {
        let value = $(this).attr("data-id");
        delete cart[value];
        localStorage.setItem("ishop", JSON.stringify(cart));
     drawcart();
    });
  let total=sub_total+10;
   $("#stotal").text("$ " + sub_total.toLocaleString("en-US"));
   
      $("#Total").text("$ " + total.toLocaleString("en-US"));
}	
    function qtychanger(value, type) {
        (type == "increase") ? cart[value].qty++ : cart[value].qty--;
        cart[value].total = cart[value].price * cart[value].qty;
        if (cart[value].qty == 0) {
            delete cart[value];
        }
        localStorage.setItem("ishop", JSON.stringify(cart));
       drawcart();
    }