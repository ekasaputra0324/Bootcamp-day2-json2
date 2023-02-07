const readline = require('readline');
const validator = require('validator');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var filename = "data/contact.json";
var folderName = "data"
if (!fs.existsSync(folderName) ) {
    console.log("create folder: " + folderName);
    fs.mkdirSync(folderName);
}

rl.question("siapa nama kamu? " , function(nama){
    rl.question(" email kamu? " , function(email){
        if (validator.isEmail(email)  == true) {
            rl.question(" nomer hp? ", function(nomerhp){
                if (validator.isMobilePhone(nomerhp,'id-ID')  == true) {
                    console.log(
                    'Nama : '+nama,
                    'Email : '+email, 
                    'Nomer Hp: '+nomerhp
                    );
                    if (!fs.existsSync(filename) ) {
                        console.log("file not found , create file: " + filename);
                        fs.writeFileSync(filename, JSON.stringify([]));
                    }     
                   fs.readFile('data/contact.json', 'utf8', ( err, data )=>{
                    if (err) {
                       
                    } 
                    json = JSON.parse(data);
                    json.push({
                        nama: nama,
                        email: email,
                        nomer: nomerhp
                    });
                   let parse = JSON.stringify(json);
                   fs.writeFile(filename, parse, 'utf8', (err) => {
                     if (err) {
                        console.log(err);
                     }
                     console.log("data berhasil di tambahkan");   
                     rl.close()
                    });
                 });
                }else{
                    console.log('format number phone harus indo');
                }   
            });
        }else{
            console.log('format email harus sesuai');
        }
    }); 
});
