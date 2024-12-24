class UnitConverter {
    constructor() {
        this.units = {
            length: { 'm': 1, 'km': 0.001, 'mi': 0.000621371, 'ft': 3.28084 },
            area: { 'm²': 1, 'ha': 0.0001, 'acre': 0.000247105, 'ft²': 10.7639 },
            volume: { 'l': 1, 'ml': 1000, 'm³': 0.001, 'gal': 0.264172 },
            time: { 's': 1, 'ms': 1000, 'min': 0.0166666667, 'h': 0.0002777778, 'day': 0.0000115741, 'week': 0.0000016534, 'year': 3.168808781E-8 },
            speed: { 'm/s': 1, 'km/h': 3.6, 'mi/h': 2.23694, 'ft/s': 3.28084, 'kn': 1.94384 }, 
            mass: { 'kg': 1, 'g': 1000, 'mg': 1000000, 'lb': 2.20462, 'oz': 35.274 }, 
            energy: { 'J': 1, 'kJ': 0.001, 'cal': 0.239006, 'kcal': 0.000239006, 'Wh': 0.277778, 'kWh': 0.000277778 }, 
            pressure: { 'Pa': 1, 'kPa': 0.001, 'bar': 0.00001, 'atm': 0.00000986923, 'psi': 0.000145038 }, 
            data: { 'b': 1, 'B': 8, 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024, 'TB': 1024 * 1024 * 1024 * 1024 } 
        };
        this.currentUnitType = 'length'; 
        this.inputElement = document.getElementById('input');
        this.sourceUnitSelect = document.getElementById('sourceUnit');
        this.destinationUnitSelect = document.getElementById('destinationUnit');
        this.outputElement = document.getElementById('output');
        this.populateUnits();
    }

    populateUnits() {
        this.sourceUnitSelect.innerHTML = '';
        this.destinationUnitSelect.innerHTML = '';

        for (const unit in this.units[this.currentUnitType]) {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            this.sourceUnitSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit;
            this.destinationUnitSelect.appendChild(option2);
        }
        this.calculate();
    }

    calculate() {
        const inputValue = parseFloat(this.inputElement.value) || 0;
        const sourceUnit = this.sourceUnitSelect.value;
        const destinationUnit = this.destinationUnitSelect.value;

        const sourceValueInBase = inputValue / this.units[this.currentUnitType][sourceUnit];
        const result = sourceValueInBase * this.units[this.currentUnitType][destinationUnit];

        this.outputElement.value = result.toFixed(4); 
    }

    selectUnitType(type) {
        this.currentUnitType = type;
        this.populateUnits();
    }

    clearAll() {
        this.inputElement.value = 0;
        this.outputElement.value = 0;
    }
}

const converter = new UnitConverter(); 

