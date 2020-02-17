let formSwitch = document.querySelectorAll("[data-form]");
let btn = document.querySelectorAll(".inp-sub");
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", inpRow)
}

function inpRow() {
    let inputs = document.querySelectorAll(".inp");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == 0) {
            inputs[i].classList.add('inp-invalid')
        }else {
            inputs[i].classList.remove('inp-invalid')
        }
    }
}

for (let i = 0; i < formSwitch.length; i++) {
    formSwitch[i].addEventListener("click", switchForm)
}

function switchForm(ev) {
    let forms = document.querySelectorAll(".forms-inputs>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden")
    }
    let formClass = ev.target.getAttribute("data-form");
    let form = document.querySelector("." + formClass);
    if (form) {
        form.classList.remove("hidden")
    }
}


