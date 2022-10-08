import '../styles/styles.scss';

"strict mode"

const index = (() => {
    const state = {
        card: {
            nome: '',
            numero: '',
            mes: '',
            ano: '',
            cvv: ''
        }
    };

    function saveLocalStorage() {
        const cardStr = JSON.stringify(state.card);

        localStorage.setItem('@saveCard:card', cardStr);
    }

    function loadLocalStorage() {
        const cardStr = localStorage.getItem('@saveCard:card');
        const loadedCard = cardStr ? JSON.parse(cardStr) : { nome: '', numero: '', mes: '', ano: '', cvv: '' };
        state.card = loadedCard;
    }

    function updateCard(card) {
        const inputs = card.querySelectorAll('input');

        state.card.nome = inputs[0].value;
        state.card.numero = inputs[1].value;
        state.card.mes = inputs[2].value;
        state.card.ano = inputs[3].value;
        state.card.cvv = inputs[4].value;

        renderCard();
    }

    function validateCard(card) {
        let error = true;

        const inputs = card.querySelectorAll('input');

        const nome = inputs[0].value;
        const numero = inputs[1].value;
        const mes = inputs[2].value;
        const ano = inputs[3].value;
        const cvv = inputs[4].value;

        if (nome === '' || nome === Number || nome.length < 4) {
            error = false;
            inputs[0].closest('label').insertAdjacentHTML('beforeend', `
                <div class='error'>ERRO: O campo deverá ser preenchido com Nome Completo.</div>            
            `);
        }
        else if (numero === String || numero.length < 16 || numero.length > 17) {
            error = false;
            inputs[1].closest('label').insertAdjacentHTML('beforeend', `
                <div class='error'>ERRO: O campo CARD NUMBER deve ser preenchido com 16 numeros.</div>            
            `);
        }
        else if (mes <   1 || mes > 12) {
            error = false;
            inputs[2].closest('label').insertAdjacentHTML('beforeend', `
                <div class='error'>ERRO: O mes deverá ser entre 01 a 12.</div>            
            `);
        }
        else if (ano < 2022 || ano > 2060) {
            error = false;
            inputs[3].closest('label').insertAdjacentHTML('beforeend', `
                <div class='error'>ERRO: O ano deverá ser entre 2022 a 2060.</div>            
            `);
        }
        else if (cvv < 0 || cvv > 999) {
            error = false;
            inputs[4].closest('label').insertAdjacentHTML('beforeend', `
                <div class='error'>ERRO: O Codigo de Seguranca deverá ter 3 digitos!</div>            
            `);
        }

        return error;
    }

    function renderCard() {
        saveLocalStorage();
        const form = document.querySelector('#form');
        const confirmed = document.querySelector('.confirmed');
        const inputs = form.querySelectorAll('input');
        
        form.style.display = "none";
        confirmed.style.display = "flex";
        
        inputs[0].value = state.card.nome;
        inputs[1].value = state.card.numero;
        inputs[2].value = state.card.mes;
        inputs[3].value = state.card.ano;
        inputs[4].value = state.card.cvv;
        
        setTimeout(() => {
            form.style.display = "flex";
            confirmed.style.display = "none";
        }, 2000);
    }

    function events() {

        document.forms.formulario.addEventListener('keydown', event => {
            const input = event.target;
            
            if (event.key === 'Backspace' && input.value.length === 0) {
                event.preventDefault();
                const { cardHolder, cardNumber, MM, YY } = document.forms.formulario;

                if (input.name === 'cvv') YY.focus();
                else if (input.name === 'YY') MM.focus();
                else if (input.name === 'MM') cardNumber.focus();
                else if (input.name === 'cardNumber') cardHolder.focus();
            }
        });

        document.forms.formulario.addEventListener('input', () => {
            const { cardHolder, cardNumber, MM, YY, cvv } = document.forms.formulario;

            cardNumber.value = cardNumber.value.slice(0, 16);
            MM.value = MM.value.slice(0, 2);
            YY.value = YY.value.slice(0, 4);
            cvv.value = cvv.value.slice(0, 3);

            if (cardNumber.value.length >= 16) MM.focus();
            if (MM.value.length >= 2) YY.focus();
            if (YY.value.length >= 4) cvv.focus();

            document.querySelector(".nameCartao").innerHTML =  cardHolder.value;
            document.querySelector(".numCartao").innerHTML =  cardNumber.value;
            document.querySelector(".expAno").innerHTML =  YY.value;
            document.querySelector(".cvvCartao").innerHTML =  cvv.value;
            document.querySelector(".expMes").innerHTML =  MM.value;
        });

        document.querySelector('#form').addEventListener('click', (event) => {
            const click = event.target;
            const cartao = document.querySelector('#cartao');

            if (click.closest('.cvv')){
                cartao.classList.add('rotate');
                cartao.classList.remove('padrao');
            }
            else {
                cartao.classList.remove('rotate');
                cartao.classList.add('padrao');
            }
        });

        document.forms.formulario.addEventListener('submit', event => {
            event.preventDefault();
            const click = event.target;
            const card =  click.closest('#form');
            
            if (validateCard(card)) {
                updateCard(card);
            }
        });
    }


    function init() {
        loadLocalStorage();
        events();
    }


    return {
        init
    }
    
})();

document.addEventListener('DOMContentLoaded', index.init);