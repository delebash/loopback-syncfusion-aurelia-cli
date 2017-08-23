export default {
    title: "Aurelia Skeleton",
    apiBaseUrl: "data",
    root: "layouts/layout-main",
    routeUrl: "config.routes.json",
    pushState: false,
    viewStrategy: {
        viewModelResolve: "customFolder",
        viewModelBasePath: "viewmodels/"
    },
    configUrl: null
}
