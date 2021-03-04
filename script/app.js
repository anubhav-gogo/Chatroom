//DOM queries
const chatList = document.querySelector('.chat-list');
const newFormChat = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');

//change rooms(buttons)

rooms.addEventListener('click', e =>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat =>{
            chatUI.render(chat);
        });
    }
})

newFormChat.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newFormChat.message.value.trim();
    chatroom.addChat(message).then(() =>{
        newFormChat.reset();
    }).catch(err =>{
        console.log(err);
    })
});

//update username
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    //update via chatroom

    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //reset the form
    newNameForm.reset();

    //show then hide the message
    updateMssg.innerHTML = `username updated to ${newName}`;
    setTimeout(() =>{
        updateMssg.innerHTML = ``;
    }, 3000)
    

})

//check local storage for a name

const username = localStorage.username? localStorage.username:"anon";

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('music', username);

//get chats and render

chatroom.getChats((data) =>{
    chatUI.render(data);
    
});