//const url='http://localhost:3000'
const url='https://baat-cheet-production.up.railway.app'
// const url = process.env.APP_URL;
let ul = document.getElementById('ul')
let ul2 = document.getElementById('ul2')
let ul3 = document.getElementById('ul3')
let blockButton = false;
let blockdiv = document.querySelectorAll('#block-div')
let setting = document.querySelector('.setting')

// window.addEventListener('resize', () => {
//     const windowWidth = window.innerWidth;
//     // const navigation = document.querySelector('.navigation');

//     if ((windowWidth > 1024) || (windowWidth < 1025)) {
//         window.location.reload();
//     }
// });

//function or keyboard open close
// Store the initial viewport height
let initialHeight = window.innerHeight;

// Listen for resize events
window.addEventListener('resize', () => {
    let newHeight = window.innerHeight;

    // Check if the height has decreased, indicating the keyboard is likely visible
    if (newHeight < initialHeight) {
        document.body.classList.add('keyboard-open');
    } else {
        document.body.classList.remove('keyboard-open');
    }
});


document.body.addEventListener('click', ({ target }) => {
    if ((!target.classList.contains('ul') &&
        !target.classList.contains('setting') &&
        !target.classList.contains('theme-btn') &&
        !target.classList.contains('dark-btn')) &&
        !target.classList.contains('display-user-column')) {
        ul.style.display = 'none'
        if (blockButton) {
            blockdiv.forEach(single => {
                // let d = single.style.display;
                // if (single.style.display == 'flex') {
                single.style.display = 'none';
                // }
            })
            blockButton = false;
        }
    }
})

setting.addEventListener('click', function (params) {

    if (ul.style.display == 'none') {
        ul.style.display = 'flex'
    }
    else {
        ul.style.display = 'none'
    }
})

// // for submitting the input form of messages on enter pressed
// const form = document.querySelector('#message'); // Select your form

