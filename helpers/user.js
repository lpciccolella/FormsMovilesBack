var db = require('./pooldb')
var properties = require('./prop-reader')
var bcrypt = require('bcrypt')
var shortid = require('shortid');

var pool = db.getPool();

module.exports.getUserByUsername = (username) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                if (rows.length) {
                    rej(error);
                }
                res(rows);
                con.release();
            }
        )})
    })
    
}

module.exports.updateUser = (username, name, email, age, gender, id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('updateUser'), [username, username, name, name, email, email, age, age, gender, gender, id], function(err,rows){
                if (err)
                    rej(err);
                res(rows);
                con.release();
            }
        )})
    })
    
}


module.exports.registerUser = (name, username, email, password, age, gender) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if(err) rej(err);
            con.query(properties.get('getUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                 if (rows.length) {
                    rej(err);
                } else {
                    con.query(properties.get('insertUser'), [shortid.generate(),username, name, email, bcrypt.hashSync(password, 10), age, gender], function(error,rows){
                    if (error) throw error;
                    con.release();
                    res(rows);
                    });	
                    }	
                }
            )
        })
    })
}

module.exports.registerAdmin = (name, username, email, password, age, gender) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if(err) rej(err);
            con.query(properties.get('getUserByUsername'), [username], function(err,rows){
                if (err)
                    rej(err);
                 if (rows.length) {
                    rej(err);
                } else {
    
                    con.query(properties.get('insertAdmin'), [shortid.generate(), username, name, email, bcrypt.hashSync(password, 10), age, gender], function(error,rows){
                    if (error) throw error;
                    con.release();
                    res(rows);
                    });	
                    }	
                }
            )
        })
    })
}

module.exports.changePicUrl = (userId, picUrl) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('updateAvatar'), [picUrl, userId], function(err,rows){
                if (err)
                    rej(err);
                res(rows);
                con.release();
            }
        )})
    })
  }