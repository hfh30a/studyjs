function addData() {
    const error = validateField();
    if (error !== "") {
        alert(error);
        return;
    }
    createNode();
}

function resetData() {
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('remark').value = "";
    const addButton = document.getElementById("add-button");
    addButton.setAttribute("value", "追加");
    addButton.setAttribute("onclick", "addData();");
    addButton.setAttribute("class", "addData();");
}

function validateField() {
    let error = "";
    const FIXED_MESSAGE = "は必須項目です"
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name === "") {
        error += "名前" + FIXED_MESSAGE;
    }
    if (age === "") {
        if (error !== "") error += "\n";
        error += "年齢" + FIXED_MESSAGE;
    }

    if(error !== "") return error;

    if(!Number.isInteger(Number(age))){
        error += "年齢には整数を入力してください";
        return error;
    }
    if(age < 0) {
        error += "年齢には有効な数値を入力してください";
        return error;
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
    div.innerHTML += '<span class="name">' + document.getElementById("name").value + "</span>";
    div.innerHTML += "<label> 年齢 : </label>";
    div.innerHTML += '<span class="age">' + document.getElementById("age").value + "</span>";
    if (document.getElementById("remark").value !== "") {
        div.innerHTML += '<label class="remark-label"> 備考 : </label>';
        div.innerHTML += '<span class="remark">' + document.getElementById("remark").value + "</span>";
    }
    div.innerHTML += '<input type="button" class="data-button-edit" name="button" value="編集" onclick="editData(' + "'" + id + "'" + ');">';
    div.innerHTML += '<input type="button" class="data-button-delete" name="button" value="削除" onclick="deleteData(' + "'" + id + "'" + ');">';
}

function editData(id) {
    const data = document.getElementById(id);
    document.getElementById("name").value = data.getElementsByClassName("name")[0].innerHTML;
    document.getElementById("age").value = data.getElementsByClassName("age")[0].innerHTML;
    if (data.getElementsByClassName("remark")[0] !== undefined) {
        document.getElementById("remark").value = data.getElementsByClassName("remark")[0].innerHTML;
    } else {
        document.getElementById("remark").value = "";
    }
    const addButton = document.getElementById("add-button");
    addButton.setAttribute("value", "編集");
    addButton.setAttribute("onclick", 'putData("' + id + '");');
    addButton.setAttribute("class", id);
}

function putData(id) {
    const error = validateField();
    if (error !== "") {
        alert(error);
        return;
    }

    const data = document.getElementById(id);
    data.getElementsByClassName("name")[0].innerHTML = document.getElementById("name").value;
    data.getElementsByClassName("age")[0].innerHTML = document.getElementById("age").value;
    if (data.getElementsByClassName("remark")[0] === undefined) {
        if (document.getElementById("remark").value !== "") {
            data.getElementsByClassName("data-button-edit")[0].remove();
            data.getElementsByClassName("data-button-delete")[0].remove();
            data.innerHTML += '<label class="remark-label"> 備考 : </label>';
            data.innerHTML += '<span class="remark">' + document.getElementById("remark").value + "</span>";
            data.innerHTML += '<input type="button" class="data-button-edit" name="button" value="編集" onclick="editData(' + "'" + id + "'" + ');">';
            data.innerHTML += '<input type="button" class="data-button-delete" name="button" value="削除" onclick="deleteData(' + "'" + id + "'" + ');">';
        }
    } else {
        if (document.getElementById("remark").value === "") {
            data.getElementsByClassName("remark-label")[0].remove();
            data.getElementsByClassName("remark")[0].remove();
        } else {
            data.getElementsByClassName("remark")[0].innerHTML = document.getElementById("remark").value;
        }
    }

    resetData();
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
