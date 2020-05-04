function addData() {
    const error = validateField();
    if (error !== "") {
        alert(error);
        return;
    }
    createNode();
}

function resetData() {
    document.getElementById('username').value = "";
    document.getElementById('age').value = "";
    document.getElementById('remark').value = "";
}

function validateField() {
    let error = "";
    const FIXED_MESSAGE = "は必須項目です"

    if (document.getElementById('username').value === "") {
        error += "名前" + FIXED_MESSAGE;
    }
    if (document.getElementById('age').value === "") {
        if (error !== "") error += "\n";
        error += "年齢" + FIXED_MESSAGE;
    }

    return error;
}

function createNode() {
    const data = document.getElementById("data");
    const div = document.createElement("div");
    const id = "data" + getFieldId(data);
    div.setAttribute("id", id);
    data.appendChild(div);
    insertField(div);
    setButtonField(div,id);
}

function insertField(div) {
    let label = document.createElement("label");
    label.innerText = "名前 : "
    div.appendChild(label);
    let span = document.createElement("span");
    span.innerText = document.getElementById("username").value;
    span.setAttribute("class", "name");
    div.appendChild(span);
    label = document.createElement("label");
    label.innerText = " 年齢 : "
    div.appendChild(label);
    span = document.createElement("span");
    span.innerText = document.getElementById("age").value;
    span.setAttribute("class", "age");
    div.appendChild(span);
    if(document.getElementById("remark").value !== "") {
        label = document.createElement("label");
        label.innerText = " 備考 : "
        div.appendChild(label);
        span = document.createElement("span");
        span.innerText = document.getElementById("remark").value;
        span.setAttribute("class", "remark");
        div.appendChild(span);
    }
}

function setButtonField(div,id) {
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.name = "button";
    input.value = "編集";
    input.setAttribute('onclick', "editData('" + id + "');");
    div.appendChild(input);
    input = document.createElement("input");
    input.setAttribute("type", "button");
    input.name = "button";
    input.value = "削除";
    input.setAttribute('onclick', "deleteData('" + id + "');");
    div.appendChild(input);
}

function editData(id) {
    alert("編集！");
}

function deleteData(id) {
    const result = window.confirm('削除してもよろしいですか？');
    if(!result) return;
    document.getElementById(id).remove();
}

function getFieldId(data) {
    const list = [];
    for (let i = 0; i < data.childNodes.length; i++) {
        const id = Number(('' + data.childNodes[i].id).replace("data", ''));
        list.push(id);
    }
    let result = 1;
    while (list.includes(result)) {
        result++;
    }
    return result;
}
