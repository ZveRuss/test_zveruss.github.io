var Matrix = function () {
    this.rows = 3,
        this.columns = 3,
        this.name,
        this.values = {
            "1_1": 0,
            "1_2": 2,
            "1_3": 23,
            "2_1": 45,
            "2_2": 43,
            "2_3": 5,
            "3_1": 4,
            "3_2": 32,
            "3_3": 23
        },
        this.getName = function () {
            return this.name;
        }
    this.getRows = function () {
        return this.rows;
    }
    this.getColumns = function () {
        return this.columns;
    }
    this.getValues = function () {
        return this.values;
    }
    this.setValues = function (values) {
        this.values = values;
    }
    this.addColumn = function () {
        this.columns = this.columns + 1;
        displayAllNewMatrix();
    }
    this.addRow = function () {
        this.rows = this.rows + 1;
        displayAllNewMatrix();
    }
    this.deleteColumn = function () {
        this.columns = this.columns - 1;
        displayAllNewMatrix();
    }
    this.deleteRow = function () {
        this.rows = this.rows - 1;
        displayAllNewMatrix();
    }

}

var A = new Matrix();
A.name = "a";
var B = new Matrix();
B.name = "b";
var C = new Matrix();
C.name = "c";

var doCalculation = function () {
    inputMatrix(A);
    inputMatrix(B);
    for (var arow = 1; arow <= A.rows; arow++) {
        for (var bcol = 1; bcol <= B.columns; bcol++) {
            for (var cell = 1; cell <= B.rows; cell++) {
                clearC(arow, bcol, cell);
            }
        }
    }
    for (var arow = 1; arow <= A.rows; arow++) {
        for (var bcol = 1; bcol <= B.columns; bcol++) {
            for (var cell = 1; cell <= B.rows; cell++) {
                setElementsOfC(arow, bcol, cell);
            }
        }
    }
    removeOldMatrix(C);
    displayAllMatrix();
}

var setElementsOfC = function (arow, bcol, cell) {
    C.values[arow + "_" + bcol] += A.values[arow + "_" + cell] * B.values[cell + "_" + bcol];
}

var clearC = function (arow, bcol, cell) {
    C.values[arow + "_" + bcol] = 0;
}


var inputMatrix = function (matrix) {
    for (var row = 1; row <= matrix.rows; row++) {
        for (var col = 1; col <= matrix.columns; col++) {
            matrix.values[row + "_" + col] = document.querySelector("#" + matrix.getName() + row + "_" + col + " input").value;
            console.log(matrix.values[row + "_" + col]);
        }
    }
}


var addMatrix = function (matrix) {
    var table = document.createElement("table");
    table.setAttribute("class", "matrix");
    table.setAttribute("id", matrix.getName() + "Matrix");
    document.getElementById("AllMatrix").appendChild(table);
}
var removeOldMatrix = function (matrix) {
    if (document.getElementById(matrix.getName() + "Matrix")) {
        document.getElementById("AllMatrix").removeChild(document.getElementById(matrix.getName() + "Matrix"));
    }
}

var displayMatrix = function (matrix) {
    removeOldMatrix(matrix);
    addMatrix(matrix);
    for (var row = 1; row <= matrix.rows; row++) {
        setRow(matrix, row);
    }
}

var setRow = function (matrix, row) {
    var Row = document.createElement("tr");
    Row.setAttribute("id", matrix.getName() + "Row" + row);
    for (var col = 1; col <= matrix.columns; col++) {
        Row.appendChild(setCell(matrix, row, col));
    }
    document.getElementById(matrix.getName() + "Matrix").appendChild(Row);
}

var setCell = function (matrix, row, col) {
    var Element = document.createElement("td");
    Element.setAttribute("id", matrix.getName() + row + "_" + col);
    if (matrix.getName() != "c") {
        Element.innerHTML = "<input type='text' value='" + matrix.values[row + "_" + col] + "' onfocus='changeBackgroundOfOperations(1)' onblur='changeBackgroundOfOperations(2)'>";
    } else {
        Element.innerHTML = "<input type='text' value='" + matrix.values[row + "_" + col] + "' disabled>";
    }
    return Element;
}

var displayNewMatrix = function (matrix) {
    removeOldMatrix(matrix);
    addMatrix(matrix);
    for (var row = 1; row <= matrix.rows; row++) {
        setNewRow(matrix, row);
    }
}

var setNewRow = function (matrix, row) {
    var Row = document.createElement("tr");
    Row.setAttribute("id", matrix.getName() + "Row" + row);
    for (var col = 1; col <= matrix.columns; col++) {
        Row.appendChild(setNewCell(matrix, row, col));
    }
    document.getElementById(matrix.getName() + "Matrix").appendChild(Row);
}

var setNewCell = function (matrix, row, col) {
    var Element = document.createElement("td");
    Element.setAttribute("id", matrix.getName() + row + "_" + col);
    if (matrix.getName() != "c") {
        Element.innerHTML = "<input type='text' placeholder='" + matrix.getName() + row + "," + col + "' onfocus='changeBackgroundOfOperations(1)' onblur='changeBackgroundOfOperations(2)'>";
    } else {
        Element.innerHTML = "<input type='text' placeholder='" + matrix.getName() + row + "," + col + "' disabled>";
    }
    return Element;
}

