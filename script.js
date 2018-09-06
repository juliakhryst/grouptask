const MagNum = {
    zero: 0,
    one: 1, 
    half: 0.5,
    two: 2,
    topLimit: 40000
}

function generate_mosaic(cols, rows) {
    let i, ncol, colspan, html = '';
    if (cols * rows > MagNum.topLimit){
        console.error('You have exceeded amount of possible elements');
        return '';
    }
    html += '<table>';
  
    let divToDrawIn = document.getElementById('draw-here');

    for (let i = 0; i < rows; i += MagNum.one) {
        html += '<tr>';
        ncol = MagNum.zero;
        while (ncol < cols) {
            let trans = ncol / cols * MagNum.half + i / rows * MagNum.half;
            colspan = Math.floor(Math.random() * MagNum.two) + MagNum.one;
  
            if (ncol === cols - MagNum.one) {
                colspan = MagNum.one;
            }
  
            ncol += colspan;
  
            html += `<td colspan = ${colspan} style = 'width: 
            ${divToDrawIn.offsetWidth / cols}px; 
            height: ${divToDrawIn.offsetWidth / rows}px;'></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

function generateCallback() {
    document.getElementById('draw-here').innerHTML = 
    generate_mosaic(checkAmountOfCols(), checkAmountOfRows());
}

document.getElementById('generate-btn').addEventListener('click', generateCallback);

let selectedTd;

let table = document.querySelector('#draw-here');

function checkBorderColor() {
    let colorBrd = document.getElementById('bg-color');
    return colorBrd.value;
}

function checkBlockColor() {
    let colorBtn = document.getElementById('block-color');
    return colorBtn.value;
}

function checkAmountOfRows() {
    let amount = document.querySelector('#rows').value;    
    return amount;        
}

function checkAmountOfCols() {
    let amount = document.querySelector('#cols').value;
    return amount;       
}

table.onclick = function(event) {
    let target = event.target; 
    if (target.tagName !== 'TD') {
        return;
    } 
    highlight(target); 
};

function highlight(node) {
    if (selectedTd) {
        selectedTd.setAttribute('style', `background: ${checkBlockColor()}`);
    }
    selectedTd = node;
    selectedTd.setAttribute('style', `background: ${checkBlockColor()}`);
}

let colorBrd = document.getElementById('bg-color');
colorBrd.addEventListener('change', ggg);

function ggg() {
    let tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++){
        tds[i].style.borderColor = `${checkBorderColor()}`;
    }
}