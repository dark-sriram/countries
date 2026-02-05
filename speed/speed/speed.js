let i = 0;
var text="";
var defaultSpeed=100;
let intervalid=null;

function thisText() {
    i = 0; 
    document.getElementById("home").innerHTML=""; 
    text=document.getElementById("input").value;
    console.log(text);
    if(text){
        type();
    }else{
        console.log("Input is empty");
    }
}

function increment(e){
    const currentValue=e.target.value;
    if(currentValue==1){
        defaultSpeed=200;
    }else if(currentValue==2){
        defaultSpeed=100;
    }else if(currentValue==3){
        defaultSpeed=50;
    }else if(currentValue==4){
        defaultSpeed=30;
    }else if(currentValue==5){
        defaultSpeed=10;
    }
    console.log(defaultSpeed);
    type();
}

document.getElementById("number").addEventListener("change",increment);

function type(){
        clearInterval(intervalid);
        intervalid=setInterval(()=>{
            document.getElementById("home").innerHTML += text.charAt(i);
            i++;
            if(i==text.length){
                document.getElementById("home").innerHTML="";
                i=0;
            }
        }, defaultSpeed);
}

