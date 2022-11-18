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



/* ----------------------- Elementi vari presi dall'ID ---------------------- */
/* -------------------------------------------------------------------------- */
const elementoForm = document.getElementById('formOfferta');
const inputTipoLavoro = document.getElementById("worktype");
const inputSconto = document.getElementById("discountcode");
const scontoInvalido = document.getElementById("feedbackScontoInvalido");
const scontoValido = document.getElementById("feedbackScontoValido");
const spanPrezzo = document.getElementById("spanPrezzo");
const inputOre = document.getElementById("hoursrequired");
/* -------------------------------------------------------------------------- */

inputSconto.addEventListener('input', function () {
    resettaLabelSconto();
}, false)

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
        } else {
            scontoInvalido.innerHTML = "Il codice non esiste." // Aggiorna messaggio di codice invalido
            inputSconto.classList.add('is-invalid', 'text-danger');
            spanPrezzo.parentNode.parentNode.classList.add('d-none');
        }
    } else {
        spanPrezzo.parentNode.parentNode.classList.add('d-none');
    }
};

/* -------------------------------------------------------------------------- */
function resettaLabelSconto() {
    inputSconto.classList.remove('is-valid', 'is-invalid', 'text-danger');
    scontoValido.innerHTML = '';
    scontoInvalido.innerHTML = "Il formato del codice non è corretto.";
};

/* -------------------------------------------------------------------------- */