const s = 'Danyx';



function check(str, regex) {
    if (str.match(regex)) {
        console.log('true');
    } else {
        console.log('false');
    }
}

check('Dany', /y$/);
check('Dany', /^da/i);
check('Dany', new RegExp('^da', 'i'));


