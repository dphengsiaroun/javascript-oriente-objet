const s = 'Danyx';



function check(str, regex) {
    if (str.match(regex)) {
        console.log(str, regex.toString(), 'true');
    } else {
        console.log(str, regex.toString(), 'false');
    }
}

check('Dany', /y$/);
check('Dany', /^da/i);
check('Dany', new RegExp('^da', 'i'));
check('tytttyDany', /y.*y/i);
check('axbe', /a.b/i);
check('axxxbe', /a..b/i);
check('blabla/blabla', /\//);
check('blabla//blabla', /\/\//);
check('titib', /[ab]/);
check('titi', /^[^a]*$/);
check('ti', /^[^a][^a]$/);
check('tiab', /ab?$/);
check('tiab', /ab+$/);
check('///', /^((?!\/\/\/\/).)*$/);
check('12/03/1998', /^\d{2}([\/-])\d{2}\1\d{4}/ );

console.log('Coucou Dany Dany'.replace(/Dany/g, 'Jean-Louis'));
console.log('12/03/1998'.replace(/\//g, '-'));





