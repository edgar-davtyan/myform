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
        if (!(v >= 48 && v <= 57) || (this.value.length > 12)) {
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
            if (inputs[i].getAttribute('name') === 'zip') {
                if (inputs[i].value.length < 4 || inputs[i].value.length > 12) {
                    inputs[i].classList.add('inp-invalid');
                    continue;
                }
            }
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
        }
    } else {
        switchForm(null, ev.target.closest('.form-item').nextElementSibling)
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
    }
    if (form) {
        form.classList.remove("hidden")
    }
}

let p = document.querySelectorAll(".prev>p");
for (let i = 0; i <p.length ; i++) {
    p[i].addEventListener("click", menu)
}

function menu(ev) {
    let v = ev.target;
    if (v != null){
        v.classList.toggle("color")
    }
}


function getCounty() {
    let req = new XMLHttpRequest();
    req.open("GET", 'https://restcountries.eu/rest/v2/all', true);
    req.send();
    req.onreadystatechange = function (response) {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            setCountries(data)
        }
    };
}

let geo = document.querySelector(".input-svg");
geo.addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (res) {
            let req = new XMLHttpRequest();
            req.open("GET", 'https://api.opencagedata.com/geocode/v1/json?q=' + res.coords.latitude + '+' + res.coords.longitude + '&key=64297b985f9e40e9a107d283ad03d5bc', true);
            req.send();
            req.onreadystatechange = function (response) {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    data = JSON.parse(data);
                    setCity(data);
                }
            };
        });

    }
});

function setCity(data) {
    let city = document.querySelector('[name="city"]');
    city.value = data.results[0].components.city
}

getCounty();

function setCountries(countryList) {
    let select = document.querySelector('.country');
    for (let i = 0; i < countryList.length; i++) {
        let o = document.createElement("option");
        o.innerText = countryList[i].name;
        o.value = countryList[i].name;
        select.appendChild(o)
    }
    let select2 = document.querySelector('.country2');
    select2.parentElement.replaceChild(select.cloneNode(true), select2)
}

$(document).ready(function () {
    $(".inp-phone").inputmask("+374 (99) 99 - 99 - 99")
});

$(document).ready(function () {
    $("#email").inputmask();
});
$(document).ready(function () {
    $('.expire').inputmask({
        alias: 'datetime',
        inputFormat: 'mm/yy'
    });
});
$(document).ready(function () {
    $('.card').inputmask({
        mask: "9{4} 9{4} 9{4} 9{4}",
        inputFormat: 'XXXX XXXX XXXX XXXX'
    });
});
let past = document.querySelector(".paste");
past.addEventListener('click', inputPaste);

function inputPaste() {
    let copy = document.querySelector('.copy');
    let pasts = document.querySelector('.pasts');
    if (copy != null) {
        copy.value = pasts.value
    }
}