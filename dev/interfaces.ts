export interface IWordStatsOptions {
  sortString : string;
  minimumLength : number;
  cbOnNewWord : ( word: string ) => void;
}

export interface IStatsOfWord {
  order ? : number ,
  word ? : string ,
  number ? : number ,
  length ? : number
}

export interface IStatsOfWordsObject {
  [ key: string ]: { 
    order ? : number , 
    number ? : number , 
    length ? : number 
  }
}

export interface IDictionary {
  [ key: string ]: number;
}

export interface ICandidate {
  dictionary : IDictionary ,
  length : number ,
  currentWord : string[] ,
  options : IWordStatsOptions
}
