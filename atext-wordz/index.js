"use strict";
exports.__esModule = true;
exports.getWordList = exports.getWStatsObj = exports.getWStatsList = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
var sort = require("bystr-sort").sort;
var addNewWord = function (candidate) {
    var dictionary = candidate.dictionary, length = candidate.length, currentWord = candidate.currentWord, options = candidate.options;
    // If the candidate has a decent length,
    if (length && length >= options.minimumLength) {
        // add an entry to the dictionary lowercased
        var word = currentWord.join("").toLowerCase();
        // If the word is never heard from the dictionary,
        if (dictionary[word] === undefined) {
            // trigger the callback
            options.cbOnNewWord(word);
        }
        // Count from zero or get the actual count of the word occurence 
        // since the begining of the analysis
        var c = dictionary[word] || 0;
        // update the count
        dictionary[word] = c + 1;
    }
};
var isRomanNumerals = function (word) {
    // INFO: Roman numeral pattern
    var pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[a-z]?$/i;
    // whe discard "Le" out of the result because , it is a word rather than a period
    return pattern.test(word) && !/^L[e]$/i.test(word);
};
var bufferizeWordChar = function (text, currentWord, char, i) {
    // INFO: enumerate a maximum of special characters
    var spetialChars = /[�\d\s\\[\]\x20-\x40\-`{-~\xA0-\xBF×Ø÷øʹ͵ͺ;！？♪╚-╬┘-▀\uFF3B\uFF40\uFF5B-\uFF65￥・（）]/;
    // When we do not deal with a special character
    if (!spetialChars.test(char)) {
        // push it to the buffer
        currentWord.push(text[i]);
        // return the positive sign that we added the new character to the buffer
        return true;
    }
    // we may have encounter a special character
    return false;
};
/**
 * Whill loop over the whole text and define either the succession of characts
 * defines a word or not
 * @param text the text to analyse
 * @param options options
 * @returns
 */
var fillDictionnary = function (text, options) {
    var dictionary = {};
    var l = 0;
    var currentWord = [];
    // INFO: Loop over the whole text and take every character.
    for (var i = 0; i < text.length; i++) {
        // the character at pos i
        var char = text[i];
        // buffer the current char to the potential current word
        //then return true or false
        var isBuffered = bufferizeWordChar(text, currentWord, char, i);
        // if we cannot buffer the next character for a word
        if (!isBuffered) {
            l = currentWord.length;
            // add a word to the dictionary
            addNewWord({ dictionary: dictionary, length: l, currentWord: currentWord, options: options });
            currentWord = [];
        }
        // the current value of l is carried out of this loop
    }
    // add the last potential word to the dictionary
    addNewWord({ dictionary: dictionary, length: l, currentWord: currentWord, options: options });
    return dictionary;
};
// INFO:  fix default values for options
/**
 * Fix a default value to given options when these are undefined.
 * @param opt options
 * @returns
 */
var fixOptions = function (opt) {
    var 
    // she string to do the sorting of words based on critierias (fields) available
    _a = opt.sortString, 
    // she string to do the sorting of words based on critierias (fields) available
    sortString = _a === void 0 ? "" : _a, 
    // the length of the words
    _b = opt.minimumLength, 
    // the length of the words
    minimumLength = _b === void 0 ? 2 : _b, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _c = opt.cbOnNewWord, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cbOnNewWord = _c === void 0 ? function (word) { } : _c;
    return { sortString: sortString, minimumLength: minimumLength, cbOnNewWord: cbOnNewWord };
};
/**
 * Gives a list of words and their stats. Records are sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
var getWStatsList = function (text, opt) {
    if (opt === void 0) { opt = {}; }
    var options = fixOptions(opt);
    // the order of apparition in the text
    var ord = 0;
    // get the dictionary of all words
    var words = fillDictionnary(text, options);
    // map over all words in the dictionary and give away
    // an list of objects that represents stats of words
    var listOfWords = Object.keys(words).map(function (e) {
        return { order: ord++, word: e, number: words[e], length: e.length };
    });
    var sortString = options.sortString;
    // Returns stats sorted by the defined sortString
    return (
    // sort if there is a sortString defined or just return the unsorted
    (sortString ? sort(listOfWords, sortString) : listOfWords)
        // Filter romanNumerals out of the result
        .filter(function (s) {
        return s.word ? !isRomanNumerals(s.word) : false;
    }));
};
exports.getWStatsList = getWStatsList;
/**
 * Gives an object of words with stats. Records are sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
var getWStatsObj = function (text, opt) {
    if (opt === void 0) { opt = {}; }
    // Get the object stats list (call the existant format result)
    var listOfWords = getWStatsList(text, opt);
    // Prepare an empty object
    var result = {};
    listOfWords.map(function (s) {
        // Add a key (which is the name of the word) + value (which is the stats)
        result[s.word] = { order: s.order, number: s.number, length: s.length };
    });
    return result;
};
exports.getWStatsObj = getWStatsObj;
/**
 * Gives a simple list of words that is sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
var getWordList = function (text, opt) {
    if (opt === void 0) { opt = {}; }
    // Get the object stats list (call the existant format result)
    var listOfWords = getWStatsList(text, opt);
    // Just return an array of words ( string[] )
    return listOfWords.map(function (s) { return s.word; });
};
exports.getWordList = getWordList;
