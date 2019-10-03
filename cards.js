// template name : <cards-component></cards-component>
// You will need : fontAwesome and Bootstrap CDN;
// change template const to change the picture, text etc...

const template = `

<style>
@import url('https://fonts.googleapis.com/css?family=Asap&display=swap');

body
{
    background: grey;
    margin-top: 1rem; 
}

.cards-container
{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}
.cards
{
    position: relative;
    min-width: 470px;
    width: 25%;
    background: transparent;
    border-radius: 0.5rem;
    font-family: 'Asap';
    margin: 2rem;
}

.cards:hover
{
    cursor: pointer;
}

.background-cards
{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 15px;
    left: 15px;
    background: rgb(68, 68, 68);
    z-index: -1;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 5px 0px, rgba(0, 0, 0, 0.12) 0px 2px 10px 0px;
}

.background-cards-hover
{
    transform: scale(1.065);
    transform-origin: right bottom;
    transition-duration: 0.6s;
    transition-property: transform;
}

.background-cards-out
{
    transform: scale(1.0);
    transform-origin: right bottom;
    transition-duration: 0.6s;
    transition-property: transform;
}

.card-img-container
{
    width: 100%;
}

.card-img-container img
{
    width: 100%;
    border-radius: 0.5rem;
}

.cards-content
{
    color: #fff;
    padding-left: 22px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.cards-content p{
    width: 90%;
    padding-top: 0.4rem;
}

.cards-content i{
    color: rgb(209, 206, 206);
    font-size: 200%;
}

.cards-content i:hover
{
    transform: scale(1.1);
    cursor: pointer;
}
</style>

<div class="cards-container">
        <div class="cards">
                <div class="card-img-container">
                    <img src="http://ssl.quiksilver.com/static/QS/default/category-assets/marketing-landing/landing/img/surf/tiles/surf_featured_1.jpg" alt="cards image background">
                </div>
                <div class="cards-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laudantium deserunt voluptatem nihil nulla dolorem quam magni officiis eum soluta quia nobis excepturi labore repellendus voluptas sint odio, inventore accusantium.</p>
                    <i class="fas fa-ellipsis-h" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
    
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button">Action</button>
                        <button class="dropdown-item" type="button">Another action</button>
                        <button class="dropdown-item" type="button">Something else here</button>
                    </div>
                </div>
        
            <div class="background-cards"></div>
        </div>

        <div class="cards">
            <div class="card-img-container">
                <img src="http://ssl.quiksilver.com/static/QS/default/category-assets/marketing-landing/landing/img/surf/tiles/surf_featured_1.jpg" alt="cards image background">
            </div>
            <div class="cards-content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laudantium deserunt voluptatem nihil nulla dolorem quam magni officiis eum soluta quia nobis excepturi labore repellendus voluptas sint odio, inventore accusantium.</p>
                <i class="fas fa-ellipsis-h" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button">Action</button>
                    <button class="dropdown-item" type="button">Another action</button>
                    <button class="dropdown-item" type="button">Something else here</button>
                </div>
            </div>
    
            <div class="background-cards"></div>
        </div>

        <div class="cards">
            <div class="card-img-container">
                <img src="http://ssl.quiksilver.com/static/QS/default/category-assets/marketing-landing/landing/img/surf/tiles/surf_featured_1.jpg" alt="cards image background">
            </div>
            <div class="cards-content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laudantium deserunt voluptatem nihil nulla dolorem quam magni officiis eum soluta quia nobis excepturi labore repellendus voluptas sint odio, inventore accusantium.</p>
                <i class="fas fa-ellipsis-h" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button">Action</button>
                    <button class="dropdown-item" type="button">Another action</button>
                    <button class="dropdown-item" type="button">Something else here</button>
                </div>
            </div>

            <div class="background-cards"></div>
        </div>
</div>
`

const cardsComponent = document.createElement('template');

cardsComponent.innerHTML = template;

class Cards extends HTMLElement {

    constructor()
    {
        super();
        
        this.innerHTML = template;

    }

    connectedCallback()
    {
        let $cards = document.querySelectorAll('.cards');

        $cards.forEach(($card) => {
        // Set event listener for mouseover
        $card.addEventListener('mouseover', () => {
                $card.querySelector('.background-cards').setAttribute("class", "background-cards background-cards-hover");
        });
    
        // Set event listener for mouseout
        $card.addEventListener('mouseout', () => {
                $card.querySelector('.background-cards').setAttribute("class", "background-cards background-cards-out");
            });  
        });
    }

    static Register()
    {
        customElements.define('cards-component', Cards);
    }
}

Cards.Register();
