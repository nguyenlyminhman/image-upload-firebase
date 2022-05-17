const fs = require('fs');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("./configs/firebase");
const { dbs } = require('./configs/firebase-admin')
const moment = require('moment');
const colors = require('colors/safe');



async function getImageList(path) {
    return fs.readdirSync(path);
}

async function uploadFirestore(image) {
    const contents = fs.readFileSync(__dirname + '/image/' + image).buffer;
    var myImg = new Uint8Array(contents)

    const storageRef = ref(storage, 'ai-robots/' + image);

    let uploaded = await uploadBytes(storageRef, myImg, { contentType: 'image/png' })
    let downloadUrl = await getDownloadURL(uploaded.ref);

    return downloadUrl;
}

async function insertUrl(url, imageName) {
    let rs = await dbs.collection('ListedItem')
        .add({
            createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString(),
            image: url,
            type: 'image/png',
            contract_type: "ERC721",
            token_address: "0xa0dbbb69b4ae1002d62aab993baa644678d8cede",
            token_id: imageName,
            name: "#" + imageName,
            contract_type: "ERC721",
            amount: "1",
            symbol: "MAR"
        });

    return rs.id;
}


async function upload() {

    let arrImages = await getImageList(__dirname + '/image');
    for (const index in arrImages) {
        let imageName = arrImages[index].substring(0, arrImages[index].length - 4)
        let url = await uploadFirestore(arrImages[index]);
        let id = await insertUrl(url, imageName);
        console.log(index + ' ' + colors.cyan(id) + colors.yellow(' >>> ') + url);
        console.log('----------------------- \n');
    }
}

upload();

// const update = async () => {
//     let robots = []
//     let rbt = dbs.collection('ListedItem');
//     const snapshot = await rbt.get();
//     if (snapshot.empty) {
//         console.log('No matching robot');
//         return robots;
//     }
//     snapshot.forEach(doc => {
//         robots.push({ ...doc.data(), id: doc.id });
//     });
//     log(robots)
    
// };