var displayAllNewMatrix = function () {
    displayNewMatrix(C);
    displayNewMatrix(A);
    displayNewMatrix(B);
}






var addRow = function () {
    if (document.getElementById("inA").checked) {
        A.addRow();
        C.addRow();
    } else if (document.getElementById("inB").checked) {
        B.addRow();
    }
    validateMatrix();

}

var addColumn = function () {
    if (document.getElementById("inA").checked) {
        A.addColumn();
    } else if (document.getElementById("inB").checked) {
        B.addColumn();
        C.addColumn();
    }
    validateMatrix();
}

var deleteRow = function () {
    if (document.getElementById("inA").checked) {
        A.deleteRow();
        C.deleteRow();
    } else if (document.getElementById("inB").checked) {
        B.deleteRow();
    }
    validateMatrix();

}

var deleteColumn = function () {
    if (document.getElementById("inA").checked) {
        A.deleteColumn();
    } else if (document.getElementById("inB").checked) {
        B.deleteColumn();
        C.deleteColumn();
    }
    validateMatrix();
}


var displayAllMatrix = function () {
    displayMatrix(C);
    displayMatrix(A);
    displayMatrix(B);
}

var validateMatrix = function () {
    {
        if (A.columns != B.rows) {
            document.getElementById("multiply").innerHTML = "<input id='calculate' type='button' value='Умножить матрицы' onclick = 'doCalculation()' disabled>"
            changeBackgroundOfOperations(3);
            document.getElementById("TextOfError").style.visibility = "visible";
        } else {
            document.getElementById("multiply").innerHTML = "<input id='calculate' type='button' value='Умножить матрицы' onclick = 'doCalculation()'  >"
            changeBackgroundOfOperations(2);
            document.getElementById("TextOfError").style.visibility = "hidden";

        }
    }
}

var clearOneMatrix = function (matrix) {
    removeOldMatrix(matrix);
    addMatrix(matrix);
    for (var row = 1; row <= matrix.rows; row++) {
        setEmptyRow(matrix, row);
    }
}

var setEmptyRow = function (matrix, row) {
    var Row = document.createElement("tr");
    Row.setAttribute("id", matrix.getName() + "Row" + row);
    for (var col = 1; col <= matrix.columns; col++) {
        Row.appendChild(setEmptyCell(matrix, row, col));
    }
    document.getElementById(matrix.getName() + "Matrix").appendChild(Row);
}

var setEmptyCell = function (matrix, row, col) {
    var Element = document.createElement("td");
    Element.setAttribute("id", matrix.getName() + row + "_" + col);
    if (matrix.getName() != "c") {
        Element.innerHTML = "<input type='text' placeholder='" + matrix.getName() + row + "," + col + "' onfocus='changeBackgroundOfOperations(1)' onblur='changeBackgroundOfOperations(2)'>";
    } else {
        Element.innerHTML = "<input type='text' placeholder='" + matrix.getName() + row + "," + col + "' disabled>";
    }
    return Element;
}

var swapMatrix = function () {
    inputMatrix(A);
    inputMatrix(B);
    var TempMatrix = new Matrix;
    TempMatrix.name = A.getName();
    TempMatrix.rows = A.getRows();
    TempMatrix.columns = A.getColumns();
    TempMatrix.values = A.values;

    A.name = B.getName();
    A.rows = B.getRows();
    A.columns = B.getColumns();
    A.values = B.getValues();

    B.name = TempMatrix.getName();
    B.rows = TempMatrix.getRows();
    B.columns = TempMatrix.getColumns();
    B.values = TempMatrix.getValues();

    displayAllMatrix();
}

var clearMatrix = function () {
    clearOneMatrix(C);
    clearOneMatrix(A);
    clearOneMatrix(B);
}

var changeBackgroundOfOperations = function (mode) {
    switch (mode) {
    case 1: //Фон при изменении значений
        document.querySelector("#operations").style.backgroundColor = "#0099FF";
        break;
    case 2: //Фон по умолчанию
        document.querySelector("#operations").style.backgroundColor = "darkgray";
        break;
    case 3: //Фон при некорректных размерностях матриц
        document.querySelector("#operations").style.backgroundColor = "#FF99CC";
        break;
    default:
        document.querySelector("#operations").style.backgroundColor = "darkgray";
        break;
    }
}


var setPlaceHolders = function () {
    var input = document.getElementsByTagName('input');
    var cls = "placeholdr";

    if (input) {
        for (var i = 0; i < input.length; i++) {
            var t = input[i];
            var txt = t.getAttribute("placeholder");

            if (txt.length > 0) {
                t.className = t.value.length == 0 ? t.className + " " + cls : t.className;
                t.value = t.value.length > 0 ? t.value : txt;

                t.onfocus = function () {
                    this.className = this.className.replace(cls);
                    this.value = this.value == this.getAttribute("placeholder") ? "" : this.value;
                }

                t.onblur = function () {
                    if (this.value.length == 0) {
                        this.value = this.getAttribute("placeholder");
                        this.className = this.className + " " + cls;
                    }
                }
            }
        }
    }
}