// form.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
//     event.preventDefault(); // Prevent the default form submission
//     form.submit(); // Manually submit the form
//   }
// });


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
let themeIcon1 = document.querySelector('.fa-sun')
let themeIcon2 = document.querySelector('.fa-moon')
let theme2 = document.getElementById('theme-btn2')
theme2.addEventListener('click', function (params) {
    document.body.classList.toggle("color1")

    if (themeIcon2.style.display == 'none' || themeIcon1.style.display == 'flex') {
        themeIcon1.style.display = 'none'
        themeIcon2.style.display = 'flex'
    }
    else {
        themeIcon1.style.display = 'flex'
        themeIcon2.style.display = 'none'
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
    else {
        dark.innerText = "Dark"
    }
})
let dark2 = document.getElementById('dark-btn2')
dark2.addEventListener('click', function changingTheme2(params) {
    document.body.classList.toggle("color1")
    if (dark.innerText == "Dark") {
        dark.innerText = "Light"
    }
    else {
        dark.innerText = "Dark"
    }
})
// //function to display block when the user press and holds the display-user-column div
// let blockdiv = document.querySelector('#block-div')
// let chatDiv = document.querySelector('#display-user-column')
// chatDiv.addEventListener('long-press', function () {
//     blockdiv.style.display = "flex"
// })


let chatDiv = document.querySelectorAll('#display-user-column')
for (let i = 0; i < chatDiv.length; i++) {
    chatDiv[i].addEventListener('long-press', function () {
        const bd = blockdiv[i];
        // if (bd.style.display == 'flex') {
        //     bd.style.display = 'none'
        // }
        // else {
        bd.style.display = "flex"
        blockButton = true;
        // if (i > 0) {
        //     blockdiv[i - 1].style.display = 'none';
        // }
        // }
    })
}
// chatDiv.forEach(single => {
//     single.addEventListener('long-press', function () {
//         blockdiv.style.display = "flex"
//     })
// });

//function foe showings friends in search
// let search = document.querySelector('#input')
// search.addEventListener('click', function (params) {
//     let searchBox = document.getElementById('search-friends')
// if (searchBox.style.display =='none') {
//     searchBox.style.display='flex'
// }
// else{
//     searchBox.style.display='none'
// }
// })

//funcion for showing massage box
// let msg = document.getElementById('display-user')
let msgbox = document.querySelector('.massanger');

const sender_id = document.querySelector('#user-profile').getAttribute('sender_id');
let receiver_id;
// let msg = document.querySelectorAll('#display-user')
// let msg = document.querySelectorAll('#display-user-column')
// msg.forEach(single => {

let mainBox = document.getElementById('main-box')
let defaultscreen = document.getElementById('default-main-box')
function fetchMsg(rec_id, uname, elem) {
    // single.addEventListener('click', function (params) {
    // receiver_id = single.getAttribute('user_id');
    // const dot = document.querySelector(`.${uname} .${uname}`);
    // if(dot.style.display == 'flex'){
    //     dot.style.display = 'none';
    // }
    // console.log(elem.div)
    elem.lastElementChild.style.display = 'none';

    receiver_id = rec_id;

    defaultscreen.style.display = "none"
    mainBox.style.display = 'flex'

    const div = document.querySelector(`.${uname}`).cloneNode(true)
    div.removeChild(div.children[div.children.length-1])
    document.querySelector('#msg-box-name').innerHTML = div.innerHTML;
    msgbox.innerHTML = "";

    socket.emit('loadChats', { sender_id, receiver_id });

    socket.on('getChats', function (data) {

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
}
// )

// });

let slide = document.getElementById('main-box')
slide.addEventListener('slide right', function (params) {
    slide.style.display = "none"
})
//function for hide default screen
// let defaultUser = document.getElementById('display-user')
// defaultUser.addEventListener('click', function (params) {
//     let defaultscreen = document.getElementById('default-main-box')
//     defaultscreen.style.display = "none"
// })
//function for exchanging following icons
// let follow = document.getElementById("follow")
// let following = document.getElementById("following")
// follow.addEventListener('click',function (params) {
//     following.style.display = "flex"
//     follow.style.display = "none"
// })
//function for recived sent box
let sentRequest = document.getElementById("sent")
let recivedRequest = document.getElementById("recived")
let buttonSentRequest = document.getElementById("sent-recived")
buttonSentRequest.addEventListener('click', function (params) {
    if (sentRequest.style.display == "none" && recivedRequest.style.display == "flex") {
        sentRequest.style.display = "flex"
        recivedRequest.style.display = "none"
        buttonSentRequest.style.rotate = '180deg'
        buttonSentRequest.style.transition = '0.5s'
    }
    else {
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

let msgOpen = document.getElementById('msg-open')
let reqOpen = document.getElementById('req-open')
let mobiSearch = document.getElementById('search-open')
let profile = document.getElementById('profile-update')
let profilePanel = document.getElementById('profile-shower')
let mobiSearchPanel = document.getElementById('mobi-search-box')
let white = 1;
//--------------------------functions for mobile devices-----------------------
function bgRemover(white) {
    switch (white) {
        case 1:
            msgOpen.classList.remove('transition');
            break;
        case 2:
            reqOpen.classList.remove('transition');
            break;
        case 3:
            mobiSearch.classList.remove('transition');
            break;
        case 4:
            profile.classList.remove('transition');
            break;
        default:
        // code block
    }
}


// for showing the message tab
msgOpen.addEventListener('click', function () {
    reqBox.style.display = 'none'
    chatsshow.style.display = "flex"
    profilePanel.style.display = "none"
    mobiSearchPanel.style.display = "none"

    // for removing the red dot from the message box downside
    document.querySelector('#msg-req-search #msg-open #red-dot').style.display = 'none';

    // msgOpen.style = 'background: white; transform: scaleX(0.1);'
    if (white > 1) {
        bgRemover(white);
        white = 1;
        msgOpen.classList.add('transition');
    }
    // msgOpen.style = 'background: white;'
    // document.querySelector('#msg-open i').style = 'color: black;'
})
// for showing the requests tab
reqOpen.addEventListener('click', function () {
    reqBox.style.display = 'flex'
    chatsshow.style.display = "none"
    profilePanel.style.display = "none"
    mobiSearchPanel.style.display = "none"

    if (white != 2) {
        bgRemover(white);
        white = 2;
        reqOpen.classList.add('transition');
    }
    // reqOpen.style = 'background: white';
    // document.querySelector('#req-open i').style = 'color: black;'

    // for hiding the red Dot from it
    const redDot = document.querySelector('#msg-req-search #req-open #red-dot');
    // if (redDot.style.display == 'flex') {
    redDot.style.display = 'none';
    // }
})
//function for mobile search bar
// for showing the search tab
mobiSearch.addEventListener('click', function (params) {
    reqBox.style.display = 'none'
    chatsshow.style.display = "none"
    profilePanel.style.display = "none"
    mobiSearchPanel.style.display = "flex"

    // mobiSearch.style = 'background: white';
    // document.querySelector('#search-open i').style = 'color: black;'
    if (white != 3) {
        bgRemover(white);
        white = 3;
        mobiSearch.classList.add('transition');
    }
})
//functon for showing profile panel
profile.addEventListener('click', function () {
    reqBox.style.display = 'none'
    chatsshow.style.display = "none"
    profilePanel.style.display = "flex"
    mobiSearchPanel.style.display = "none"

    if (white != 4) {
        bgRemover(white);
        white = 4;
        profile.classList.add('transition');
    }
})
//function for exchanging mobile following icons
// let mobifollow = document.getElementById("mobi-follow")
// let mobifollowing = document.getElementById("mobi-following")
// mobifollow.addEventListener('click',function (params) {
//     mobifollowing.style.display = "flex"
//     mobifollow.style.display = "none"
// })

//function for block user shower
let blockBtn = document.querySelector("#block-user")
let blockUserDiv = document.querySelector('#blocked-popup-back')
blockBtn.addEventListener('click', function (params) {
    blockUserDiv.style.display = "flex"
})
let blockBackBtn = document.querySelector('.block-back-btn')
blockBackBtn.addEventListener('click', function (params) {
    blockUserDiv.style.display = "none"
})
//function fo showing delete dispaly
let deletebtn = document.querySelector('#delete-account')
let deleteDiv = document.querySelector('#delete-popup-back')
deletebtn.addEventListener('click', function (params) {
    deleteDiv.style.display = "flex"
})
let deleteBackBtn = document.querySelector('#delete-back-btn')
deleteBackBtn.addEventListener('click', function (params) {
    deleteDiv.style.display = "none"

})
//function for setting profile ul
let profileUl = document.querySelector('#profile-ul')
let arrow = document.querySelector('#upword-downword #up-down');
let settingBtn = document.querySelector('#upword-downword')
settingBtn.addEventListener('click', function (params) {
    if (profileUl.style.top == '-35dvh' || settingBtn.style.rotate == '180deg') {
        profileUl.style.top = '0'
        arrow.style.transform = 'rotate(0deg)'
        settingBtn.style.transition = '0.5s'
        profileUl.style.transition = '0.5s'
    }
    else {
        profileUl.style.top = '-35dvh'
        arrow.style.transform = 'rotate(180deg)'
        settingBtn.style.transition = '0.5s'
        profileUl.style.transition = '0.5s'
        // settingBtn.style.transform = 'rotate("180deg")'
    }
})


// function for disabling the send message button
// function changer(event) {
const messageForm = document.querySelector('#message-form')
const textArea = document.querySelector('#message')
// textArea.onkeydown = (e) => {
//     if (e.key === "Enter") {
//         messageForm.submit();
//     }
// }

// for disable/enable the send button
const sendbtn = document.querySelector('#text-button');
const sendbtnphone = document.querySelector('#icon-send-button button');
textArea.addEventListener('input', (event) => {
    const message = event.target.value.trim();
    if (message.length <= 0 || message.split(' ').length <= 0) {
        sendbtn.disabled = true;
        sendbtnphone.disabled = true;
    }
    else {
        sendbtn.disabled = false;
        sendbtnphone.disabled = false;
    }
});

// when the user presses enter
textArea.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        // e.currentTarget.closest("form").submit();
        // const message = document.querySelector('#message').value;
        const message = e.target.value;

        sendMessage(message, e.target);

        // e.target.value = '';
        // socket.emit('newChat', data);
    }
});

// for mobile devices
sendbtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // const message = document.querySelector('#message').value;
    const message = textArea.value;
    sendMessage(message, textArea);

    // document.querySelector('#message').value = '';
    // textArea.value = '';
    // socket.emit('newChat', data);
})

// sendbtnphone.addEventListener("click", async (e) => {
//     e.preventDefault();

//     // const message = document.querySelector('#message').value;
//     const message = textArea.value;
//     sendMessage(message, textArea);

//     // document.querySelector('#message').value = '';
//     // textArea.value = '';
//     // socket.emit('newChat', data);
// });
sendbtnphone.addEventListener("touchend", (e) => {
    e.preventDefault();
    //functions for the Button need to be called here
    const message = textArea.value;
    sendMessage(message, textArea);
})

async function sendMessage(message, value) {
    if (message.length <= 0 || message.split(" ").length == 0) {
        return;
    }
    let data = {message,receiver_id,sender_id};
            const html = `
            <div id="outgoing-msg">
                <div class="user-input">
                    <p>${data.message}</p>
                </div>
            </div>`;

            document.querySelector('.massanger').innerHTML += html;
            msgbox.scrollTo(0, msgbox.scrollHeight)
            value.value = '';

    socket.emit('newChat', data);

    try {
        const res = await fetch(`${url}/messages`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.log('something went wrong, please try again in some time');
    }
}

// defining the namespace using socket.io 
var socket = io('/user-namespace');

// handling what to do when a user sends a message
// messageForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const message = document.querySelector('#message').value;
//     let data;

//     // if (message.length <= 0 || message.split(" ").length > 0) {
//     //     return;
//     // }
//     try {
//         const res = await fetch("${url}/messages", {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 message,
//                 receiver_id,
//                 sender_id
//             })
//         });

//         if (res) {
//             data = await res.json()
//             const html = `
//                 <div id="outgoing-msg">
//                     <div class="user-input">
//                         <p>${data.message}</p>
//                     </div>
//                 </div>`;

//             document.querySelector('.massanger').innerHTML += html;
//             msgbox.scrollTo(0, msgbox.scrollHeight)
//         }
//     } catch (error) {
//         console.log('something went wrong, please try again in some time');
//     }

//     document.getElementById('message').value = '';
//     socket.emit('newChat', data);
// })

// for chtching the event of getting a new message
socket.on('loadNewChat', (data) => {
    // for showing the red dot on the message box downside
    if (chatsshow.style.display == 'none') {
        document.querySelector('#msg-req-search #msg-open #red-dot').style.display = 'flex';
    }
    if (sender_id == data.receiver_id && receiver_id == data.sender_id) {

        const html = `
                <div id="incoming-msg">
                    <div class="friends-input">
                        <p>${data.message}</p>
                    </div>
                </div>`;

        document.querySelector('.massanger').innerHTML += html;
        msgbox.scrollTo(0, msgbox.scrollHeight)

    }


    // for displaying the dot beside the username (indicating that they have received a new message)
    document.querySelectorAll('#new-msg-dot').forEach(single => {
        if (single.classList.contains(`${data.sender_id}`)) {
            single.style.display = 'block';
            console.log('helo')
        }
    })


    // const id = document.querySelector(`.${data.receiver_id}`);
    // const id2 = document.querySelector(`${data.sender_id}`);
    // console.log(id);
    // console.log(id2);
    // document.querySelector(`#${data.sender_id}`).innerHTML += '<div id="new-msg-dot"></div>';
})

// msgOpen.addEventListener('focus', () => {
//     document.querySelector('#msg-req-search #msg-open #red-dot').style.display = 'none';
// })
// reqOpen.addEventListener('focus', () => {
//     document.querySelector('#msg-req-search #req-open #red-dot').style.display = 'none';
// })

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
    const promise = await fetch(`${url}/searchfriend?q=${value}`)
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
        container.style.display = 'flex';
        // making a debounced api call which will evaluate after 1 second
        debouncedSearch(value, container);
    }
    else {
        container.style.display = 'none';
        container.innerHTML = "";
    }
})

