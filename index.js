const calculator = document.querySelector('.calculator');
const input = document.querySelector('input')
if(calculator && input) {
    //functions
    function isOff() {
        return calculator.classList.contains('off');
    }
    
    function toggleOn() {
        if(isOff()) input.value = 0;
        else input.value = '';
        return calculator.classList.toggle('off')
    }
    
    function previousVal() {
        return input.value.substr(-1);
    }
    
    function press(value) {
        if(
            previousVal() === '.' &&
            ['+', '-', '*', '÷']
            .includes(value)
        ) return;
        
        
        input.value = input.value + value;
    }
    
    function clear() {
        if(input.value.length === 1)
        return input.value = 0;
        input.value = input.value.substr(
            0, input.value.length - 1
        );
    }
    
    
    
    
    
    
    const btns = document.querySelectorAll('button');
   
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
                    if(value === 'c') return clear();
                    return press(value);
                }
            );
        });
    }
 
}
