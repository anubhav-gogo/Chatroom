//render chat templates to the DOM
//clear the list of chats (when the room change occurs)

class ChatUI{
    constructor(list){
        this.list = list;
    }

    clear(){
        this.list.innerHTML = '';
    }

    render(data){
        let html = `<li class = "list-group-item">
        <span class = "username">${data.username}: </span>
        <span class = "message">${data.message}</span>
        <div class = "time">${data.created_at.toDate()}</div>
        </li>`

        this.list.innerHTML += html;
    }
}