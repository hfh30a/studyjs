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
    insertField(div, id);
}

function insertField(div, id) {
    div.innerHTML += "<label>名前 : </label>";
    div.innerHTML += '<span class="name">' + document.getElementById("username").value + "</span>";
    div.innerHTML += "<label> 年齢 : </label>";
    div.innerHTML += '<span class="age">' + document.getElementById("age").value + "</span>";
    if (document.getElementById("remark").value !== "") {
        div.innerHTML += "<label> 備考 : </label>";
        div.innerHTML += '<span class="remark">' + document.getElementById("remark").value + "</span>";
    }
    div.innerHTML += '<input type="button" name="button" value="編集" onclick="editData(' + "'" + id + "'" + ');">';
    div.innerHTML += '<input type="button" name="button" value="削除" onclick="deleteData(' + "'" + id + "'" + ');">';
}

function editData(id) {
    alert("編集！");
}

function deleteData(id) {
    const result = window.confirm('削除してもよろしいですか？');
    if (!result) return;
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
