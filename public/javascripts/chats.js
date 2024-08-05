let ul = document.getElementById('ul')
let ul2 = document.getElementById('ul2')
let ul3 = document.getElementById('ul3')

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
let theme2 = document.getElementById('theme-btn2')
theme2.addEventListener('click', function (params) {
    if (ul3.style.display == 'none') {
        ul3.style.display = 'flex'
        dark2.innerText = "Dark"
    }
    else {
        ul3.style.display = 'none'
    }
})

//function for change theme
let text = document.createTextNode('dark')
let dark = document.getElementById('dark-btn')
dark.addEventListener('click', function changingTheme1(params) {
    document.body.classList.toggle("color1")
    if (dark.innerText == "Dark") {
        dark.innerText = "Light"
    }
    else{
        dark.innerText = "Dark"
    }
})
let dark2 = document.getElementById('dark-btn2')
dark2.addEventListener('click', function changingTheme2(params) {
    document.body.classList.toggle("color1")
    if (dark.innerText == "Dark") {
        dark.innerText = "Light"
    }
    else{
        dark.innerText = "Dark"
    }
})
//function foe showings friends in search
let search = document.querySelector('#input')
search.addEventListener('click', function (params) {
    let searchBox = document.getElementById('search-friends')
if (searchBox.style.display =='none') {
    searchBox.style.display='flex'
}
else{
    searchBox.style.display='none'
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
//function for hide default screen
let defaultUser = document.getElementById('display-user')
defaultUser.addEventListener('click', function (params) {
    let defaultscreen = document.getElementById('default-main-box')
    defaultscreen.style.display = "none"
})
//function for exchanging following icons
let follow = document.getElementById("follow")
let following = document.getElementById("following")
follow.addEventListener('click',function (params) {
    console.log("follower faknvlasmk");
    following.style.display = "flex"
    follow.style.display = "none"
})
//function for recived sent box
let sentRequest = document.getElementById("sent")
let recivedRequest = document.getElementById("recived")
let buttonSentRequest = document.getElementById("sent-recived")
buttonSentRequest.addEventListener('click',function (params) {
    if (sentRequest.style.display == "none"  && recivedRequest.style.display == "flex"  ) {
        sentRequest.style.display = "flex"
        recivedRequest.style.display = "none"
        buttonSentRequest.style.rotate = '180deg'
        buttonSentRequest.style.transition = '0.5s'
    }
    else{
        console.log("sent")
        sentRequest.style.display = "none"
        recivedRequest.style.display = "flex"
        buttonSentRequest.style.rotate = '0deg'
        buttonSentRequest.style.transition = '0.5s'
    }
        
})

//for showing request box
let chat = document.getElementById('act-user-box')
let req = document.getElementById('request')
req.addEventListener('click', function () {
        reqBox.style.display = 'flex'
})
//function for desktop msgbox
let reqBox = document.getElementById('requests')
let msgBox = document.getElementById('msg')
msgBox.addEventListener('click', function () {
        reqBox.style.display = 'none'
})
//function for back button
let backBtn = document.querySelector('.back-btn')
backBtn.addEventListener('click', function (params) {
    let msgBox = document.getElementById('main-box')
    msgBox.style.display = 'none'
})
//function for shpwing chat box
let chatsshow = document.getElementById("chats") 

//function for mobile devices
let profilePanel = document.getElementById('profile-shower')
let mobiSearchPanel = document.getElementById('mobi-search-box')
let reqOpen = document.getElementById('req-open')
reqOpen.addEventListener('click', function () {
        reqBox.style.display = 'flex'
        mobiSearchPanel.style.display = "none"
        chatsshow.style.display = "none"
        profilePanel.style.display="none"
})
let msgOpen = document.getElementById('msg-open')
msgOpen.addEventListener('click', function () {
        reqBox.style.display = 'none'
        chatsshow.style.display = "flex"
        mobiSearchPanel.style.display = "none"
        profilePanel.style.display="none"
})
//function for mobile search bar
let mobiSearch = document.getElementById('search-open')
mobiSearch.addEventListener('click',function (params) {
    reqBox.style.display = 'none'
    chatsshow.style.display = "none"
        mobiSearchPanel.style.display = "flex"
        profilePanel.style.display="none"
})
//functon for showing profile panel
let profile = document.getElementById('profile-update')
profile.addEventListener('click', function(){
    reqBox.style.display = 'none'
    chatsshow.style.display = "none"
        mobiSearchPanel.style.display = "none"
        profilePanel.style.display="flex"
})
//function for exchanging mobile following icons
let mobifollow = document.getElementById("mobi-follow")
let mobifollowing = document.getElementById("mobi-following")
mobifollow.addEventListener('click',function (params) {
    console.log("follower faknvlasmk");
    mobifollowing.style.display = "flex"
    mobifollow.style.display = "none"
})
// // function for searching the user from the list of users 
// document.querySelector('#currUser').addEventListener('onchange', ()=>{

// });

// defining the namespace using socket.io 
var socket = io('/user-namespace');

document.querySelector('#message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.querySelector('#message').value;
    let data;

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

// using debounce function for fetching the data after the specified time
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later,
            wait);
    };
}

// making a debounced api call after 1 second
const debouncedSearch = debounce(async (value, container) => {
    // Your API call logic here
    const promise = await fetch(`http://localhost:3000/searchfriend?q=${value}`)
    const res = await promise.json();

    container.innerHTML = "";
    let html = "";
    if (res.length > 0) {

        res.forEach((user) => {

            html += `<div class="searched-user">
                    <div class="send-request">
                        <img src=${user.image} alt="">
                        <span id="user-name">${user.username}</span>
                    </div>
                    <i class="fa-solid fa-user-plus" id="${user.username}" onclick="sendReq('${user._id}')"></i>
                    <i class="fa-solid fa-user-check ${user.username}" id="following"></i>
                 </div>`;
        });
    }
    else {
        let p = document.createElement('p');
        p.classList.add('nothing');
        p.textContent = "No new user found for the query!";
        html = p.outerHTML;
    }
    container.innerHTML = html;

}, 1000); // Adjust the delay as needed

// searching for a user
document.querySelector('#input').addEventListener('input', async function (event) {
    const value = event.target.value;
    let searchBox = document.getElementById('search-friends')
    let container = document.querySelector('#search-friends');
    if (value != "") {
        searchBox.style.display = 'flex'

        // making a debounced api call which will evaluate after 1 second 
        debouncedSearch(value, container);

    }
    else {
        searchBox.style.display = 'none'
    }
})

// searching for a user in mobile-view
document.querySelector('#mobi-input').addEventListener('input', async function (event) {
    const value = event.target.value;
    let container = document.querySelector('#mobi-request-shower #search-friends');
    if (value != "") {

        // making a debounced api call which will evaluate after 1 second
        debouncedSearch(value, container);
    }
    else {
        container.innerHTML = "";
    }
})

// handling the event to fire when the user clicks on the sendRequest button
async function sendReq(receiver_id) {
    const res = await fetch('http://localhost:3000/makefriend', {
        method: "POST",
        headers: { receiver_id }
    })

    const data = await res.json();
    if (data) {

        const follow = document.querySelector(`#${data.them.username}`)
        // for changing the follow icon to following icon when the user clicks on it 
        const following = document.querySelector(`.${data.them.username}`)
        console.log(following);

        following.style.display = "flex"
        follow.style.display = "none"
    }
}

// function for acepting or rejecting the friend request
async function acceptReject(status, id, uname) {
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

        } catch (error) {
            console.error('Error:', error);
        }

        // updating the same elemnt on the frontend
        const btns = document.querySelector(`#${uname}`);
        btns.style.display = 'none';
        const txts = document.querySelector(`.${uname}`);
        txts.style.display = 'block';
        if (status == 'accepted') {
            document.querySelector(`.${uname} .friends`).style.display = 'block';
        }
        else {
            document.querySelector(`.${uname} .rejected`).style.display = 'block';
        }
    }
}

// function for cancelling the sent friendRequest
async function cancelReq(id, uname) {
    try {
        const res = await fetch('http://localhost:3000/cancelRequest',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    request_id: id
                }
            });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Error:', error);
    }

    // updating the same elemnt on the frontend
    const btns = document.querySelector(`#${uname}`);
    btns.style.display = 'none';

    const txts = document.querySelector(`.${uname}`);
    txts.style.display = 'block';

    document.querySelector(`.${uname} .cancelled`).style.display = 'block';
}