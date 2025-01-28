

class HeaderComponent extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        //const link = document.createElement('link');
        //link.setAttribute('rel', 'stylesheet');
        //link.setAttribute('href', './header/HeaderComponent.css');
        //shadowRoot.appendChild(link);

        // Define the inner structure and styles of the component.
        shadowRoot.innerHTML += `
            <style>
                .header-component {
                    background-color: #333;
                    color: white;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                }

                .title {
                    font-size: 1.75rem;
                }

                .module {
                    font-size: 1rem;
                }
            </style>
            <div class="header-component">
                <h1 class="title"></h1>
                <h2 class="module"></h2>
            </div>
        `


    }

    connectedCallback() {
        // Update the content when the component is attached to the DOM.
        this.updateContent();
    }

    static get observedAttributes() {
        return ['title', 'module'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Update the content when attributes change.
        this.updateContent();
    }

    updateContent() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('module') || '';
        this.shadowRoot.querySelector('.title').textContent = title;
        this.shadowRoot.querySelector('.module').textContent = description;
    }
}

// Define the new element
customElements.define('header-component', HeaderComponent);