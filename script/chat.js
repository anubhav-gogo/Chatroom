//adding new chat documents
//setting up real-time listener to get new chats
//updating the username
//updating the room


class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    } 

    getChats(callback){
    this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change =>{
                    if(change.type === "added"){
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        console.log("Room updated!");
        if(this.unsub){
            this.unsub();
        }
    }

}

// const chatroom = new Chatroom('music', 'shaun');
// console.log(chatroom);

// chatroom.addChat("don't trip!").then(() =>{
//     console.log('chat added!');
// }).catch(err =>{
//     console.log(err);
// });

// chatroom.addChat('as soon as she texted!').then(() =>{
//     console.log("added");
// }).catch(err =>{
//     console.log(err);
// });

// chatroom.getChats((data) =>{
//     console.log(data);
    
// });

// setTimeout(() =>{
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('mohan');
//     chatroom.getChats((data) =>{
//         console.log(data);
//     }) 
//     chatroom.addChat("Bello");
// }, 3000)

