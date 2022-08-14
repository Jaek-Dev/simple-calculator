const calculator = document.querySelector('.calculator');
const input = document.querySelector('input');
const result = document.getElementById('result');
const c = ['+', '-', '*', '/'];
const r = {
    a: '',
    b: '',
    c: '',
}

if(calculator && input && result) {
    const btns = document.querySelectorAll('button');
    const isOff = () => calculator.classList.contains('off');
    const setAction = value => {
        if(r.a.length && r.c.length && r.b.length) {
            const calculated = calculate(false);
            //Reset the calculator with the result`
            reset(calculated);
            //Add the value to a
            r.c = value;
            return;
        }
        r.c = value; 
        return setInput();
    }
    const reset = (value = 0) => {
        console.log('from reset function', value);
        r.a = String(value);
        r.b = r.c = '';

        setResult();
        setInput();
    }
    const setInput = () => input.value = `${r.a} ${r.c} ${r.b}`;
    const setResult = (res = '&nbsp;') => result.innerHTML = res;
    const getFinal = () => `${r.a}${r.c}${r.b}`;
    const isCalculated = () => Boolean(result.innerHTML.length && result.innerHTML !== '&nbsp;');
    const calculate = (showResult = true) => {
        try {
            const res = eval(getFinal());
            const formatter = new Intl.NumberFormat('en-US');
            if(showResult) setResult(formatter.format(res));
            return res;
        } catch(e) {
            setResult('ERROR');
            return null;
        }
    }
    const getKey = () => r.c.length ? 'b' : 'a';
    const toggleOn = () => {
        r.a = isOff() ? '0' : '';
        r.b = r.c = '';
        result.innerHTML = '&nbsp;';

        setInput();
        return calculator.classList.toggle('off'); 
    }
    const previousVal = key => {
        if(r[key].length < 2)
        return r[key];
        return r[key].substring(
            r[key].length - 1,
            r[key].length
        );
    }

    /**
     * 
     * @param {*} key The key to set at result (r) object
     * @param {*} value The value to set at result (r) object
     * @returns void
     */
    const setValue = (key, value) => {
        if(value === '=') {
            calculate();
            return;
        }

        if(c.includes(value))
        return setAction(value);

        if(
            r[key].length === 1 && 
            parseInt(previousVal(key)) === 0 &&
            value !== '.'
        ) r[key] = value
        else r[key] = r[key] + value;
        console.log(r);
        return setInput();
    }
    const clear = key => {
        if(!key) return;
        console.log(key);
        if(r[key].length < 2) {
            if(['b', 'c'].includes(key)) 
            r[key] = '';
            else r[key] = '0';
        } else {
            r[key] = r[key].substring(
                0, r[key].length - 1
            ).trim();
        } return setInput();
    }

    //Pressing a number
    const press = value => {
        //Get the current key to be used for evaluation
        const key = getKey();

        /**
         * 
         */
        if(
            previousVal(key) == 0 &&
            input.value.length === 1 &&
            value === '='
        ) return;

        /**
         * Check if the clicked button is dot (.)
         * or the current key value has a dot (.)
         */
        if(
            value === '.' &&
            r[key].includes('.')
        ) return;

        /**
         * 
         */
        if(
            parseInt(value) === 0 && 
            input.value.length === 1 &&
            previousVal(key) == 0
        ) return;
        
        return isCalculated() ? reset(value) : setValue(key, value);
    }
    
    
    
    
    
    
    if(btns) {
        btns.forEach(btn => {
            btn.addEventListener(
                'click', e => {
                    const value = e.target.innerText.toLowerCase();
                    
                    if (value === 'a/c') return toggleOn();
                    if(isOff()) return alert('Calculator is off! Please turn it on first.');
                    if(value === 'c') return clear(getKey());
                    // if(value === '=') return calculate();
                    return press(value);
                }
            );
        });
    }
}
