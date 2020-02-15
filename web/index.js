let formSwitch = document.querySelectorAll("[data-form]");

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


