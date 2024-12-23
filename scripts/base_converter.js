class BaseConverter {
    constructor() {
        this.inputNumber = document.getElementById('input');
        this.sourceBase = document.getElementById('sourceBase');
        this.destinationBase = document.getElementById('destinationBase');
        this.displayResult = document.getElementById('result');
    }

    clearAll() {
        this.inputNumber.value = ""; 
        this.sourceBase.value = ""; 
        this.destinationBase.value = ""; 
        this.displayResult.value = "";
    }

    convert() {
        try {
            if(this.sourceBase < 2 || this.sourceBase > 36) throw new Error;
            const decimalValue = parseInt(this.inputNumber.value, this.sourceBase.value);
            this.displayResult.value = decimalValue.toString(this.destinationBase.value);
        }
        catch(Error) {
            this.displayResult.value = "Error";
        }
    }
}

const converter = new BaseConverter();