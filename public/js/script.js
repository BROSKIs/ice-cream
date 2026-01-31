document.getElementById("order").onsubmit = validate;

function validate(){
    clearErrors();
    let isValid = true;
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if(!name){
        document.getElementById("name-error").style.display = "inline-block";
        isValid = false;
    }
    if(!email || !email.includes("@")){
        document.getElementById("email-error").style.display = "inline-block";
        isValid=false;
    }

    let cup = document.getElementById("Cup").value;
    let cup1 = document.getElementById("Sugar-Cone").value;
    let cup2 = document.getElementById("Waffel-Cone").value;
    if(!cup.checked && !cup1.checked && !cup2.checked){
        document.getElementById("cone-error").style.display = "inline-block";
        isTrue=false;
    }
    let flavor = document.getElementById("flavor").value;
    if(flavor=="none"){
        document.getElementById("flavor-error").style.display = "inline-block";
    }

    return isValid;
}

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i=0; i<errors.length; i++){
        errors[i].style.display = "none";
    }
}