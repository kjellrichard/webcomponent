
const getData = (() => {
    let data
    return async () => {
        if (data) {
            return data
        }
        data = await fetchContent()
        return data
    }
})()
document.addEventListener("DOMContentLoaded", async (event) => {

    await initialize()

    const navigation = document.querySelector("navigation-component")
    const data = await getData()
    navigation.setAttribute("data", JSON.stringify(data.navigation))
    navigation.addEventListener("navigate", (event) => {
        document.location.href = event.detail.href
        handleLoadAndHash()
    })
})

async function initialize() {
    handleLoadAndHash(await getData())
}

async function fetchContent() {
    const response = await fetch("http://localhost:3000/data.json")
    return response.json()
}

async function handleLoadAndHash() {
    const hash = location.hash || "#/home"
    const { title, routes } = await getData()
    const route = routes.find(r => r.path === hash) || routes.find(r => r.path === "#/404")
    const { module, content } = route
    document.title = `${title} - ${module}`
    handleNavigation({ title, module, content })
}
function handleNavigation({ title, module, content }) {
    const header = document.querySelector("header-component")
    const contentEl = document.querySelector(".content")
    header.setAttribute("title", title)
    header.setAttribute("module", module)

    const moduleHeading = document.createElement("h2")
    moduleHeading.textContent = module
    const contentParagraph = document.createElement("p")
    contentParagraph.textContent = content


    contentEl.innerHTML = ""
    contentEl.appendChild(moduleHeading)
    contentEl.appendChild(contentParagraph)
}
