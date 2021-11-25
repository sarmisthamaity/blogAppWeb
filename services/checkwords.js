const checkWords = (stringData) => {
    if(stringData === undefined){
        
    } else{
        const countWords = stringData.split(' ');
        const wordsLength = countWords.length;
        return wordsLength
    };
};


module.exports = {
    checkWords
};