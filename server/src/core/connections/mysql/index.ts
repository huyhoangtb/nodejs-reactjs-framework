// // import Oauth2ServerRepository from "../../repository/Oauth2ServerRepository";
//
// var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
//
// var initAutoIncrement = null;
// var uri = 'mongodb://localhost/obolex';
// class MongoDB {
//
//     makeConnection() {
//
//         mongoose.connect(uri, {})
//             .then(function (err, db) {
//                 console.log("connected to obolex db");
//                 // const o = new Oauth2ServerRepository();
//                 // o.loadExampleData();
//             })
//             .catch(function (error) {
//                 console.log("setError when trying to connect to mongodb");
//                 if (error) return console.error(error);
//             });
//     }
//
//     static getAutoIncrement() {
//         if (!initAutoIncrement) {
//             var connection = mongoose.createConnection(uri);
//             autoIncrement.initialize(connection);
//             initAutoIncrement = autoIncrement;
//         }
//         return initAutoIncrement
//     }
//
// }
//
// export default MongoDB;
