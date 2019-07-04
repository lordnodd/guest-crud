const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "ass Journey | Guest CRUD",message: ''
        });
    },
    addPlayer: (req, res) => {
        // if (!req.files) {
        //     return res.status(400).send("No files were uploaded.");
        // }

        var message = '';
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var username = req.body.username;
        var email = req.body.email;
        var contact_number = req.body.contact_number;
        var number_of_guests= req.body.number_of_guests;
        var location = req.body.location;   
        var check_in = req.body.daterange;
        var check_out = req.body.check_out;
        //console.log(typeOf(check_in));
        
        //var uploadedFile = req.files.image;
        //var image_name = uploadedFile.name;
        // var fileExtension = uploadedFile.mimetype.split('/')[1];
        // image_name = username + '.' + fileExtension;

        var usernameQuery = "SELECT * FROM `booking_queries` WHERE email = '" + email + "'";
        // var getall = "SELECT "
        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-player.ejs', {message,
                    title: "ADDING | Guest CRUD"
                });
            } else {//"INSERT INTO `booking_queries` (firstname, last name, username, email, contact_number, number_of_guests, location, check_in, check_out) VALUES ('"
                var query = "INSERT INTO `booking_queries` (firstname, lastname, email, mobile_number, no_of_guests, vista_name, checkin, checkout) VALUES ('" +
                first_name + "', '" + last_name + "', '"  + email + "', '" + contact_number + "', '" + number_of_guests + "', '" + location + "', '" + check_in + "', '" + check_out + "')";
            
                db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
                    // res.json({
                    //     result:result
                    // });
            });
                // check the filetype before uploading it
                // if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                //     // upload the file to the /public/assets/img directory
                //     uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                //         if (err) {
                //             return res.status(500).send(err);
                //         }
                //         // send the player's details to the database
                       
                //     });
                // } else {
                //     message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                //     res.render('add-player.ejs', { message,
                //         title: "Welcome to Socka | Add a new player"
                //     });
                // }
            }
        });
    },
    editPlayerPage: (req, res) => {
        var playerId = req.params.id;
        var query = "SELECT * FROM `booking_queries` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit Player | Guest CRUD",
                player: result[0],
                message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        var playerId = req.params.id;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var username = req.body.username;
        var email = req.body.email;
        var contact_number = req.body.contact_number;
        var number_of_guests= req.body.number_of_guests;
        var location = req.body.location;   
        var check_in = req.body.check_in;
        var check_out = req.body.check_out;
//UPDATE `booking_queries` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `username` = '" + username + "', `email` = '" + email + "', `contact_number` = '" + contact_number + "', `number_of_guests` = '" + number_of_guests + "',  `location` = '" + location + "', `check_in` = '" + check_in + "', `check_out` = '" + check_out + "' WHERE `booking_queries`.`id` = '" + playerId + "'"
        var query = "UPDATE `booking_queries` SET `firstname` = '" + first_name + "', `lastname` = '" + last_name + "', `email` = '" + email + "', `mobile_number` = '" + contact_number + "', `no_of_guests` = '" + number_of_guests + "',  `vista_name` = '" + location + "', `checkin` = '" + check_in + "', `checkout` = '" + check_out + "' WHERE `booking_queries`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        var playerId = req.params.id;
        //var getImageQuery = 'SELECT image from `booking_queries` WHERE id = "' + playerId + '"';
        var deleteUserQuery = 'DELETE FROM booking_queries WHERE id = "' + playerId + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });

        // db.query(getImageQuery, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }

        //     var image = result[0].image;

        //     fs.unlink(`public/assets/img/${image}`, (err) => {
        //         if (err) {
        //             return res.status(500).send(err);
        //         }
                
        //     });
        // });
    }
};
