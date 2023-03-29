
document.getElementById('jsch-mobile-menu-btn').onclick = function() {
    if(jschMobileMenuObjStr) {
        Obj=JSON.parse(jschMobileMenuObjStr);
        var MobileMenu='<ul id="jsch-mobile-menu">';
        MobileMenu+=jschRenderIterateMenu(Obj);
        MobileMenu+='</ul>';
       
        var div = document.createElement("div");
        const createdDiv=document.body.appendChild(div);
        createdDiv.innerHTML+=MobileMenu;
    } else {
        console.log('const jschMobileMenuObjStr don`t exist!');
    }
            

}

function jschRenderIterateMenu(Obj) {       
    var string="";  
    var size = Object.keys(Obj).length;  
    for(var i=0;i<size;i++) {
        string+=`<li>`;
        if(Obj[i].name) {
            string+=`<a href='${Obj[i].url}'>${Obj[i].name}</a></li>`;
        } else {
            string+=`<ul>`;
            string+=jschRenderIterateMenu(Obj[i]);
            string+=`</ul></li>`;
        }
    }
    return string;
}