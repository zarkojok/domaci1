
console.log('App is starting...');

const fs = require('fs');
const yargs = require('yargs');

const students = require('./students');

const argumentVector = yargs.argv;
console.log("Komanda je: ", argumentVector.command);

switch(argumentVector.command){
    case "add":
        students.addStudent(argumentVector.brojIndexa, argumentVector.ime, argumentVector.prosjek);
        break;
    case "remove":
        students.removeStudent(argumentVector.brojIndexa);
        break;
    case "list":
        students.listStudents();
        break;
    case "listAlpha":
        students.listAlpha();
        break;
    case "chgAverage":
        students.changeAverage(argumentVector.brojIndexa, argumentVector.noviProsjek);
        break;
    case "read":
        students.readStudent(argumentVector.brojIndexa);
        break;
    default:
        console.log('Komanda nije implementirana!');
        break;
}

console.log('App is closing...');

