var A = {
    Rows: 3,
    Columns: 3,
    getElementOfMatrix: function(row,column){
        return this["a"+row + "," + column];
},
    addRowInA: function () {
        this.Rows++;
        for (var i = 0; i < this.Columns; i++) {
            this["a" + this.Rows + "," + (i+1)] = "a" + this.Rows + "," + (i+1);
            var newElement = document.createElement("td");
            var Column = document.getElementById("ARow"+this.Columns);
            newElement.innerHTML = "<input id='a" + this.Rows + "," + (i+1) + "'type='text' onchange='setElementOfMatrix(this.value,'a','1',',','2')" + ">";
            Column.appendChild(newElement);
        }
    }
}
var B = {
    Rows: 3,
    Columns: 3,
    getElementOfMatrix: function(row,column){
        return this["b"+row + "," + column];
},
    addRowInB: function () {
        this.Rows++;
        for (var i = 0; i < this.Columns; i++) {
            this["b" + this.Rows + "," + (i+1)] = "b" + this.Rows + "," + (i+1);
            var newElement = document.createElement("td");
            var Column = document.getElementById("BRow"+this.Columns);
            newElement.innerHTML = "<input id='b" + this.Rows + "," + (i+1) + "'type='text' onchange='setElementOfMatrix(this.value,'b','1',',','2')" + ">";
            Column.appendChild(newElement);
        }
    }
}

function setElementOfMatrix(value, matrix, row, column) {
    switch (matrix) {
    case "a":
        A["a" + row + "," +column] = +value;
        break;
    case "b":
        B["b" + row + "," + column] = +value;
        break;
    default:
        break;
    }
};

function doCalculation() {
    
    if(A.Rows === B.Columns)
    {
        var CElement = 0;
        alert(A.getElementOfMatrix(1,1));
        for (var i = 0;i<A.Rows;i++){
            for (var j = 0;j<B.Columns;j++)
            {
                document.getElementById("c" + i + "," + j) = A["a" + i + "," + j] * B["b" + j + "," + i];       
            }
        }
    }//сделать сообщение о том, что умножение невозможно
};

function addRow() {
    if (document.getElementById("InA").checked) {
        A.addRowInA();
    } else if (document.getElementById("InB").checked) {
        B.addRowInB();
    }
};

function addColumn() {
    if (document.getElementById("InA").value) {
        A.addColumnInA;
    } else if (document.getElementById("InB").value) {
        B.addColumnInB;
    }
};


function deleteRow() {

};