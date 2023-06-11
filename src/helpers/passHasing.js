const bcrypt = require("bcrypt");


exports.hashPassword = (password) => {

    //all the bcryption will inside a promise function.
    // return new Promise((resolve, reject) => {
    //     bcrypt.genSalt(bcrypt.hash(););
    // });

    return new Promise((resolve, reject) => {

        bcrypt.genSalt(10,(err, salt) => {
            //if err happens
            if(err){
                reject(err);
            }

            //if err not happens we will hash the pass
            bcrypt.hash(password, salt, (err,hash) => {
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
        
    });

}

exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}