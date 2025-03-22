//code reference: https://dev.to/dhruvangg/a-routing-system-in-javascript-for-single-page-application-1k42
class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        window.addEventListener("hashchange", () => this.handleRouteChange());
        this.handleRouteChange();
    }
    handleRouteChange() {
        const currentPath = window.location.hash.slice(1);
        const route = this.routes[currentPath];
        if (route) {
            route();
        } else {
            this.routes["/404"]();
        }
    }
}

//applying (using iframe tag to replace content of the page)
const router = new Router(
    {   
        "/": () => (document.getElementById("iframeHTML").src = "./templates/home.html"),
        "/about": () => (document.getElementById("iframeHTML").src = "./templates/about.html"),
        "/new-password": () => (document.getElementById("iframeHTML").src = "./templates/generator.html"),
        "/saved-passwords": () => (document.getElementById("iframeHTML").src = "./templates/saved-passwords.html"),
        "/404": () => (document.getElementById("view").innerHTML = "Error 404: Page not found."),
    }
);




