import '../styles/styles.scss';

"strict mode"

const index = (() => {

    const state = {
        list: []
    }

    function createCard(nome, numero, mes, ano, cvv) {
        const newCard = {
            id: Date.now(),
            nome: nome,
            numero: numero,
            mes: mes,
            ano: ano,
            cvv: cvv
        }
        state.list.push(newCard);
        console.log(state.list);
        renderCard();
    }

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

    function renderCard() {
        saveLocalStorage();
        const { list } = state;
        const container = document.querySelector('#form');
        container.innerHTML = '';

        
        list.forEach(({nome, numero, mes, ano, cvv}) => {
            container.insertAdjacentHTML('beforeend', /* html */ `
                <form id="form" name="formulario">
                    <label>cardholder name
                        <input value="${nome}" name="cardHolder" maxlength="30" type="text" placeholder="e.g. Jane Appleseed" required>
                    </label>
            
                    <label>card number
                        <input value="${numero}" name="cardNumber" minlength="16" maxlength="16" type="number" placeholder="e.g. 1234 5678 9123 0000" required>
                    </label>
            
                    <div class="fift">
                        <label class="exp">exp. date (mm/yy)
                
                            <div class="input-exp">
                                <input value="${mes}" name="MM" type="number" min="01" max="12" placeholder="MM" required>
                                <input value="${ano}" name="YY" type="number" min="2022" step="1" placeholder="YY" required>
                            </div>
                
                        </label>
                
                        <label class="cvv">cvv
                            <input value="${cvv}" name="cvv" type="number" minlength="3" placeholder="e.g. 123" required>
                        </label>
                    </div>
                    <button>Confirm</button>
                </form>
            `);
        });
        
    }

    function saveCard() {
        const inputs = document.querySelectorAll('input');

        const nome = inputs[0].value;
        const numero = inputs[1].value;
        const mes = inputs[2].value;
        const ano = inputs[3].value;
        const cvv = inputs[4].value;

        createCard(nome, numero, mes, ano, cvv );
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

            saveCard();
        } )
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