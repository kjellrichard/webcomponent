class NavigationComponent extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({ mode: 'open' })
        //const link = document.createElement('link');
        //link.setAttribute('rel', 'stylesheet');
        //link.setAttribute('href', '/navigation/NavigationComponent.css');
        //shadowRoot.appendChild(link);
        shadowRoot.innerHTML += `
            <style>
                nav {
                    width: 250px;
                    background-color: #f4f4f4;
                    border-right: 1px solid #ccc;
                    padding: 1rem;
                    box-sizing: border-box;
                    height: 100%;
                }

                nav ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                nav ul li {
                    margin: 1rem 0;
                }

                nav ul li a {
                    text-decoration: none;
                    color: #333;
                }
            </style>
            <nav>
                
            </nav>
        `
        this.render = this.render.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }
    connectedCallback() {
        this.shadowRoot.addEventListener('click', this.handleClick)
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('click', this.handleClick)
    }
    static get observedAttributes() {
        return ['data']
    }

    render() {
        const data = JSON.parse(this.getAttribute('data'))
        const nav = this.shadowRoot.querySelector('nav')
        nav.innerHTML = `
            <ul>
                ${data.map(item => `<li><a href="${item.url}">${item.text}</a></li>`).join('')}
            </ul>
        `
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data' && oldValue !== newValue) {
            this.render()
        }
    }
    handleClick(event) {
        const link = event.target.closest('a')
        if (link) {
            event.preventDefault()
            const href = link.getAttribute('href')
            const text = link.textContent
            this.emit('navigate', { href, text })
        }
    }

    emit(name, detail) {
        this.dispatchEvent(new CustomEvent(name, {
            bubbles: true,
            detail
        }))
    }

}

customElements.define('navigation-component', NavigationComponent)