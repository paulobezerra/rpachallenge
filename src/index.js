const read = require("./reader");
const write = require("./bot");

const excelFileName = 'data.xlsx';
const targetPage = 'http://rpachallenge.com/';

const run = async() => {
    const rows = await read(excelFileName);
    write(targetPage, rows);
}

run()