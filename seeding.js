const faker = require('faker');
const db = require('./server/database/index.js');


// creates each individual review
const getReviews = (foreignId, callback) => {
    for (var i = 0; i < 100; i++) {
        var obj = {};
        const getRandomReview = () => ((Math.random() * 5).toFixed(1));
        obj.user = faker.name.firstName();
        obj.review = faker.commerce.productDescription();
        obj.review_date = faker.date.recent();
        obj.cleanliness = getRandomReview();
        obj.communication = getRandomReview();
        obj.check_in = getRandomReview();
        obj.accuracy = getRandomReview();
        obj.location = getRandomReview();
        obj.value = getRandomReview();
        const queryString = "INSERT INTO reviews \
        (listing_id, user, review, review_date, cleanliness, \
        communication, check_in, accuracy, location, value) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const queryArg = [foreignId, obj.user, obj.review, obj.review_date, obj.cleanliness,
        obj.communication, obj.check_in, obj.accuracy, obj.location, obj.value];
        db.connection.query(queryString, queryArg, (err) => {
            if (err) {
                console.log('error adding review');
                callback(err);
            } else {
                callback(null);
            }
        })
    }
}


 
//creates each listing
const getListings = () => {
    for (var i = 0; i < 10; i++) {
        var queryString = "INSERT INTO listings (cleanliness, communication, check_in, accuracy, location, value) VALUES (0.0, 0.0, 0.0, 0.0, 0.0, 0.0)";
        db.connection.query(queryString, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                getReviews(result.insertId, (error) => {
                    if (error) {
                        console.log(err);
                    } 
                })
            }
        })
    }
}

// IGNORE CODE BELOW

// const updateListings = () => {
//     queryString = "SELECT * FROM reviews";
//     db.connection.query(queryString, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             var tracker = {};
//             for (var i = 0; i < result.length; i++) {
//                 var id = result[i].listing_id;
//                 if (tracker[id] === undefined) {
//                     tracker[id] = []
//                     console.log('cleanliness ', result.cleanliness);
//                     tracker[id].push(result[i].cleanliness);
//                     tracker[id].push(result[i].communication);
//                     tracker[id].push(result[i].check_in);
//                     tracker[id].push(result[i].accuracy);
//                     tracker[id].push(result[i].location);
//                     tracker[id].push(result[i].value);
//                 } else {
//                     tracker[id][0] += result[i].cleanliness;
//                     tracker[id][1] += result[i].communication;
//                     tracker[id][2] += result[i].check_in;
//                     tracker[id][3] += result[i].accuracy;
//                     tracker[id][4] += result[i].location;
//                     tracker[id][5] += result[i].value;
//                 }
//             }
//             console.log(tracker);
//             // for (var i = 1; i < 5; i++) {
//             //     var qString = "U"
//             // } got the tracker, now need to update with each value for each listing
//         }
//     })
// }

// [cleanliness, communication, check_in, accuracy, location, value]

getListings();