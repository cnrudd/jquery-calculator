
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
        $('#button-clear-entry').on('click', clearEntry);
  
        $(document).on('keydown', function(evt) {
            var key = evt.key;
   
            if (/[\d.]/.test(key)) {
                storeNumbers(evt);
                return;
            }

            if (/[\/\*\+\-\^]/.test(key)) {
                storeOperator(evt);
                return;
            }

            if (/^Enter$/.test(key)) {
                solve();
                return;
            }

            if (/^Delete$/.test(key)) {
                clear();
                return;
            }

            if (/^Backspace$/.test(key)) {
                clearEntry();
                return;
            }
        });

        /**
        *  Define all functions that will
        *  serve as click handlers.
        */
  
        function storeNumbers(evt) {
          var numb = evt.type == 'keydown' ? evt.key : this.value;
  
          // if already solved a previous set,
          // clear calculator to start a new set
          if (solved) {
            clear();
          }
  
          if (!operation) {
            numb1 += numb;
            displayNumber(numb1, '#first-number');
          } else {
            numb2 += numb;
            displayNumber(numb2, '#second-number');
          }
        }
  
        function displayNumber(numb, divSel) {
            var formatted;
            if (/\.$/.test(numb)) {
                formatted = numbro(numb.replace(/\.$/, '')).format({thousandSeparated: true}) + '.';
            } else {
                formatted = numbro(numb).format({thousandSeparated: true});
            }
            $(divSel).html(formatted);
        }

        function storeOperator(evt) {
          // ignore operator button if there is previously solved operation
          if (solved) return;
  
          // ignore operator first number is empty
          if (numb1 === '') return;
  
          var btn;
          if (evt.type == 'keydown') {
              switch (evt.key) {
                  case '-': btn = $('#button-minus')[0]; break;
                  case '+': btn = $('#button-plus')[0]; break;
                  case '*': btn = $('#button-multiply')[0]; break;
                  case '/': btn = $('#button-divide')[0]; break;
                  case '^': btn = $('#button-power')[0]; break;
              }
          } else {
              btn = this;
          }
         
          operation = btn.value;
          $('#operator').html(btn.innerText)
        }
  
        function solve() {
          // ignore equal button if either number is empty
          if (numb1 === '' || numb2 === '') return;
  
          numb1 = parseFloat(numb1);
          numb2 = parseFloat(numb2);
  
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
  
        function clearEntry() {
            if (numb2 != ''){
                numb2 = '';
                $('#second-number').html(null);
                $('#result').html(null);
                solved = false;
                return;
            }

            if (operation != ''){
                operation = '';
                $('#operator').html(null);
                return;
            }

            if (numb1 != ''){
                numb1 = '';
                $('#first-number').html(null);
                return;
            }

          
          }

      });