// handling the event to fire when the user clicks on the sendRequest button
async function sendReq(receiver_id) {
    const res = await fetch(`${url}/makefriend`, {
        method: "POST",
        headers: { receiver_id }
    })

    const data = await res.json();
    if (data) {
        const follow = document.querySelector(`#${data.tusername}`)
        // for changing the follow icon to following icon when the user clicks on it 
        const following = document.querySelector(`.${data.tusername}`)

        following.style.display = "flex"
        follow.style.display = "none"

        socket.emit('requestSent', data);

        const newReq = `<div class="friends-req">
                            <div class="pending-req">
                                <img src="${data.timage}" alt="">
                                <sapn id="user-name">
                                ${data.tusername}
                                </sapn>
                            </div>
                            <div class="req-icon" id="${data.tusername}">
                                <i id="cancelled"
                                    onclick="cancelReq('${data.rid}', '${data.tusername}')"
                                    class="fa-regular fa-circle-xmark"></i>
                            </div>
                            <div class="${data.tusername}" style="display: none;">
                                <p class="cancelled" style="display: none;">Cancelled</p>
                            </div>
                        </div>`
        document.querySelector('#sent-requests').innerHTML += newReq;
    }
}

// for catching the event of sending a friend request to a user
socket.on('sentFriendRequest', (data) => {
    const newReq = `<div class="friends-req">
                        <div class="pending-req">
                            <img src="${data.image}" alt="">
                            <sapn id="user-name">
                                ${data.username}
                            </sapn>
                        </div>
                        <div class="req-icon" id="${data.username}">
                            <i id="accept"
                                onclick="acceptReject('accepted', '${data.rid}', '${data.username}', '${data.image}')"
                                class="fa-regular fa-circle-check"></i>
                            <i id="reject"
                                onclick="acceptReject('rejected', '${data.rid}', '${data.username}', '${data.image}')"
                                class="fa-regular fa-circle-xmark"></i>

                        </div>
                        <div class="${data.username}" style="display: none;">
                            <p class="friends" style="display: none;" id="abc">you're friends now!
                            </p>
                            <p class="rejected" style="display: none;">Rejected</p>
                        </div>
                    </div>`;

    recivedRequest.innerHTML += newReq;

    // for showing the red dot in the bottom
    if (reqBox.style.display = 'none') {
        const redDot = document.querySelector('#msg-req-search #req-open #red-dot');
        redDot.style.display = 'flex';
    }
})

