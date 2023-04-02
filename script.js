
document.getElementById('jsch-mobile-menu-btn').onclick = function() {
    if(jschMobileMenuObjStr) {
        Obj=JSON.parse(jschMobileMenuObjStr);   
        var MobileMenu=jschRenderIterateMenu(Obj,false);      
        let menuelement=document.getElementById('jsch-mobile-menu');    
        if(menuelement) {
            jschToggleMenuBar(menuelement,'jsch-hidden-menubar');
            return;
        }
        var div = document.createElement("div");
        div.setAttribute("id", "jsch-mobile-menu");
        div.setAttribute("class", "jsch-show-animate");
        const createdDiv=document.body.appendChild(div);
        createdDiv.innerHTML+=MobileMenu;
        var allElems=document.querySelectorAll("#jsch-mobile-menu");
        for(let i = 0; i < allElems.length; i++) {
            allElems[i].onclick = function(e) {                                    
                if(e.target.id=='jsch-mobile-menu-close-x') {
                    jschToggleMenuBar(document.getElementById('jsch-mobile-menu'),'jsch-hidden-menubar');
                    return;
                }
                let element=e.target.nextElementSibling;                        
                if(element) {
                    if(element.tagName=='UL') {
                        e.preventDefault();
                        jschToggleMenuList(e.target.nextElementSibling,'jsch-hidden-menu');
                    }
                }
            }
        }        
    } else {
        console.log('const jschMobileMenuObjStr don`t exist!');
    }
}

function jschRenderIterateMenu(Obj,submenu) {       
    var string="";  
    var size = Object.keys(Obj).length;
    if(submenu) size=size-2;
    for(var i=0;i<size;i++) {
        string+=`<li>`;
        if(Obj[i].url) {
            string+=`<a href='${Obj[i].url}'>${Obj[i].name}</a></li>`;
        } else {
            string+=`<a href='#'>${jschParentMenuArrow(false)} &nbsp;${Obj[i].name}</a>
            <ul class='jsch-hidden-menu'>`;
            string+=jschRenderIterateMenu(Obj[i],true);
            string+=`</ul></li>`;
        }
    }
    if(submenu===false) string='<ul>'+jschMenubarClose()+string+'</ul>';
    return string;
}

function jschToggleMenuBar(element,targetClass) {
    var hasClass=element.classList.contains(targetClass);
    if(hasClass) {
        element.classList.add('jsch-show-animate');
        element.classList.remove('jsch-hide-animate');
        element.classList.remove(targetClass);
    } else { 
        element.classList.add('jsch-hide-animate');      
        element.classList.remove('jsch-show-animate');       
        setTimeout(() =>{
            element.classList.add(targetClass);
        }, 450);                
    }
}

function jschToggleMenuList(element,targetClass) {
    var hasClass=element.classList.contains(targetClass);
    var arrowElement=element.parentNode.firstChild.firstChild;
    console.log(arrowElement);
    if(hasClass) {
        arrowElement.classList.add('jsch-rotate90-animate');
        arrowElement.classList.remove('jsch-rotate0-animate');
        element.classList.add('jsch-show-animate');
        element.classList.remove('jsch-hide-animate');
        element.classList.remove(targetClass);
    } else {
        arrowElement.classList.remove('jsch-rotate90-animate');
        arrowElement.classList.add('jsch-rotate0-animate');        
        element.classList.add('jsch-hide-animate');      
        element.classList.remove('jsch-show-animate');       
        setTimeout(() =>{
            element.classList.add(targetClass);
        }, 400);                
    }
}

function jschMenubarClose() {
    return `<div class='jschMenubarClose'><span id='jsch-mobile-menu-close-x'>&#9932;</span></div>`;
}

function jschParentMenuArrow() {
    return `<span class='jsch-parentmenuarrow'>&#9655; </span>`;
}