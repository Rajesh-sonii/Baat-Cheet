let click = true
        let btn = document.getElementById("login")
        btn.addEventListener('click', function (params) {
            location.href = "/login"

        })
        function ani(params) {
            let cir1 = document.getElementById("cir1")
            cir1.classList = "cir1"
            let cir2 = document.getElementById("cir2")
            cir2.classList = "cir2"
        }
        let input1 = document.getElementById("input1")
        input1.addEventListener("click", function (params) {
            ani()
        })

        // for showing the error message when the user enteres a space in the username field
        input1.addEventListener('input', (event)=>{
            const input = event.target.value.trim();
            const sign = document.querySelector('#sign');
            const red = document.querySelector('#form #red');
            if(input.split(' ').length > 1){
                sign.disabled = true;
                red.style.display = 'flex';
                input1.style.border = '2px solid red';
                input1.style.outline = 'none';
            }
            else{
                sign.disabled = false;
                input1.style.border = 'none';
                red.style.display = 'none';
            }
        })

        let input2 = document.getElementById("input2")
        input2.addEventListener("click", function (params) {
            ani()
        })
        let input3 = document.getElementById("input3")
        input3.addEventListener("click", function (params) {
            ani()
        })
        let input4 = document.getElementById("input4")
        input4.addEventListener("click", function (params) {
            ani()
        })
        let pass = document.getElementById('input4')
        let show = document.getElementById('show' )
        show.addEventListener('click',function () {
            if (pass.type == "password") {
                pass.type = "text"
                show.style.display = "none"
                hide1.style.display = "flex"
            }
            else{
                pass.type = "password"
                show.style.display = "flex"
            }
        })
        let hide1 = document.getElementById('hide')
        hide1.addEventListener('click', hide)
        function hide(params) {
            if (pass.type == "text") {
                pass.type = "password"
                hide1.style.display = "none"
                show.style.display = "flex"
        
            }
            else{
                pass.type = "text"
                hide1.style.display = "flex"
        
        
            }
        }