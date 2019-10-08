// template : <sidenav-component logo="#url">
//              <h1 slot="brandTitle">different text!</h1>
//            </sidenav-component>
// You will need : fontAwesome and Bootstrap CDN;


const sideNavTemplate = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<style>

@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');

#dropdown-brand
{
    font-family: 'Righteous';
    color: #5e5e5e;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

#navbar
{
    position: fixed;
    top: 0;
    z-index: 15;
    background: #363636;
    padding: 1rem;
    height: 100vh;
    width: 50px; 
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

#navbar div a
{
    margin-top: 2rem;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

#navbar div a:hover
{
    background-color: #5e5e5e;
    opacity: 0.7;
}

#navbar div a:active
{
    background-color: #696969;
    opacity: 0.2;
}

#navbar div a i 
{
    color: #fff;
    font-size: 110%
}

#nav-icon3
{
    width: 100%;
    height: 20px;
    position: relative;
    cursor: pointer;
}
  
#nav-icon3 span
{
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #fff;
    border-radius: 9px;
    opacity: 1;
    left: 0;
}
  
#nav-icon3 span:nth-child(1) 
{
    top: 0px;
}
  
#nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3) 
{
    top: 6px;
}
  
#nav-icon3 span:nth-child(4) 
{
    top: 12px;
}

#nav-dropdown
{
    position: fixed;
    top: 0;
    background: #fff;
    height: 100vh;
    z-index: 150;
    padding: 1rem;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

#dropdown-content a
{
    color: rgb(34, 34, 34);
    font-size: 130%;
}

.dropdown-items:hover
{
    color: #535353;
    opacity: 0.5; 
    cursor: pointer;
}

#nav-dropdown-leaver
{
    position: absolute;
    right: 15px;
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-radius: 100%;
}

#nav-dropdown-leaver:hover
{
    background: #a8a8a8;
    opacity: 0.8;
    color: #fff;
}


.dropdown-loaded
{
    animation-duration: 0.6s;
    animation-name: slideinDropdown;
}

.dropdown-not-loaded
{
    animation-duration: 0.6s;
    animation-name: slideoutDropdown;
}

.not-loaded
{
    visibility: hidden;
}

@keyframes slideinDropdown {

    0% {
      transform: translateX(-357px);
    }  

    100% {
        transform: translateX(0px);
    }

}

@keyframes slideoutDropdown {

    0% {
        transform: translateX(0px); 
    }  

    100% {
        transform: translateX(-557px);
    }

}
</style>

<nav id="navbar" class="d-flex flex-column justify-content-start align-items-center">
                    
    <div id="nav-icon3">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
                    
    <div id="list-container" class="d-flex flex-column justify-content-center align-items-center">
        <a href="#"><i class="fas fa-home"></i></a>
                    
        <a href="#"><i class="fas fa-anchor"></i></a>
                    
        <a href="#"><i class="fas fa-layer-group"></i></a>
                    
        <a href="#"><i class="fas fa-user"></i></a>
    </div>
                    
</nav>
                    
<div id="nav-dropdown" class="not-loaded">
                    
    <i id="nav-dropdown-leaver" class="fas fa-chevron-left d-flex justify-content-center align-items-center"></i>
                    
    <div class="d-flex flex-column justify-content-center align-items-center border-bottom">
        <img id="brand-logo" width="64px" alt="website image brand">
        <p><slot name="brandTitle">My default text</slot></p>
    </div>
                    
    <div id="dropdown-content" class="d-flex flex-column justify-content-center align-items-start border-bottom mt-3">
        <a class="dropdown-items ml-1"><i class="fas fa-cog mr-3"></i> Paramètres</a>
        <a class="dropdown-items ml-1"><i class="fas fa-user mr-3 mt-4"></i> Mon compte</a>
        <a class="dropdown-items"><i class="fas fa-anchor mr-3 mt-4"></i> Les cartes</a>
    </div>             
</div>
`

const sidenavComponent = document.createElement('template');

sidenavComponent.innerHTML = sideNavTemplate;

class Sidenav extends HTMLElement {

    constructor()
    {
        super();
        
        this.attachShadow({mode: 'open'})
        .appendChild(sidenavComponent.content.cloneNode(true));
    }

    connectedCallback()
    {
        let $navLeaver = this.shadowRoot.getElementById('nav-dropdown-leaver');
        let $dropdown = this.shadowRoot.getElementById('nav-dropdown');
        let $hamburger = this.shadowRoot.getElementById('nav-icon3');
        let $dropdownContent = this.shadowRoot.getElementById('dropdown-content');
        let $logo = this.shadowRoot.getElementById('brand-logo');

        
        $logo.src = this.getAttribute('logo');

        $navLeaver.addEventListener('click', () => {
            $dropdown.setAttribute('class', 'dropdown-not-loaded');
            $dropdownContent.style.visibility = "hidden";
            setTimeout(() =>{
                $dropdown.setAttribute('class', 'not-loaded');
            }, 500)
        });
        
        $hamburger.addEventListener('click', () => {
            $dropdown.setAttribute('class', 'dropdown-loaded');
            $dropdownContent.style.visibility = "visible";
        });

    
            // let actions = Array.from(Array.from(this.children).filter(el => el.slot === "actions")[0].children)
            //     .map(el => {
            //         return {
            //             text: el.getAttribute('text'),
            //             value: el.getAttribute('value')
            //         }
            //     });

            // actions.forEach(action => $actionsContainer
            //     .insertAdjacentHTML("beforeend", `<button class="dropdown-item" type="button" value=${action.value}>${action.text}</button>`));
    }

    static Register()
    {
        customElements.define('sidenav-component', Sidenav);
    }
}

Sidenav.Register();