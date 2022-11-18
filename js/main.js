"use strict";

/**
 * L'obbiettivo di questo esercizio in JS è di:
 * - Modificare il form in modo che possa prendere dati e dare un prezzo finale
 *  - Dovrò cambiarne il comportamento di default
 *  - Dovrò anche validare che tutti i dati vadano bene
 * 
 * - Usare i prezzi per orario specificati
 *  - Back-end: 20.50
 *  - Front-end: 15.30
 *  - Analisi Progettuale: 33.60
 * 
 * - Permettere l'uso di codici di sconto:
 *  - YHDNU32
 *  - JANJC63
 *  - PWKCN25
 *  - SJDPO96
 *  - POCIE24
 * 
 * - Se il codice non è valido, informare l'utente che il codice è sbagliato
 * e calcolare il prezzo senza sconti
 * 
 * - Mostrare il risultato del prezzo in modo accessibile all'utente
 */


/* -------------------------------------------------------------------------- */
const codiciSconto = {
    YHDNU32: true,
    JANJC63: true,
    PWKCN25: true,
    SJDPO96: true,
    POCIE24: true,
};

const prezzi = {
    frontend: 15.30,
    backend: 20.50,
    analysis: 33.60,
};

const formattatorePrezzo = new Intl.NumberFormat(navigator.languages[0], {
    style: 'currency',
    currency: 'EUR'
});

const carteSiti = {
    cabin: {
        nome: "Cabin Website",
        path_immagine: "./img/portfolio/cabin.png",
    },
    cake: {
        nome: "Cake Website",
        path_immagine: "./img/portfolio/cake.png",
    },
    circus: {
        nome: "Circus Website",
        path_immagine: "./img/portfolio/circus.png",
    },
    game: {
        nome: "Game Website",
        path_immagine: "./img/portfolio/game.png",
    },
    safe: {
        nome: "Safe Website",
        path_immagine: "./img/portfolio/safe.png",
    },
    submarine: {
        nome: "Submarine Website",
        path_immagine: "./img/portfolio/submarine.png",
    },
}



/* ----------------------- Elementi vari presi dall'ID ---------------------- */
/* -------------------------------------------------------------------------- */
const elementoForm = document.getElementById('formOfferta');
const inputTipoLavoro = document.getElementById("worktype");
const inputSconto = document.getElementById("discountcode");
const scontoInvalido = document.getElementById("feedbackScontoInvalido");
const scontoValido = document.getElementById("feedbackScontoValido");
const spanPrezzo = document.getElementById("spanPrezzo");
const inputOre = document.getElementById("hoursrequired");
const rowCarte = document.getElementById("row-carte");
/* -------------------------------------------------------------------------- */

inputSconto.addEventListener('input', function () {
    resettaLabelSconto();
}, false)

for (const carta in carteSiti) {
    rowCarte.innerHTML += componenteCard(carteSiti[carta].nome, carteSiti[carta].path_immagine);
}

/* ---------------------------- Sezione funzioni ---------------------------- */
/* -------------------------------------------------------------------------- */
function mandaForm(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    elementoForm.classList.add('was-validated');
    resettaLabelSconto();

    const formValido = elementoForm.checkValidity();
    if (formValido) {
        const codiceInserito = inputSconto.value;
        let prezzo = prezzi[inputTipoLavoro.value] * inputOre.value;
        if (codiceInserito) { // Se effettivamente c'è un codice da controllare
            if (codiciSconto.hasOwnProperty(codiceInserito)) { // Se il codice esiste
                if (codiciSconto[codiceInserito]) { // ed è ancora valido

                    prezzo = prezzo * (1 - 0.25); // Applica sconto
                    codiciSconto[codiceInserito] = false; // Marchia codice come scaduto / usato
                    impostaScontoComeValido(); // Marchia input come valido
                    mostraPrezzo(prezzo);
                    
                } else { // Altrimenti è scaduto
                    impostaScontoComeScaduto();
                }
            } else { // Altrimenti non esiste proprio
                impostaScontoComeInesistente();
            }
        } else {
            mostraPrezzo(prezzo);
        }
    } else { // Altrimenti il form non è valido
        nascondiPrezzo();
    }
};

/* -------------------------------------------------------------------------- */
function mostraPrezzo(prezzo) {
    spanPrezzo.parentNode.parentNode.classList.remove('d-none'); // Mostra prezzo
    spanPrezzo.innerHTML = formattatorePrezzo.format(prezzo);
}

/* -------------------------------------------------------------------------- */
function nascondiPrezzo() {
    spanPrezzo.parentNode.parentNode.classList.add('d-none');
}

/* -------------------------------------------------------------------------- */
function impostaScontoComeValido() {
    scontoValido.innerHTML = "Codice valido! Sconto del 25% applicato"; // Aggiorna messaggio di codice valido
    inputSconto.classList.add('is-valid', 'text-success');
}

/* -------------------------------------------------------------------------- */
function impostaScontoComeInesistente() {
    scontoInvalido.innerHTML = "Il codice non esiste."; // Aggiorna messaggio di codice invalido
    inputSconto.classList.add('is-invalid', 'text-danger');
    nascondiPrezzo();
}

/* -------------------------------------------------------------------------- */
function impostaScontoComeScaduto() {
    scontoInvalido.innerHTML = "Codice scaduto o già utilizzato."; // Aggiorna messaggio di codice invalido
    inputSconto.classList.add('is-invalid', 'text-danger');
    nascondiPrezzo();
}

/* -------------------------------------------------------------------------- */
function resettaLabelSconto() {
    inputSconto.classList.remove('is-valid', 'is-invalid', 'text-danger', 'text-success');
    scontoValido.innerHTML = '';
    scontoInvalido.innerHTML = "Il formato del codice non è corretto.";
};

/* -------------------------------------------------------------------------- */
function componenteCard(testoCard, path_immagine) {
    return `
    <div class="col-md-4">
        <div class="card">
            <div class="card-img-top">
                <img class="img-fluid" src="${path_immagine}" alt="A drawing of a cabin">
            </div>
            <div class="card-body">
                <p class="fs-5 fw-semibold m-0 mb-2">${testoCard}</p>
                <button class="mx-1 btn btn-info btn-sm">Preview</button>
                <button class="mx-1 btn btn-outline-info btn-sm">Visit site</button>
            </div>
        </div>
    </div>
    `;
}