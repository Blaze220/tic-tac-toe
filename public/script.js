let msgBox = document.getElementById("messages");
let msgText = document.getElementById("msg");
let sendBtn = document.getElementById("send");
let socket = io();
let con = document.querySelector(".container")
let users = document.querySelector(".users")
let valueArray = []
let id;
let flag = true

for(let i= 0; i<9;i++){
    let div = document.createElement("div")
    div.classList.add("block")
    con.append(div)
}
let divs = document.querySelectorAll(".block")

const userEl = document.createElement("p")
userEl.innerHTML = "turn : black"
users.appendChild(userEl)

socket.on("new user",(userids)=>{


    for(let i=0;i<divs.length;i++){
        if(divs[i].style.backgroundColor == "black" && divs[i].style.backgroundColor == "red" ){
            
        }else{
            divs[i].addEventListener("click",function s(){
                if(flag == true){
                    console.log(userids)
                    socket.emit("turn",i+1)  
                    flag = false
                    console.log(flag)
                }
                      
    
            },{ once: true })
        }
        
    }
})

socket.on("turnRes",(data)=>{
    socket.on("Play",data=>{
        if(data == "turn"){
            flag = true
        }
    })
        if(data[1] == "black"){
            divs[data[0]-1].style.backgroundColor = "black"
            divs[data[0]-1].style.pointerEvents = "none"
            userEl.textContent = "turn : red"
        }else if (data[1] == "red"){
            divs[data[0]-1].style.backgroundColor = "red"
            divs[data[0]-1].style.pointerEvents = "none"
            userEl.textContent = "turn : black"
        }
         let res = WIN()
         if(res.val == true){
            alert("Win :" + res.win)
         }
})


       function WIN(){
        let items = []
            for(let i=0;i<divs.length;++i){
                items.push(divs[i].style.backgroundColor)

            }
console.log(items)
if(items[0] == "x" && items[1] == 'x' && items[2] == 'x'){
    console.log("win")
}
        if ( items[0] == "black" && items[1] == "black" && items[2] == "black" ||
		 items[3] == "black" && items[4] == "black" && items[5] == "black" ||
		 items[6] == "black" && items[7] == "black" && items[8] == "black" ||
		 items[0] == "black" && items[3] == "black" && items[6] == "black" ||
		 items[1] == "black" && items[4] == "black" && items[7] == "black" ||
		 items[2] == "black" && items[5] == "black" && items[8] == "black" ||
		 items[0] == "black" && items[4] == "black" && items[8] == "black" ||
		 items[6] == "black" && items[4] == "black" && items[2] == "black" )
            return { val: true, win: "black"}
    
		
	if ( items[0] == "red" && items[1] == "red" && items[2] == "red" ||
		 items[3] == "red" && items[4] == "red" && items[5] == "red" ||
		 items[6] == "red" && items[7] == "red" && items[8] == "red" ||
		 items[0] == "red" && items[3] == "red" && items[6] == "red" ||
		 items[1] == "red" && items[4] == "red" && items[7] == "red" ||
		 items[2] == "red" && items[5] == "red" && items[8] == "red" ||
		 items[0] == "red" && items[4] == "red" && items[8] == "red" ||
		 items[6] == "red" && items[4] == "red" && items[2] == "red" )
            return { val: true, win: "red"}

		
         return  {val: false}
       }


 
      