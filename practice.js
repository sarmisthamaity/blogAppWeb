// const obj = {
//     'first': 'one',
//     'second': 'two',
//     'third': 'three'
// }

let filtered = {}
// Object.keys(obj).filter(prop => {
//     if (prop !== 'second') {
//         filtered[prop] = obj[prop]
//     }
// })

// console.log(filtered)

const s = {"_id": "619b527b2e95668aec1308a0",
    "blogs": "it is ",
    "picture": "1637569147605____Screenshot from 2021-09-16 15-13-03.png",
    "userId": {
        "_id": "6198eff8be707c0ab229065d",
        "name": "sarmis",
        "password": "$2b$13$DfgtNj1FhK54Lek6pmg2GekmQCHIoLTR3PgE2OhjD5yRRwNcNHt0u",
        "gender": "female",
        "profilepic": "1637412856144____Screenshot from 2021-09-16 15-13-03.png",
        "location": "wb",
        "__v": 0
    }
};
// const d = s;
Object.keys(s).filter(prop => {
    if(prop !== "userId"){
        filtered[prop] = s[prop]
    }
});
console.log(filtered);