const REDIRECT_VERSION = "3.8";

function getCurrVerInURL() {
    let url = new URL(document.URL);
    let path = url.pathname;
    let parts = path.split("/");
    return parts[1];
}

function getAvailableVersions() {
    let ver_switcher_span = document.getElementsByClassName("version_switcher_placeholder");
    if (ver_switcher_span.length == 0) {
        throw new Error("No elements found with the class name 'version_switcher_placeholder'");
    }
    ver_switcher_span = ver_switcher_span[0];
    if (ver_switcher_span.children.length == 0) {
        throw new Error("No child elements of element with the class name 'version_switcher_placeholder'");
    }
    let ver_selector = ver_switcher_span.children[0];


    let options = [];
    for (let i = 0; i < ver_selector.options.length; i++) {
        option = ver_selector.options[i];
        options.push(option.value);
    }
    return options;
}

function filterByRedirectVersion(element) {
    return element == REDIRECT_VERSION;
}

let available_versions = getAvailableVersions();
console.log("Available version: " + available_versions);
if (available_versions.filter(filterByRedirectVersion).length == 0) {
    throw new Error("Could not find the requested python version " + REDIRECT_VERSION);
}

let url = document.URL;
console.log("URL: " + url);
let curr_ver = getCurrVerInURL();
console.log("Currently at docs for version " + curr_ver);
url = url.replace(curr_ver, REDIRECT_VERSION);
console.log("Redirecting to docs for version " + REDIRECT_VERSION);
location.replace(url);
