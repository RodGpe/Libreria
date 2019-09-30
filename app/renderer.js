//var resultEl = document.getElementById("campo-isbn");
console.log('estas en form js');
const electron = require('electron');   //electron del lado del "cliente"
const {ipcRenderer} = electron;     //ipc = iNTER pROCESS cOMMUNICATION, se comunica con el proceso main "servidor"
const path = require('path');

const form = document.querySelector('form');
const ipc = electron.ipcRenderer;   //el proceso "cliente"
form.addEventListener('submit',submitForm);
function submitForm(e){
    e.preventDefault(); //previene la accion default que haria el navegador, i.e, un post o get
    const autor = document.querySelector('#campo-autor').value;
    ipcRenderer.send('autor:valor', autor); //envia al proceso main el evento 'autor:valor' y el valor de autor
}

ipc.on("resultSent", function(evt, result){//escucha por el evento 'resultSent' que genera el proceso main despues del query
        let resultEl = document.getElementById("campo-autor");
        console.log(result);
        for(var i = 0; i < result.length;i++){
            //resultEl.innerHTML += "ID: " + result[i].paterno_autor.toString() + "<br/>";
            resultEl.setAttribute("value", result[i].paterno_autor.toString()); //
        }
    });
// CODIGO DE PRUEBAS -- IGNORAR

//const parser = new DOMParser(); //instancia para hacer parseo 
//const { shell } = require('electron'); //shell para preguntar que navegador usar 
//
//const linksSection = document.querySelector('.links');
//const errorMessage = document.querySelector('.error-message');
//const newLinkForm = document.querySelector('.new-link-form');
//const newLinkUrl = document.querySelector('.new-link-url');
//const newLinkSubmit = document.querySelector('.new-link-submit');
//const clearStorageButton = document.querySelector('.clear-storage');
//
//newLinkUrl.addEventListener('keyup', () => {
//  newLinkSubmit.disabled = !newLinkUrl.validity.valid;  //revisa si la entrada es una URL
//});
//
//const clearForm = () => {
//  newLinkUrl.value = null;
//}
//
//newLinkForm.addEventListener('submit', (event) => {
//  event.preventDefault();//para que chromium no haga http request
//
//  const url = newLinkUrl.value; //agarra lo que hay en el input text
//  fetch(url)
//    .then(validateResponse)
//    .then(response => response.text())
//    .then(parseResponse)
//    .then(findTitle)
//    .then(title => storeLink(title, url))
//    .then(clearForm)
//    .then(renderLinks)
//    .catch(error => handleError(error, url));
//});
//
//const parseResponse = (text) => {
//  return parser.parseFromString(text, 'text/html'); //toma texto y lo parsea al DOM
//}
//
//const findTitle = (nodes) => {
//  return nodes.querySelector('title').innerText;  //recoorre el DOM  y encuentra a <title>
//}
//
//const storeLink = (title, url) => {
//  localStorage.setItem(url, JSON.stringify({ title: title, url: url }));
//}
//const getLinks = () => {
//  return Object.keys(localStorage)
//    .map(key => JSON.parse(localStorage.getItem(key)));
//}
//
//const convertToElement = (link) => {
//  return `<div class="link"><h3>${link.title}</h3>
//          <p><a href="${link.url}">${link.url}</a></p></div>`;
//}
//
//const renderLinks = () => {
//  const linkElements = getLinks().map(convertToElement).join('');
//  linksSection.innerHTML = linkElements;
//}
//
//clearStorageButton.addEventListener('click', () => {
//  localStorage.clear();
//  linksSection.innerHTML = '';  //quita todo del UI
//});
//
//const handleError = (error, url) => {
//  errorMessage.innerHTML = `
//    There was an issue adding "${url}": ${error.message}
//  `.trim();
//  setTimeout(() => errorMessage.innerText = null, 5000);
//}
//
//const validateResponse = (response) => {
//  if (response.ok) { return response; }
//  throw new Error(`Status code of ${response.status} ${response.statusText}`);
//}
//
//linksSection.addEventListener('click', (event) => {
//  if (event.target.href) {
//    event.preventDefault();
//    shell.openExternal(event.target.href);
//  }
//});
//
//renderLinks();
//
////empieza el codigo de la libreria