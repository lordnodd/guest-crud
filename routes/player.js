const moment = require('moment');
module.exports = {
    addPlayerPage: (req, res) => {
        
        res.render('add-player.ejs', {
            title: "Enquiry Form",message: ''
        });
        console.log(moment().format('MM Do YYYY, h:mm:ss '));
        
    },
    addPlayer: (req, res) => {

        var message = '';
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var username = req.body.username;
        var email = req.body.email;
        var contact_number = req.body.contact_number;
        var number_of_guests= req.body.number_of_guests;
        var location = req.body.location;   
        var daterange = req.body.daterange;
        daterange = daterange.split(" - ");
        var check_in = daterange[0];
        var check_out = daterange[1];
        var created_at = moment().format('YYYY-MM-DD hh:mm:ss');
        var dummy = 0;
        console.log(daterange, check_out, check_in);
        check_in = moment(check_in).format('YYYY-MM-DD').toString();
        check_out = moment(check_out).format('YYYY-MM-DD').toString();
    

        console.log(daterange, check_out, check_in);
        var query = "INSERT INTO `booking_queries` (firstname, lastname, property_id, no_of_nights, total_cost, villa_cost, email, mobile_number, no_of_guests, vista_name, checkin, checkout, created_at, updated_at) VALUES ('" +
        first_name + "', '" + last_name + "', '"  + dummy + "', '"  + ++dummy + "', '"  + dummy + "', '"  + dummy + "', '"  + email + "', '" + contact_number + "', '" + number_of_guests + "', '" + location + "', '" + check_in + "', '" + check_out + "', '" + created_at + "', '" + created_at + "')";
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.render('add-player.ejs', {
                title: "Enquiry Form",message: 'Thanks for the enquiry'
            });
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
                title: "Edit Player | Guest Query",
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
        var updated_at = new Date();
//UPDATE `booking_queries` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `username` = '" + username + "', `email` = '" + email + "', `contact_number` = '" + contact_number + "', `number_of_guests` = '" + number_of_guests + "',  `location` = '" + location + "', `check_in` = '" + check_in + "', `check_out` = '" + check_out + "' WHERE `booking_queries`.`id` = '" + playerId + "'"
        var query = "UPDATE `booking_queries` SET `firstname` = '" + first_name + "', `lastname` = '" + last_name + "', `email` = '" + email + "', `mobile_number` = '" + contact_number + "', `no_of_guests` = '" + number_of_guests + "',  `vista_name` = '" + location + "', `checkin` = '" + check_in + "', `checkout` = '" + check_out + "', `updated_at` = '" + updated_at + "' WHERE `booking_queries`.`id` = '" + playerId + "'";
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
    }
};