// function for acepting or rejecting the friend request
async function acceptReject(status, id, uname) {

    if ((status == 'accepted' || status == 'rejected') && id != undefined) {
        let data;
        try {
            const res = await fetch(`${url}/checkoutRequest`,
                {
                    method: 'POST',
                    body: JSON.stringify({ acceptReject: status, request_id: id }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!res.ok) {
                return new Error('Network response was not ok');
            }
            data = await res.json();

        } catch (error) {
            return console.error('Error:', error);
        }

        // updating the same elemnt on the frontend
        const btns = document.querySelector(`#${data.tusername}`);
        btns.style.display = 'none';
        const txts = document.querySelector(`.${data.tusername}`);
        txts.style.display = 'block';
        if (status == 'accepted') {
            document.querySelector(`.${data.tusername} .friends`).style.display = 'block';

            const newFrnd = `<div id="display-user-column" data-long-press-delay="500" class="display-user-column">
                                <div class="${data.tusername}" id="display-user" onclick="fetchMsg('${data.tid}', '${data.tusername}', this)">
                                        <img src="${data.timage}" alt="">
                                        <span id="user-name">
                                            ${data.tusername}
                                        </span>
                                    </div>
                                    <div id="block-div" class="${data.tusername}">
                                        <button onclick="block('${data.tid}', '${data.tusername}')">
                                            <i class="fa-solid fa-user-slash"></i>
                                            block
                                        </button>
                                    </div>
                            </div>`;

            chatsshow.innerHTML += newFrnd;

            socket.emit('accepted', data);
        }
        else {
            document.querySelector(`.${uname} .rejected`).style.display = 'block';
        }
    }
}

// catching the event of getting a new friend request
socket.on('newFriend', (data) => {
    const newFrnd = `<div id="display-user-column" data-long-press-delay="500" class="display-user-column">
                                <div class='${data.username}' id="display-user" onclick="fetchMsg('${data.id}', '${data.username}', this)">
                                    <img src="${data.image}" alt="">
                                    <span id="user-name">
                                        ${data.username}
                                    </span>
                                </div>
                                <div id="block-div" class="${data.username}">
                                    <button onclick="block('${data.id}', '${data.username}')">
                                        <i class="fa-solid fa-user-slash"></i>
                                        block
                                    </button>
                                </div>
                            </div>`;

    chatsshow.innerHTML += newFrnd;
})

// function for cancelling the sent friendRequest
async function cancelReq(id, uname) {

    try {
        const res = await fetch(`${url}/cancelRequest`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    request_id: id
                }
            });

        if (!res.ok) {
            return new Error('Network response was not ok');
        }

    } catch (error) {
        return console.error('Error:', error);
    }

    // updating the same elemnt on the frontend
    const btns = document.querySelector(`#${uname}`);
    btns.style.display = 'none';

    const txts = document.querySelector(`.${uname}`);
    txts.style.display = 'block';

    document.querySelector(`.${uname} .cancelled`).style.display = 'block';
}

// for showing the loggin-out screen when the user logs-out
function logout() {
    setTimeout(() => {
        window.location.href = '/logout';
    }, 1000);

    document.querySelector('#logout-popup-back').style.display = 'flex';
}

// for blocking a friend
function block(uid, uname) {

    fetch(`${url}/block`, {
        method: 'POST',
        headers: { "user_id": uid },
    })
        .then(res => {
            if (res.ok) {
                document.querySelector(`.${uname} .${uname}`).textContent = 'blocked';
            }
        })
}

// for unblocking a friend
function unblock(uid, uname) {

    fetch(`${url}/unblock`, {
        method: 'POST',
        headers: { "user_id": uid },
    })
        .then(res => {
            if (res.ok) {
                document.querySelector(`.${uname}`).textContent = 'unblocked';
            }
        })
}

async function deleteAcc(){
    const res = await fetch(`${url}/delete`, {method: 'POST'});
    if(res.ok){
        window.location.href = '/';
    }
}
