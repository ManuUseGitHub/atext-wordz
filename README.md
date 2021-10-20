# <img id="module-logo" src="https://raw.githubusercontent.com/ManuUseGitHub/module-template/master/at-wz-logo.svg"> <br/>[![npm version](https://badge.fury.io/js/atext-wordz.svg)](https://badge.fury.io/js/atext-wordz) [![License: MIT](https://img.shields.io/badge/License-MIT-61dafb.svg)](https://github.com/ManuUseGitHub/atext-wordz/blob/master/LICENSE)
## INTRO

Imagine you have that homework which requires you to build a list of all different words of a very long text; maybe a whole chapter of a book ! Then yould probably need something like this. 

Oh and what if you could also check the **number of usage**, the **the position of it's first appearence** or even it's **length**.

Ok, that's cool and fun!

[NPM package](https://www.npmjs.com/package/atext-wordz)

## Light demo
Assuming you have a `demo.txt` file in a `demo` folder at the same level as this `.js` file and you want to get word stats.
```js
const { fs } = require('fs') ;

const { getWStatsList , getWStatsObj , getWordList } = require( "../atext-wordz" );

fs.readFile( "./demo/demo.txt" , "utf8" , ( err , text ) => {

  const sortString = ` by number of a > than b's `;
  const cbOnNewWord = ( word ) => {
    // TODO: make first sector actions on new word found
  };

  const options = {  sortString , cbOnNewWord };

  const result = getWStatsList( text , options );

  console.log( result );
  // outputs :
  // < an array of word statistics sorted by most used words >

});
```