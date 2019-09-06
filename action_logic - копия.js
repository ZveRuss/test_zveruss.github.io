var Matrix = function(){
    this.Rows = 3,
    this.Columns = 3,
    this.Name = "DefaultName",
    this.values = {
        "1_1": 0,
        "1_2": 0,
        "1_3": 0,
        "2_1": 0,
        "2_2": 0,
        "2_3": 0,
        "3_1": 0,
        "3_2": 0,
        "3_3": 0  
    },
    this.getName = function(){
        return this.Name;
    }
    this.addColumn = function(){
        this.Rows = this.Rows + 1;
        removeOldMatrix(this);
        displayAllMatrix();
    }
    this.addRow = function(){
       this.Columns = this.Columns + 1;
       removeOldMatrix(this);
       displayAllMatrix();
    }
}

var A = new Matrix();
A.Name = "a";
var B = new Matrix();
B.Name = "b";
var C = new Matrix();
C.Name = "c";
//
//C.Rows = A.Rows;
//C.Columns = B.Rows;

var doCalculation = function(){
    for (var arow=1;arow<=A.Rows;arow++){
        for(var bcol=1;bcol<=B.Columns;bcol++){
            for(var cell = 1;cell<=B.Rows;cell++){
                setElementsOfC(arow,bcol,cell);
                //console.log(C.values[arow+"_"+bcol]);
            }
        }
    }
    removeOldMatrix(C);
    displayAllMatrix();
}

var setElementsOfC = function(arow,bcol,cell){
    C.values[arow+"_"+bcol] += A.values[arow+"_"+cell] * B.values[cell+"_"+bcol];
}


var inputMatrix = function(){
    for (var arow=1;arow<=A.Rows;arow++){
        for(var bcol=1;bcol<=B.Columns;bcol++){
            A.values[arow+"_"+bcol] = document.querySelector("#"+"a"+arow+"_"+bcol+" input").value;
            B.values[arow+"_"+bcol] = document.querySelector("#"+"b"+arow+"_"+bcol+" input").value;
        }
    }
    doCalculation();
 }


var addMatrix = function(matrix){
    var table = document.createElement("table");
    table.setAttribute("id", matrix.getName() + "Matrix");
    document.getElementById("matrix").appendChild(table);
}
var removeOldMatrix = function(matrix){
    if (document.getElementById(matrix.getName()+"Matrix")){
    document.getElementById("matrix").removeChild(document.getElementById(matrix.getName()+"Matrix"));
    }
}

var displayMatrix = function(matrix){
    removeOldMatrix(matrix);
    addMatrix(matrix);
    for(var row=1;row<=matrix.Rows;row++)
    {
        setRow(matrix,row);
    }
}

var setRow = function(matrix,row) {
    var Row = document.createElement("tr");
    Row.setAttribute("id", matrix.getName() + "Row"+row);
    for(var col=1;col<=matrix.Columns;col++){
       Row.appendChild(setCell(matrix, row, col));
    }
    document.getElementById(matrix.getName()+"Matrix").appendChild(Row); 
}

var setCell = function(matrix,row, col) {
    var Element = document.createElement("td");
    Element.setAttribute("id",matrix.getName() + row+"_"+col);
    if (matrix.getName() != "c")
    {
        Element.innerHTML = "<input type='text' value='"+matrix.values[row + "_"+col]+"'>";
    }
    else
    {
        Element.innerHTML = "<input type='text' value='"+matrix.values[row + "_"+col]+"' disabled='dis'>";
    }
        return Element;
}

var addColumn = function(){
    if(document.getElementById("inA").checked){
        A.addColumn();
    }
    else if(document.getElementById("inB").checked){
        B.addColumn();
        C.addColumn();
    }
    validateMatrix();
        
}

var addRow = function(){
    if(document.getElementById("inA").checked){
        A.addRow();
        C.addRow();
    }
    else if(document.getElementById("inB").checked){
        B.addRow();
    }
    validateMatrix();
        
}

var displayAllMatrix = function(){
    displayMatrix(C);
    displayMatrix(A);
    displayMatrix(B);
}

var validateMatrix = function(){
    if(A.Columns != B.Rows)
    {
        var TextError = document.createTextNode("Такие матрицы нельзя перемножить, так как количество столбцов матрицы A не равно количеству строк матрицы B");
        document.getElementById("ErrorMessage").appendChild(TextError);
    }
}

var clearOneMatrix = function(matrix){
 removeOldMatrix(matrix);
    addMatrix(matrix);
    for(var row=1;row<=matrix.Rows;row++)
    {
        setEmptyRow(matrix,row);
    }
}

var setEmptyRow = function(matrix,row) {
    var Row = document.createElement("tr");
    Row.setAttribute("id", matrix.getName() + "Row"+row);
    for(var col=1;col<=matrix.Columns;col++){
       Row.appendChild(setEmptyCell(matrix, row, col));
    }
    document.getElementById(matrix.getName()+"Matrix").appendChild(Row); 
}

var setEmptyCell = function(matrix,row, col) {
    var Element = document.createElement("td");
    Element.setAttribute("id",matrix.getName() + row+"_"+col);
    Element.innerHTML = "<input type='text' value=''>";
    return Element;
}

var clearMatrix = function(){
    clearOneMatrix(C);
    clearOneMatrix(A);
    clearOneMatrix(B);
}

displayAllMatrix();


