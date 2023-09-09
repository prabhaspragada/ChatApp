

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

let Name;
do{
    Name = prompt('please enter your name:');
}while(!Name);

const socket=io();


function sendMessage(message){
    let msg={
        user:Name,
        message: message.trim(),
    };

 //append

    appendMessage(msg,'outgoing');

    document.querySelector('#textarea').value = '';

    scrollToBottom();

    socket.emit('message', msg);

}


function appendMessage(msg,type){

let mainDiv=document.createElement('div');
let className=type;
mainDiv.classList.add(className,'message');

let markup=`
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`;
mainDiv.innerHTML=markup;
document.querySelector('.message_area').appendChild(mainDiv)

}

function scrollToBottom() {
    let messageArea = document.querySelector('.message_area');
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  document.querySelector('#textarea').addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value);
    }
})

//receving messeges
socket.on('message',(msg)=>{
  appendMessage(msg,'incoming')
  scrollToBottom();
})