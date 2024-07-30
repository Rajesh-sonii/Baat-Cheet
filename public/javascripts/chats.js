let ul = document.getElementById('ul')
let ul2 = document.getElementById('ul2')

let setting = document.querySelector('.setting')
setting.addEventListener('click', function (params) {

    if (ul.style.display == 'none') {
        ul.style.display = 'flex'
        ul.style.transition = '1s'
    }
    else {
        ul.style.display = 'none'
    }
})
// document.addEventListener('click', ({target}) =>{
//     if(!){
//         ul.style.display = 'none'
//     }
// })
// function for flex display

let theme = document.getElementById('theme-btn')
theme.addEventListener('click', function (params) {
    if (ul2.style.display == 'none') {
        ul2.style.display = 'flex'
        dark.innerText = "Dark"
    }
    else {
        ul2.style.display = 'none'
    }
})

//function for change theme
let text = document.createTextNode('dark')
let dark = document.getElementById('dark-btn')
dark.addEventListener('click', function changingTheme1(params) {
    document.body.classList.toggle("color1")
    if (dark.innerText = "Dark") {
        dark.innerText = "Light"
    }
})


//funcion for showing massage box
// let msg = document.getElementById('display-user')
let msgbox = document.querySelector('.massanger');

const sender_id = document.querySelector('#user-profile').getAttribute('sender_id');
let receiver_id;
let msg = document.querySelectorAll('#display-user')
msg.forEach(single => {

    single.addEventListener('click', function (params) {
        let mainBox = document.getElementById('main-box')
        // const uname = document.querySelector('#cur-user-uname')
        // const img = document.querySelector('#cur-user-img')
        // if (msgBox.style.display == 'flex') {
        //     msgBox.style.display = 'none'
        // }
        // else {
        mainBox.style.display = 'flex'
        // }

        document.querySelector('#msg-box-name').innerHTML = single.innerHTML;
        msgbox.innerHTML = "";

        receiver_id = single.getAttribute('user_id');
        // console.log(receiver_id);
        // console.log(sender_id);

        socket.emit('loadChats', { sender_id, receiver_id });

        socket.on('getChats', function (data) {

            // })
            data.forEach(message => {
                msgbox.innerHTML += `
                    ${message.receiver_id == receiver_id && message.sender_id == sender_id ?

                        `<div id="outgoing-msg">
                            <div class="user-input">
                                <p>${message.message}</p>
                            </div>
                        </div>`: ""}
                        ${message.sender_id != sender_id ?
                        `<div id="incoming-msg">
                            <div class="friends-input">
                                <p>${message.message}</p>
                            </div>
                        </div>`: ""}`
            })
            msgbox.scrollTo(0, msgbox.scrollHeight)
        });
    })

});

let slide = document.getElementById('main-box')
slide.addEventListener('slide right', function (params) {
    slide.style.display = "none"
})


//for showing request box
let chat = document.getElementById('act-user-box')
let reqBox = document.getElementById('requests')
let req = document.getElementById('request')
req.addEventListener('click', function () {
    if (reqBox.style.display == 'none') {
        reqBox.style.display = 'flex'
    }
    else {
        reqBox.style.display = 'none'
    }

})
let msgBox = document.getElementById('msg')
msgBox.addEventListener('click', function () {
    if (reqBox.style.display == 'flex') {
        reqBox.style.display = 'none'
    }
})
//function for back button
let backBtn = document.querySelector('.back-btn')
backBtn.addEventListener('click', function (params) {
    let msgBox = document.getElementById('main-box')
    msgBox.style.display = 'none'
})

// // function for searching the user from the list of users 
// document.querySelector('#currUser').addEventListener('onchange', ()=>{

// });

// defining the namespace using socket.io 
var socket = io('/user-namespace');
// const receiver_id = document.querySelector('#display-user').getAttribute('user_id');

document.querySelector('#message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.querySelector('#message').value;
    let data;
    // socket.emit('sendMessage', { message, sender_id, receiver_id });

    // socket.on('sentMessage', function (data) {
    console.log(message)
    console.log(sender_id)
    console.log(receiver_id)
    try {
        const res = await fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message,
                receiver_id,
                sender_id
            })
        });

        if (res) {
            data = await res.json()
            const html = `
                <div id="outgoing-msg">
                    <div class="user-input">
                        <p>${data.message}</p>
                    </div>
                </div>`;

            document.querySelector('.massanger').innerHTML += html;
            msgbox.scrollTo(0, msgbox.scrollHeight)
        }
    } catch (error) {
        // console.log('something went wrong, please try again in some time');
    }

    document.getElementById('message').value = '';
    socket.emit('newChat', data);
})
// });

socket.on('loadNewChat', (data) => {
    // console.log('systum ' + data);
    if (sender_id == data.receiver_id && receiver_id == data.sender_id) {

        const html = `
        <div class="distance-user-msg">
        <span class="message">${data.message}</span>
        </div>`;

        document.querySelector('.massanger').innerHTML += html;
        msgbox.scrollTo(0, msgbox.scrollHeight)

    }
})


// searching for a user
document.querySelector('#search').addEventListener('input', async function (event) {
    // setTimeout(async () => {
    const promise = await fetch(`http://localhost:3000/searchfriend?q=${event.target.value}`)
    const res = await promise.json();
    console.log(res);
    // }, 2000);
})

document.querySelector('#appect');
document.querySelector('#reject');

async function acceptReject(status, id) {
    if ((status == 'accepted' || status == 'rejected') && id != undefined) {

        try {
            const res = await fetch('http://localhost:3000/checkoutRequest',
                {
                    method: 'POST',
                    body: JSON.stringify({ acceptReject: status, request_id: id }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await res.json();
            console.log(json);

        } catch (error) {
            console.error('Error:', error);
        }
    }
}