module.exports = {
    getHomePage: (req, res) => {
        var query = "SELECT * FROM `booking_queries` ORDER BY id DESC"; // query database to get all the booking_queries

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Guest Query",
                booking_queries: result
                
                
            });//console.log(result);
        });
    },
};