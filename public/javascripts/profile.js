let imgPrew = document.getElementById("preview-img")

//function for upload file
let inputFile = document.getElementById("input-file")
inputFile.onchange = function (params) {
    imgPrew.src = URL.createObjectURL(inputFile.files[0])
    document.getElementById('uploadDP').submit();
}

// default photo changes
let click = true
let img1 = document.getElementById("img1")
img1.addEventListener('click', function (params) {
    const file = "/images/muslim-boy.jpg"
    imgPrew.src = file;


    uploadPhoto(imgPrew.src);
})

let img2 = document.getElementById("img2")
img2.addEventListener('click', function (params) {
    imgPrew.src = "/images/chashmish-boy.jpg"


    uploadPhoto(imgPrew.src);
})

let img3 = document.getElementById("img3")
img3.addEventListener('click', function (params) {
    imgPrew.src = "/images/simple-boy.jpg"


    uploadPhoto(imgPrew.src);
})

let img4 = document.getElementById("img4")
img4.addEventListener('click', function (params) {
    imgPrew.src = "/images/chikna-ladka.png"


    uploadPhoto(imgPrew.src);
})

let img5 = document.getElementById("img5")
img5.addEventListener('click', function (params) {
    imgPrew.src = "/images/beard-man.png"


    uploadPhoto(imgPrew.src);
})

let img6 = document.getElementById("img6")
img6.addEventListener('click', function (params) {
    imgPrew.src = "/images/surprised-boy.jpg"


    uploadPhoto(imgPrew.src);
})

let img7 = document.getElementById("img7")
img7.addEventListener('click', function (params) {
    imgPrew.src = "/images/worried-boy.jpg"


    uploadPhoto(imgPrew.src);
})

let img8 = document.getElementById("img8")
img8.addEventListener('click', function (params) {
    imgPrew.src = "/images/happy-girl.jpg"


    uploadPhoto(imgPrew.src);
})

let img9 = document.getElementById("img9")
img9.addEventListener('click', function (params) {
    imgPrew.src = "/images/confident-girl-with-freckles.jpg"


    uploadPhoto(imgPrew.src);
})

let img10 = document.getElementById("img10")
img10.addEventListener('click', function (params) {
    imgPrew.src = "/images/simple-girl.jpg"


    uploadPhoto(imgPrew.src);
})

let img11 = document.getElementById("img11")
img11.addEventListener('click', function (params) {
    imgPrew.src = "/images/barbie-girl.jpg"


    uploadPhoto(imgPrew.src);
})

let img12 = document.getElementById("img12")
img12.addEventListener('click', function (params) {
    imgPrew.src = "/images/young-girl.jpg"

    uploadPhoto(imgPrew.src);
})


function uploadPhoto(src) {
    fetch('https://baat-cheet-production.up.railway.app/upload-pic', {
        method: 'POST',
        headers: {
            file: src
        }
    })
}

// for toggling the iamges div
// let image = document.getElementById('img-div')
// function showAvtar(params) {
//     image.classList.toggle("images")
// }
