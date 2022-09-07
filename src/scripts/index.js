import '../styles/styles.scss';

"strict mode"

const index = (() => {

    const state = {
        list: []
    }

    function createCard(nome, numero, mes, ano, cvv) {
        const newCard = {
            nome: nome,
            numero: numero,
            mes: mes,
            ano: ano,
            cvv: cvv
        }
        state.list.push(newCard);
        console.log(state.list)
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

        document.forms.formulario.cvv.addEventListener('focus', () => {
            const cartao = document.querySelector('#cartao');
            
            cartao.classList.toggle('rotate');
        });

        document.forms.formulario.addEventListener('submit', event => {
            event.preventDefault();

            const { nome, numero, mes, ano, cvv } = document.forms.formulario;
            createCard();
            // text.value = '';
        } )
    }


    function init() {
        
        events();
    }


    return {
        init
    }
    
})();

document.addEventListener('DOMContentLoaded', index.init);