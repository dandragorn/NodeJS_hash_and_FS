const fs = require('node:fs');
const crypto = require('crypto');

const hashFunction = (message) => {
    const hash = crypto.createHash('sha256');
    hash.update(message);
    return hash.digest('hex');
}

try {
    const data = fs.readFileSync('database.csv', 'utf-8');
    let lines = data.split('\n');
    lines = lines.filter(line => line !== '');
    filteredArray = lines.filter(line => !line.includes('-'));
    let index = 1;

    filteredArray.slice(1).forEach(line => {
        let currentLineArr = line.split(', ');
        currentLineArr[0] = index++;
        currentLineArr[2] = hashFunction(currentLineArr[2]);

        fs.appendFileSync('hash_database.csv', currentLineArr.join(', ') + '\n');
        fs.appendFileSync('filtered_database.csv', currentLineArr.join(', ') + '\n');
    });
} catch (err) {
    console.error(err);
}



