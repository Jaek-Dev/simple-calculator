const calculator = document.querySelector('.calculator');
const input = document.querySelector('input');
const result = document.getElementById('result');
const c = ['+', '-', '*', '/'];
const r = {
    f: '',
    l: '',
    a: '',
}

if(calculator && input && result) {
    const btns = document.querySelectorAll('button');
    const isOff = () => calculator.classList.contains('off');
    const setAction = value => {
        if(r.a.length && r.a.length && r.l.length) {
            console.log('You should calculate bro');
            return;
        }
        r.a = ` ${value} `;
        console.log(r);
        return setInput();
    }
    const hasAction = () => r.a.trim().length;
    const setInput = () => input.value = `${r.f}${r.a}${r.l}`;
    const getFinal = () => `${r.f}${r.a}${r.l}`;
    const calculate = (showResult = true) => {
        try {
            console.log(getFinal());
            const res = eval(getFinal());
            const formatter = new Intl.NumberFormat('en-US');
            if(showResult) result.innerText = formatter.format(res);
            return res;
        } catch(e) {
            result.innerText = 'ERROR';
            return null;
        }
    }
    const getNextKey = () => {
        if(
            r.f.length && 
            r.a.length
        ) return 'l';
        if(
            r.f.length && 
            !r.a.length
        ) return 'a';
        return 'f';
    }
    const getKey = () => {
        if(
            r.f.length && 
            r.a.length && 
            r.l.length
        ) return 'l';
        if(
            r.f.length && 
            r.a.length
        ) return 'a';
        return 'f';
    }
    const toggleOn = () => {
        if(isOff()) {
            r.f = '0';
            r.a = '';
            r.l = '';
        } else {
            r.f = '';
            r.a = '';
            r.l = '';
        }

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
    const setValue = (key, value) => {
        if(value === '=') {
            calculate();
            return;
        }

        if(['+', '-', '/', '*'].includes(value))
        return setAction(value);

        if(
            r[key].length === 1 && 
            previousVal(key) == 0 &&
            !['.', ...c].includes(value)
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
            );
        } return setInput();
    }
    const press = value => {
        const key = getKey();
        console.log(key);
        if(
            previousVal(key) == 0 &&
            input.value.length === 1 &&
            value === '='
        ) return;

        if(
            previousVal(key) === '.' &&
            ['+', '-', '*', '/'].includes(value)
        ) return;

        if(
            parseInt(value) === 0 && 
            input.value.length === 1 &&
            previousVal(key) == 0
        ) return;
        return setValue(key, value);
    }
    
    
    
    
    
    
    if(btns) {
        btns.forEach(btn => {
            btn.addEventListener(
                'click', e => {
                    const value = e.target.innerText.toLowerCase();
                    /* 
                    First check if calculator os on
                    */
                    if (value === 'a/c') {
                        //Just turn on the calculator
                        return toggleOn();
                    }
                    if(isOff()) {
                        return alert('Calculator is off! Please turn it on first.');
                    }
                    if(value === 'c') return clear(getKey());
                    return press(value);
                }
            );
        });
    }
}
