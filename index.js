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
        if(r.a.length && r.a.length && r.l.length) {
            console.log('You should calculate bro');
            return;
        }
        r.a = value; 
        return setInput();
    }
    const hasAction = () => r.a.trim().length;
    const setInput = () => input.value = `${r.f} ${r.a} ${r.l}`;
    const getFinal = () => `${r.f}${r.a}${r.l}`;
    const calculate = (showResult = true) => {
        try {
            const res = eval(getFinal());
            const formatter = new Intl.NumberFormat('en-US');
            if(showResult) result.innerText = formatter.format(res);
            return res;
        } catch(e) {
            result.innerText = 'ERROR';
            return null;
        }
    }
    const getKey = () => r.c.length ? 'b' : 'a';
    const toggleOn = () => {
        r.f = isOff() ? '0' : '';
        r.a = r.l = '';
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
        return setInput();
    }
    const clear = key => {
        if(!key) return;
        if(r[key].length < 2) {
            if(['a', 'l'].includes(key)) 
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
            !parseFloat(previousVal(key)) &&
            input.value.length === 1 &&
            value === '='
        ) return;

        /**
         * 
         */
        if(
            previousVal(key) === '.' &&
            ['+', '-', '*', '/'].includes(value)
        ) return;

        /**
         * 
         */
        if(
            parseInt(value) === 0 && 
            input.value.length === 1 &&
            previousVal(key) == 0
        ) return;

        console.log(`value: ${value},`, `current key: ${key},`);
        return setValue(key, value);
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
