let formSwitch = document.querySelectorAll("[data-form]");
let btn = document.querySelectorAll(".inp-sub");
let validate = {
    fullName: function (ev) {
        let v = this.value;
        if (v.length == 0) {
            return;
        }
        v = v[v.length - 1].codePointAt(0);
        if (!((v >= 65 && v <= 90) || (v >= 97 && v <= 122) || (v == 32 || v == 39 || v == 45))) {
            this.value = this.value.slice(0, -1);
        }
    },

    zip: function (ev) {
        let v = this.value;
        if (v.length == 0) {
            return;
        }
        v = v[v.length - 1].codePointAt(0);
        if (!((v >= 48 && v <= 57))) {
            this.value = this.value.slice(0, -1);
        }
    },

    securityCode: function (ev) {
        let v = this.value;
        if (v.length == 0) {
            return;
        }
        v = v[v.length - 1].codePointAt(0);
        if (!((v >= 48 && v <= 57) || (v == 45))) {
            this.value = this.value.slice(0, -1);
        }
    }
};

let fn = document.querySelectorAll('[name="full-name"]');

fn[0].addEventListener("input", validate.fullName);
fn[1].addEventListener("input", validate.fullName);

let z = document.querySelectorAll('[name="zip"]');
z[0].addEventListener('input', validate.zip);
z[1].addEventListener('input', validate.zip);

let name = document.querySelector('[name="security-code"]');
name.addEventListener('input', validate.securityCode);

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", inpRow)
}

function inpRow(ev) {
    let inputs = ev.target.closest('.form-item').querySelectorAll(".inp");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length == 0) {
            inputs[i].classList.add('inp-invalid');
        } else {
            inputs[i].classList.remove('inp-invalid');
            let msg = inputs[i].closest('.input-field').querySelector('.input-message');
            if (msg) {
                msg.classList.remove("show")
            }
        }
    }
    let invalid = document.querySelector(".inp-invalid");
    if (invalid) {
        invalid.focus();
        let msg = invalid.closest('.input-field').querySelector('.input-message');
        if (msg) {
            msg.classList.add("show")
        } else {
            switchForm(null, ev.target.closest('.form-item').nextElementSibling)
        }
    }
}

for (let i = 0; i < formSwitch.length; i++) {
    formSwitch[i].addEventListener("click", switchForm)
}

function switchForm(ev, fObj) {
    let forms = document.querySelectorAll(".forms-inputs>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden")
    }
    let form = null;
    if (fObj) {
        form = fObj
    } else {
        let formClass = ev.target.getAttribute("data-form");
        form = document.querySelector("." + formClass);
    }if (form) {
        form.classList.remove("hidden")
    }
}






