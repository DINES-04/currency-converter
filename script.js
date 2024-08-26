let select=document.querySelectorAll('.currency');
// select 2d array
console.log(select);
let btn= document.getElementById('im2');
let btn2= document.getElementById('im');
let input= document.getElementById('input');
let result=document.getElementById('result');
console.log(result)
fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res))

function displayDropDown(res){
    // convert to array
    console.log(Object.entries(res));
    // 2d array
    let curr=Object.entries(res);
    for(let i=0;i<curr.length;i++){
        console.log(curr[i][0]);
        let opt =`<option value="${curr[i][0]}"> ${curr[i][0]} - ${curr[i][1]} </option>`;
        select[0].innerHTML += opt;
        select[1].innerHTML += opt;
    }
}
btn.addEventListener('click',()=>{
     // find value select and input
     let curr1=select[0].value;
     let curr2= select[1].value;
     let inputval= input.value;
     if(curr1==curr2){
         result.value="choose diff currency";
     }else{
         convert(curr1,curr2,inputval);
     } 
});

/*
    automatically convert when it change happen

select.forEach(dropdown => dropdown.addEventListener('change', autoConvert));
input.addEventListener('input', autoConvert);

function autoConvert() {
    let curr1 = select[0].value;
    let curr2 = select[1].value;
    let inputval = input.value;
    if (curr1 === curr2) {
        result.value = "Choose different currencies";
    } else {
        convert(curr1, curr2, inputval);
    }
}*/


function convert(curr1,curr2,inputval){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputval}&from=${curr1}&to=${curr2}`)
        .then(resp => resp.json())
        .then((data) => {
            result.value=Object.values(data.rates)[0];
  });
}

btn2.addEventListener('click',()=>{
    let curr1=select[0].value;
    let curr2= select[1].value;
    let temp=curr1;
    select[0].value=curr2;
    select[1].value=temp;
    // autoConvert();
});