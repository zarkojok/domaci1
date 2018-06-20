
const _ = require('lodash');
const fs = require('fs');

getStudents = () => {
    var students = [];
    try{
        var studentString = fs.readFileSync('students-data.json');
        students = JSON.parse(studentString);
    }
    catch(e){
        students = [];
    }

    return students;
}

writeStudents = (students) => {
    fs.writeFileSync('students-data.json', JSON.stringify(students));
}

listStudents = () => {
    var students = getStudents();

    if (students.length == 0){
        console.log('Ne postoji nijedan student!');
    }
    else{
        students.forEach(element => {
            console.log("brojIndexa: ", element.brojIndexa);
            console.log("Ime: ", element.ime);
            console.log("Prosjek: ", element.prosjek);
            console.log('------------------------------------');
        });
    }
};

listAlpha = () => {
    var students = getStudents();
    
    if (students.length === 0){
        console.log('Ne postoji nijedan student!');
    }
    else{
        var alphaOrderedStudents = _.orderBy(students, ['ime'], ['asc']);
        alphaOrderedStudents.forEach(element => {
            console.log("brojIndexa: ", element.brojIndexa);
            console.log("Ime: ", element.ime);
            console.log("Prosjek: ", element.prosjek);
            console.log('------------------------------------');
        });
    }
};

readStudent = (brojIndexa) => {
    if (!brojIndexa){
        console.log('Nije proslijedjen broj indexa!');
        return;
    }

    var students = getStudents();

    var student = students.filter((element) => 
        element.brojIndexa === brojIndexa);

    if (student.length === 0){
        console.log("Ne postoji taj broj indexa!");
    }
    else{
        console.log("brojIndexa: ", student[0].brojIndexa);
        console.log("Ime: ", student[0].ime);
        console.log("Prosjek: ", student[0].prosjek);
        console.log("----------------------------------------");
    };
};

removeStudent = (brojIndexa) => {
    if (!brojIndexa){
        console.log("Nije proslijedjen broj indexa");
        return;
    }

    var students = getStudents();

    var brIn = students.filter(element => element.brojIndexa === brojIndexa);
    if (brIn.length === 0){
        console.log("Taj broj indexa ne postoji!");
        return;
    };

    var newStudentsList = students.filter(element => element.brojIndexa !== brojIndexa);

    writeStudents(newStudentsList);
};

changeAverage = (brojIndexa, noviProsjek) => {
    if (!brojIndexa || !noviProsjek){
        console.log("Nisu proslijedjeni svi parametri!");
        return;
    }
    var students = getStudents();

    var student = students.filter((element) => 
        element.brojIndexa === brojIndexa);

    if (student.length === 0){
        console.log("Ne postoji taj broj indexa!");
    }
    else{
        removeStudent(brojIndexa);
        students = getStudents();
        addStudent(student[0].brojIndexa, student[0].ime, noviProsjek);
    };
};

addStudent = (brojIndexa, ime, prosjek) => {
    if (!brojIndexa || !ime || !prosjek){
        console.log('Nisu proslijedjeni svi parametri!');
        return;
    }

    var students = getStudents();

    const dupliStudents = students.filter((element) => 
        element.brojIndexa === brojIndexa);

    if (dupliStudents.length > 0){
        console.log('Taj student vec postoji!');
        return;
    }

    var newStudent = {
        brojIndexa, 
        ime,
        prosjek
    };

    students.push(newStudent);

    var prosjekOrderedStudents = _.orderBy(students, ['prosjek'], ['desc']);

    writeStudents(prosjekOrderedStudents);
};

module.exports = {
    addStudent,
    removeStudent,
    changeAverage,
    listStudents,
    listAlpha,
    readStudent
};
