const generateRandomCode = () => {
    var min = 10000;
    var max = 900000;
    var num = Math.floor(Math.random() * min) + max;
    return num;
};

module.exports = {
    generateRandomCode
};