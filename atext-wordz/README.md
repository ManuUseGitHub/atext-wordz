# <img id="module-logo" src="https://github.com/ManuUseGitHub/atext-wordz/blob/master/at-wz-logo.svg"> <img id="module-logo" src="https://raw.githubusercontent.com/ManuUseGitHub/module-template/master/at-wz-typo-logo.svg"> <br/> [![npm version](https://badge.fury.io/js/atext-wordz.svg)](https://badge.fury.io/js/atext-wordz) [![License: MIT](https://img.shields.io/badge/License-MIT-61dafb.svg)](https://github.com/ManuUseGitHub/atext-wordz/blob/master/LICENSE)

Provides a list of words within an entire text alongside few statistics

---

## Getting started

1. Install the package
    ```bash
    $ npm i atext-wordz
    ```
2. Require it's functions
    ```js
    const { getWStatsList , getWStatsObj , getWordList } = require( "atext-wordz" );
    ```
3. Call it's functions
   Regarding your needs you have to pick in what format you wish to get the result.<br/>
   **NOTE :** You have **3 choices**
    ```jsx
    const result = getWStatsList( text , options );
    // ==> [ {}:wordstats(1), {}, {}, ... , {}:wordstats(N)    ]

    // OR

    const result = getWStatsObj( text , options );
    // ==> { wordstats1, wordstats2, ..., wordstatsN  }

    // OR

    const result = getWordList( text , options );
    // ==> ["word 1", "word 2", ... "word N"]
    ```

---

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

---

## Options
There is few options to meet your requirements at this time. Here is the definition table.

| option | type | default |
|-|-|-|
|sortString|string|""|
|minimumLength|number|2|
|cbOnNewWord|function| (word:string) => {}|

1. **sortString**
    You can sort your words and stats before the service wraps everything up. Thanks to the integrated [byStr~Sort](https://www.npmjs.com/package/bystr-sort) npm module. You may find usefull to ceck it's [sortString](https://www.npmjs.com/package/bystr-sort#user-content-sortstring) section.

    <br/>
    In this instence, an example of a valid sortString could be:
    
    ```js
    const sortString = `
        by order of a greater than b's then
        by number of a < than b's
    `;
    ```
    **NOTE** : Every `sort sentence` starts by `by`and can be ended by `then` to chain other sort sentences
    <br/>
2. **minimumLength**
    You can define the minimum length of words during the analysis, phase.
    <br/>
    
3. **cbOnNewWord**
    Provides you with a callback function that will be called whenever a new word is encountered. Which means, only once per word.

---

## Stats
The services will gives you a stats matching an instance of `IStatsOfWords` or `IStatsOfWordsObject` or a simple array of `strings`.

Here are the definitions for each of them:

`IStatsOfWords`
|field|type|notes|
|-|-|-|
|word|string|the word|
|order|number|the order of appearence|
|number|number|the number appearence|
|length|number|the word's length|

`IStatsOfWordsObject`
Each word will be a `key` and stats will be the `value` of that pair
||order|number|length|
|-|-|-|-|
|**type**|number|number|number|

---

## Word detection
It is not that easy to detect words in a text that is quite big and containing many noises. It's not as easy as spliting on every space. And a normal text relies also on punctuation. 

By chance French and English punctuation may not very this much or not at all. 

Therefore, detecting anything matching anything something else than a "special" character chould be considered as part of a world. Things come very complicated when dealing with languages that are not that strict about isolating words... like japanese or chinese to list very a few.

Here is the regex that helped to detect non special characters :
```js
const special = 
    /[�\d\s\\[\]\x20-\x40\-`{-~\xA0-\xBF×Ø÷øʹ͵ͺ;！？♪╚-╬┘-▀\uFF3B\uFF40\uFF5B-\uFF65￥・（）]/i;
```
