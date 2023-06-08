// grABBING THE BUTTION FROM CARDS AND SETTING VALUES
const CompanyA = document.getElementById("CompanyA");
const CompanyB = document.getElementById("CompanyB");
const CompanyC = document.getElementById("CompanyC");
CompanyA.value = "CompanyA";
CompanyA.onclick = getProduct;
CompanyB.value = "CompanyB";
CompanyB.onclick = getProduct;
CompanyC.value = "CompanyC";
CompanyC.onclick = getProduct;


// delete product functions

function deleteProduct(e){
    const form = document.getElementById("forms");
    //form.innerHTML = null;
    const uid = e.target.value;
    const name = document.getElementById("delete");
    const y = name.value;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE','/product')
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify({id: uid, name: y}));
    xhr.send(JSON.stringify({id: uid, name: y}));
    document.getElementById("forms").innerHTML = null;
}


function formdelete(e){
    const uid = e.target.value;
    const form = document.getElementById("forms");
    //form.innerHTML = null;
    form.setAttribute("class", "form-group")
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "delete");
    //name.setAttribute("placeholder", "name");
    const s = document.createElement("button");
    s.value = uid;
    s.innerText = "Submit";
    form.appendChild(name);
    form.appendChild(s);
    s.onclick = deleteProduct; 
}

// end of delete product functions

//add product functions
function addbackendprod(e){
    const uid = e.target.value;
    const name = document.getElementById("NC");
    const quant = document.getElementById("QC");
    const q = quant.value;
    const y = name.value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST','/product')
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify({id: uid, name: y, quantity: q}));
    xhr.send(JSON.stringify({id: uid, name: y, quantity: q}));
    document.getElementById("forms").innerHTML = null;
    document.getElementById("rows").innerHTML = null;
}
function addProduct(e){
    const uid = e.target.value;
    console.log(uid);
    const form = document.getElementById("forms");
    form.innerHTML = null;
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "NC");
    name.setAttribute("placeholder", "name");
    const quant = document.createElement("input");
    quant.setAttribute("type", "number");
    quant.setAttribute("id", "QC");
    quant.setAttribute("placeholder", "quantity");
    const s = document.createElement("button");
    s.setAttribute("id", "send")
    s.value = uid;
    s.innerText = "Submit";
    form.appendChild(name);
    form.appendChild(quant);
    form.appendChild(s);
    s.onclick = addbackendprod; 
}
//end of delete product functions

// update quantity functions
function updateQuantity(e){
    const uid = e.target.value;
    const name = document.getElementById("UN");
    const quant = document.getElementById("UQ");
    const q = quant.value;
    const y = name.value;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT','/product')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({id: uid, name: y, quantity: q}));
    const form = document.getElementById("forms");
    form.innerHTML = null;
    // document.getElementById("rows").innerHTML = null;


}
function quantity(e){
    const uid = e.target.value;
    const form = document.getElementById("forms");
    form.innerHTML = null;
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "UN");
    const quant = document.createElement("input");
    quant.setAttribute("type", "number");
    quant.setAttribute("id", "UQ");
    const s = document.createElement("button");
    s.setAttribute("id", "update")
    s.value = uid;
    s.innerText = "Submit";
    form.appendChild(name);
    form.appendChild(quant);
    form.appendChild(s);
    s.onclick = updateQuantity; 
}




// end of update product functions

// prints warehouses and buttons to do CRUD functions
function getProduct(e){
    const name = e.target.value;
    console.log(name);
    const table = document.getElementById("rows");
    table.innerHTML = null;
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
    y = document.getElementById('getcontainer');
    y.innerHTML = null;
    const company = JSON.parse(xhr.response);
    if(xhr.status === 200){     
        for(x of company.units){
            const div = document.createElement('div');
            div.setAttribute("class", "text-capitalize font-weight-bold")
            div.innerText = `${x.name}`
            const button = document.createElement('button');
            const div2 = document.createElement("button");
            div2.setAttribute("class", "invisible");
            const div3 = document.createElement("button");
            const div4 = document.createElement("button");
            div4.setAttribute("class", "invisible");
            div3.setAttribute("class", "invisible");
            button.setAttribute("class", "btn btn-primary mr-3");
            const button2 = document.createElement('button');
            button2.setAttribute("class", "btn btn-primary mr-3");
            const button3 = document.createElement('button');
            button3.setAttribute("class", "btn btn-primary mr-3");
            const button4 = document.createElement('button');
            button4.setAttribute("class", "btn btn-primary mr-3");
            button.value = x._id;
            button2.value = x._id;
            button3.value = x._id;
            button4.value = x._id;
            button.innerText = "Add Product"
            button2.innerText = "Delete Product";
            button3.innerText = "Update Quantity";
            button4.innerText = "Display Products";
            div.append(button);
            div.append(div2);
            div.appendChild(button2);
            div.append(div3);
            div.appendChild(button3);
            div.appendChild(div4);
            div.appendChild(button4);
            y.append(div);
            button.onclick= addProduct;
            button2.onclick = formdelete; 
            button3.onclick = quantity;
            button4.onclick = populatedata;
                 }
            }
            else{
              Console.log("err");
             }
    }
    xhr.open('GET', `/warehouse/${name}`);
    xhr.send();
}

// dynamically create table with data from slected warehouse
function populatedata(e){
    const uid = e.target.value;
    const form = document.getElementById("forms");
    form.innerHTML = null;
    console.log(uid);
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
    const company = JSON.parse(xhr.response);
    const table = document.getElementById("rows");
    table.innerHTML = null;
    console.log(company);
    y = document.getElementById('getcontainer');
    y.innerHTML = null;
    if(xhr.status === 200){ 
    for(var y=0; y < company.length; y++){
        const newR = document.createElement('tr');
        const newC = document.createElement('td');
        newC.textContent = company[y].name;
        newR.appendChild(newC);
        const newC1 = document.createElement('td');
        newC1.textContent = company[y].quantity;
        newR.appendChild(newC1);
        table.appendChild(newR);

    }

    }else{
  Console.log("err");
 }
    }
xhr.open('GET', `/product/${uid}`);
xhr.send();

}
