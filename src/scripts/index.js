import '../styles/styles.scss';

"strict mode"

const index = (() => {

    const state = {
        list: []
    }

    // function createCard(card) {
    //     const newCard = card || {
    //         id: Date.now(),
    //         nome: '',
    //         numero: '',
    //         mes: '',
    //         ano: '',
    //         cvv: ''
    //     }
       
    //     console.log(state.list)
    // }

    function saveLocalStorage() {
        const cardStr = JSON.stringify(state.list);

        localStorage.setItem('@saveCard:list', cardStr);
    }

    function loadLocalStorage() {
        const cardStr = localStorage.getItem('@saveCard:list');
        const loadedCard = cardStr ? JSON.parse(cardStr) : [];
        state.list = loadedCard;

        renderCard();
    }

    function updateCard(card) {
        const { id } = card.dataset;
        const inputs = card.querySelectorAll('input');
        const cardUpdate = state.list.find(atual => atual.id === id);

        cardUpdate.nome = inputs[0].value;
        cardUpdate.numero = inputs[1].value;
        cardUpdate.mes = inputs[2].value;
        cardUpdate.ano = inputs[3].value;
        cardUpdate.cvv = inputs[4].value;

        renderCard();
        console.log(state.list);
    }

    function validateCard(card) {
        let error = true;

        const inputs = card.querySelectorAll('input');

        const nome = inputs[0].value;
        const numero = inputs[1].value;
        const mes = inputs[2].value;
        const ano = inputs[3].value;
        const cvv = inputs[4].value;

        if (nome === '' || nome == Number) {
            error = false;
            alert('O campo deverá ser preenchido com Nome Completo.');
        }
        else if (numero === String || numero.length < 16 || numero.length > 17) {
            error = false;
            alert('O campo CARD NUMBER deve ser preenchido com 16 numeros.');
        }
        else if (mes <   1 || mes > 12) {
            error = false;
            alert('O mes deverá ser entre 01 a 12.');
        }
        else if (ano < 2022 || ano > 2060) {
            error = false;
            alert('O ano deverá ser entre 2022 a 2060.');
        }
        else if (cvv < 0 || cvv > 999) {
            error = false;
            alert('O Codigo de Seguranca deverá ter 3 digitos.');
        }

        return error;
    }

    function renderCard() {
        saveLocalStorage();
        const { list } = state;
        const container = document.querySelector('#form');
        const confirmed = document.querySelector('.confirmed');
        // container.innerHTML = '';     
        

        
        if (list.length) {
            container.style.display = "none";
            confirmed.style.display = "flex";
            
            setTimeout(() => {
                container.style.display = "flex";
                confirmed.style.display = "none";
            }, 2000);
            list.forEach(({nome, numero, mes, ano, cvv}) => {
                const inputs = container.querySelectorAll('input');
                inputs[0].value = nome;
                inputs[1].value = numero;
                inputs[2].value = mes;
                inputs[3].value = ano;
                inputs[4].value = cvv;
            })
        }
    }

    function saveCard(card) {
        const inputs = document.forms.formulario.querySelectorAll('input');
        const {id} = card.dataset;
        
        const nome = inputs[0].value;
        const numero = inputs[1].value;
        const mes = inputs[2].value;
        const ano = inputs[3].value;
        const cvv = inputs[4].value;
        
        const cardSave = {
            id: id,
            nome: nome,
            numero: numero,
            mes: mes,
            ano: ano,
            cvv: cvv
        }
        console.log('save',state.list);
        state.list.push(cardSave);
        renderCard()
    }

    function events() {
        document.forms.formulario.addEventListener('input', () => {
            const { cardHolder, cardNumber, MM, YY, cvv } = document.forms.formulario;

            document.querySelector(".nameCartao").innerHTML =  cardHolder.value;
            document.querySelector(".numCartao").innerHTML =  cardNumber.value;
            document.querySelector(".expMes").innerHTML =  MM.value;
            document.querySelector(".expAno").innerHTML =  YY.value;
            document.querySelector(".cvvCartao").innerHTML =  cvv.value;
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

                if (state.list.length){
                    updateCard(card);
                    console.log(state.list);
                }
                else {
                    saveCard(card);
                }
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