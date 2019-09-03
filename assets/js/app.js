
    $(document).ready(function () {
        // declare variables available to all functions that follow below
        // (these are not globals on window.global)
        var numb1 = '';
        var numb2 = '';
        var operation = '';
        var solved = false;
  
        // set up click handlers on all buttons
        $('.number').on('click', storeNumbers);
        $('.operator').on('click', storeOperator);
        $('#button-equal').on('click', solve);
        $('#button-clear').on('click', clear);
  
  
        /**
        *  Define all functions that will
        *  serve as click handlers.
        */
  
        function storeNumbers() {
          var numb = this.value;
  
          // if already solved a previous set,
          // clear calculator to start a new set
          if (solved) {
            clear();
          }
  
          if (!operation) {
            numb1 += numb;
            $('#first-number').html(numbro(numb1).format({thousandSeparated: true}))
          } else {
            numb2 += numb;
            $('#second-number').html(numbro(numb2).format({thousandSeparated: true}))
          }
        }
  
        function storeOperator() {
          // ignore operator button if there is previously solved operation
          if (solved) return;
  
          // ignore operator first number is empty
          if (numb1 === '') return;
  
          operation = this.value;
          $('#operator').html(this.innerText)
        }
  
        function solve() {
          // ignore equal button if either number is empty
          if (numb1 === '' || numb2 === '') return;
  
          numb1 = parseInt(numb1, 10);
          numb2 = parseInt(numb2, 10);
  
          var result;
  
          switch (operation) {
            case 'plus': result = numb1 + numb2; break;
            case 'minus': result = numb1 - numb2; break;
            case 'divide': result = numb1 / numb2; break;
            case 'times': result = numb1 * numb2; break;
            case 'power': result = Math.pow(numb1, numb2); break;
  
          }
          $('#result').html(numbro(result).format({thousandSeparated: true}));
          solved = true;
        }
  
        function clear() {
          numb1 = '';
          numb2 = '';
          operation = '';
          solved = false;
  
          $('#first-number').html(null);
          $('#second-number').html(null);
          $('#operator').html(null);
          $('#result').html(null);
        }
  
      });