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

const elementoForm = document.getElementById('formOfferta');
const inputTipoLavoro = document.getElementById("worktype");
const inputSconto = document.getElementById("discountcode");
const feedbackScontoInvalido = document.getElementById("feedbackScontoInvalido");
const feedbackScontoValido = document.getElementById("feedbackScontoValido");
const spanPrezzo = document.getElementById("spanPrezzo");
const inputOre = document.getElementById("hoursrequired");
const formattatorePrezzo = new Intl.NumberFormat(navigator.languages[0], {
    style: 'currency',
    currency: 'EUR'
});

inputSconto.addEventListener("input", () => {
    feedbackScontoInvalido.innerHTML = "Il codice di sconto non esiste.";
});

/* ---------------------------- Sezione funzioni ---------------------------- */
/* -------------------------------------------------------------------------- */
function mandaForm(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    elementoForm.classList.add('was-validated');
    const formValido = elementoForm.checkValidity();
    if (formValido) {
        let prezzo = prezzi[inputTipoLavoro.value] * inputOre.value;
        validaSconto();

        aggiornaPrezzo(spanPrezzo, prezzo)
    } else {
        elementoPrezzo.parentNode.parentNode.classList.add('d-none');
    }
};

function aggiornaPrezzo(elementoPrezzo, numeroPrezzo) {
    elementoPrezzo.parentNode.parentNode.classList.remove('d-none');
    elementoPrezzo.innerHTML = `${formattatorePrezzo.format(numeroPrezzo)}`;
};

function validaSconto() {
    const codice = inputSconto.value;
    inputSconto.checkValidity();
    feedbackScontoValido.innerHTML = '';
    feedbackScontoInvalido.innerHTML = '';
    switch (codiciSconto[codice]) {
        case undefined:
            impostaLabelSconto(
                'is-invalid',
                'is-valid',
                "",
                "Questo codice non esiste."
            );
            break;

        case false:
            impostaLabelSconto(
                'is-invalid',
                'is-valid',
                "",
                "Il codice è scaduto, oppure è gia stato utilizzato."
            );
            break;

        case true:
            impostaLabelSconto(
                'is-valid',
                'is-invalid',
                "Il codice è valido! Sconto del 20% applicato",
                "Questo codice non esiste."
            )
            break;

        default:
            break;
    }
}

function impostaLabelSconto(classToAdd, classToRemove, validMessage, invalidMessage) {
    inputSconto.classList.add(classToAdd);
    inputSconto.classList.remove(classToRemove);
    feedbackScontoValido.innerHTML = validMessage;
    feedbackScontoInvalido.innerHTML = invalidMessage;
}
