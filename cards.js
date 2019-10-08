//  template : <card-component imgSrc="#" >
//                      <p slot="content">
//                          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                      </p>
//                  <ul slot="actions">
//                      <li text="Some action" value=1></li>
//                      <li text="Some action2" value=2></li>
//                      <li text="Some action3" value=3></li>
//                  </ul>
//              </card-component>

const cardTemplateHtml = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Asap&display=swap">
<style>


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

p{
    width: 90%;
    padding-top: 0.4rem;
    font-family: 'Asap';
}

.fas{
    color: rgb(209, 206, 206);
    font-size: 200%;
}

#dropdownMenu2:hover
{
    transform: scale(1.1);
}

@media (max-width: 1080px)
{
    .cards
    {
        width: 75%;
        margin: 0;
        margin-left: 9%;
        margin-top: 2rem;
        margin-bottom: 2rem;
        min-width: 75%;
    }

    .background-cards-hover
    {
        transform: scale(1.055);
        transform-origin: right bottom;
        transition-duration: 0.6s;
        transition-property: transform;
    }
}

@media (max-width: 650px)
{
    .background-cards-hover
    {
        transform: scale(1.065);
        transform-origin: right bottom;
        transition-duration: 0.6s;
        transition-property: transform;
    }
}

@media (max-width: 500px)
{
    .background-cards-hover
    {
        transform: scale(1.075);
        transform-origin: right bottom;
        transition-duration: 0.6s;
        transition-property: transform;
    }
}

@media (max-width: 400px)
{
    .cards
    {
        margin-left: 11%;
    }

    .background-cards-hover
    {
        transform: scale(1.09);
        transform-origin: right bottom;
        transition-duration: 0.6s;
        transition-property: transform;
    }
}
</style>

<div class="cards">
        <div class="card-img-container">
            <img alt="cards image background">
        </div>
        <div class="cards-content">
            <p><slot name="content"></slot></p>
            <slot name="dropdown"></slot>
        </div>

    <div class="background-cards"></div>
</div>
`;

const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = cardTemplateHtml;

class Card extends HTMLElement {
    constructor()
    {
        super();

        this.attachShadow({mode: 'open'})
            .appendChild(cardTemplate.content.cloneNode(true));
    }

    connectedCallback()
    {
        let $card = this.shadowRoot.querySelector('.cards');

        // Set event listener for mouseenter
        $card.addEventListener('mouseenter', () => {
            this.shadowRoot.querySelector('.background-cards')
                .setAttribute("class", "background-cards background-cards-hover");
        });
    
        // Set event listener for mouseleave
        $card.addEventListener('mouseleave', () => {
            this.shadowRoot.querySelector('.background-cards')
                .setAttribute("class", "background-cards background-cards-out");
        });

        // Define img url
        $card.querySelector('img').src = this.getAttribute('imgSrc');

        // Populate actions
        try
        {
            this.insertAdjacentHTML("beforeend", `
            <section slot="dropdown">
                <i class="fas fa-ellipsis-h" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div id="actionsContainer" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                </div>
            </section>`);
            let $actionsContainer = this.querySelector('#actionsContainer');
            let actions = Array.from(Array.from(this.children).filter(el => el.slot === "actions")[0].children)
                .map(el => {
                    return {
                        text: el.getAttribute('text'),
                        value: el.getAttribute('value')
                    }
                });

            // Generate buttons for each options
            actions.forEach(action => $actionsContainer
                .insertAdjacentHTML("beforeend", `<button class="dropdown-item" type="button" value=${action.value}>${action.text}</button>`));
            // Set event listener for all the buttons
            $actionsContainer.addEventListener('click', evt =>
            {
                if (evt.target.tagName != "BUTTON")
                    return;
                let evtData = {text: evt.target.innerText, value: evt.target.getAttribute('value')};
                this.dispatchEvent(new CustomEvent('action', { detail: evtData }));
            });
        }
        catch (err)
        {
            // No big deal if it throw an exception here
        }
        // Must add fonts from google out of the Shadow DOM !
        let linkNode = document.createElement("link"); 
        linkNode.type = "text/css"; 
        linkNode.rel = "stylesheet"; 
        linkNode.href = "//fonts.googleapis.com/css?family=Asap";
        document.head.appendChild(linkNode);

    }

    static Register()
    {
        customElements.define('card-component', Card);
    }
}

Card.Register();
