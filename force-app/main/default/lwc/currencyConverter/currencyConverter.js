import { LightningElement } from 'lwc';

export default class CurrencyConverter extends LightningElement {
    amount = 1;
    fromCurrency = 'USD';
    toCurrency = 'EUR';
    convertedAmount = 0;
    currencyOptions;

    connectedCallback(){
        this.fetchSymbols();
    }


    changeHandler(event){
        if(event.target.name === 'amount'){
            this.amount = event.target.value;
            console.log('amount changed');
        }
            if(event.target.name === 'fCurrency'){
                this.fromCurrency = event.target.value;
                console.log('fromCurrency changed');
            }
            if(event.target.name === 'tCurrency'){
                this.toCurrency = event.target.value;
                console.log('toCurrency changed');
            }
        }

       async fetchSymbols(){
            const response = await fetch('https://api.frankfurter.dev/v1/currencies');
            const data = await response.json();
            this.currencyOptions = Object.keys(data).map(currency => ({
                label: currency,
                value: currency
            }));
        }

        convertCurrency(event){
            this.convert(this.fromCurrency, this.toCurrency, this.amount);
        
        }

      convert(from, to, amount) {
  fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
    .then((resp) => resp.json())
    .then((data) => {
      const conAmount = (amount * data.rates[to]).toFixed(2);
      this.convertedAmount = conAmount;
      alert(`${amount} ${from} = ${conAmount} ${to}`);
    });
  }
  }