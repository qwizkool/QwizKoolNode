var db = require('../lib/db_connection');

var ObjectId = db.Schema.Types.ObjectId;

/*
 QwizbookRating definition
 TODO: document this section
 */

/*Schema definition*/

var QwizbookRatingSchema = new db.Schema({

    //------- General Information/data

    // A combination of title and owner email to create uniqueness
    // This is with assumption that email is unique @ qwizkool.
    //id:{type:String, unique:true},
    userEmail:{
        type:String
    },
    //qwizbookId:{type:String},
    qwizbookId:{
        type:ObjectId
    },
    //_creator : { type: Schema.Types.ObjectId, ref: 'Person' },
    rating:{
        type:Number
    }

});


QwizbookRatingSchema.methods.getQwizbookRatingForResponse = function () {

    return {
        userEmail:this.userEmail,
        qwizbookId:this.qwizbookId,
        rating:this.rating,
        id:this._id
    }
};

var QwizbookRatingData = db.conn.model('QwizbookRating', QwizbookRatingSchema);


// Exports
module.exports.addRating = addRating;
module.exports.updateRating = updateRating;

module.exports.retrieveQwizbookRating = retrieveQwizbookRating;
module.exports.getQwizbookAverageRating = getQwizbookAverageRating;

module.exports.commentUserRating = commentUserRating;

function addRating(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner

    if (owner.email != data.userEmail) {

        return;
    }


    var instance = new QwizbookRatingData();

    instance.userEmail = data.userEmail;
    instance.rating = data.ratingval;
    instance.qwizbookId = data.qbookId;


    QwizbookRatingData.findOne({
        $and:[
            {
                qwizbookId:data.qbookId,
                userEmail:data.userEmail
            }
        ]
    }, function (err, book) {
        if (err) {
            return callback(err);
        }
        if (!book) {
            instance.save(function (err) {
                if (err) {
                    // Check for duplicate key error
                    if (err.code == 11000) {
                        callback({
                            Error:"You have already rated"
                        }, null)
                        return;
                    }

                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"Cannot rate Qwizbook "
                    }, null);
                } else {
                    callback(null, instance);
                }
            });
        }

        else {
            var query = {
                qwizbookId:data.qbookId,
                userEmail:data.userEmail
            };
            QwizbookRatingData.update(query, {
                rating:data.ratingval
            }, err, callback)
            {
                if (err) {
                    // Check for duplicate key error


                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"Cannot rate Qwizbook "
                    }, null);
                } else {

                    callback(null, instance);
                }
            }
        }


    });


};


function updateRating(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner
    var qbookId = data.qbookId;
    var useremail = owner.email;

    if (owner.email != data.userEmail) {
        callback({
            Error:"Qwizbook Could not be created, Please Login "
        });
        return;
    }

    QwizbookRatingData.find({
        $and:[
            {
                qwizbookId:qbookId,
                userEmail:useremail
            }
        ]
    }).execFind(function (err, rating) {

            if (err) {
                // Check for duplicate key error

                // All other conditions Pass as is TODO: need to cleanup.
                callback({
                    Error:"failed Qwizbook Retreive ."

                }, null);
                //console.log('no rating found');
            } else {
                callback(null, rating);
                var query = {
                    qwizbookId:qbookId,
                    userEmail:useremail
                };
                QwizbookRatingData.update(query, {
                    rating:data.ratingval
                }, err, callback)
                //console.log('got rating');
            }

        });
};

function retrieveQwizbookRating(qid, callback) {


    var mapFunction1 = function () {
        emit(this.qwizbookId, this.rating);
        // All other conditions Pass as is TODO: need to cleanup.

    }

    var reduceFunction1 = function (QbId, valuesRatings) {
        return (Array.sum(valuesRatings) / valuesRatings.length);
    };

    var o = {};
    o.map = mapFunction1;
    o.reduce = reduceFunction1;
    o.query = {qwizbookId:qid};
    o.out = {
        replace:"averageRating"
    };


    QwizbookRatingData.mapReduce(o, function (err, avgrating) {
        //console.log(o);
        if (err) {
            // Check for duplicate key error
            console.log(err);
            // All other conditions Pass as is TODO: need to cleanup.
            callback({
                Error:"failed to get Qwizbook Average Rating."
            }, null);
        } else {

            //avgrating.findById(qbId, function(err, averagerating){
            //avgrating.find({'_id': 'qbId'}, function(err, averagerating){
            avgrating.find(function (error, averagerating) {

                if (error) {
                    console.log(error);
                    callback({
                        Error:"failed to get Qwizbook Average Rating."
                    }, null);
                } else {

                    callback(null, averagerating);

                    //console.log("AVG RATING" + JSON.stringify(averagerating) + 'hhjhj');
                }

            });

        }

    });

};


function getQwizbookAverageRating(qid, callback) {


    /*
     Get the specified collection name from the db to confirm that the
     collection exists.
     */
    db.conn.db.collectionNames("qwizbookRatings", function (err, collectionNames) {

        /*'names' contains an array of objects that contain the collection names
         if array length is 1 then the collection does  exist.*/
        if (collectionNames.length === 1) {

            var mapFunction1 = function () {
                emit(this.qwizbookId, this.rating);
            };

            var reduceFunction1 = function (QbId, valuesRatings) {
                return (Array.sum(valuesRatings) / valuesRatings.length);
            };

            var o = {};
            o.map = mapFunction1;
            o.reduce = reduceFunction1;
            o.query = {qwizbookId:qid};
            o.out = {
                replace:"averageRating"
            };
            //console.log(o);
            QwizbookRatingData.mapReduce(o, function (err, avgrating) {
                if (err) {
                    // Check for duplicate key error
                    console.log(err);
                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"failed to get Qwizbook Average Rating."
                    }, null);
                } else {

                    //avgrating.findById(qbId, function(err, averagerating){
                    //avgrating.find({'_id': 'qbId'}, function(err, averagerating){
                    avgrating.find(function (error, averagerating) {

                        if (error) {
                            console.log(error);
                            callback({
                                Error:"failed to get Qwizbook Average Rating."
                            }, null);
                        } else {

                            callback(null, averagerating);

                            //console.log("AVG RATING" + JSON.stringify(averagerating) + 'hhjhj');
                        }

                    });

                }

            });

        } else {
            // collection does not exist, pass the average rating as zero.
            callback(null, 0);
        }

    });


};

function commentUserRating(user, qwizbookId, callback) {
    QwizbookRatingData.find({
        $and:[
            {
                qwizbookId:qwizbookId,
                userEmail:user
            }
        ]
    }).execFind(function (err, comments) {

            if (err) {
                // All other conditions Pass as is TODO: need to cleanup.
                callback({
                    Error:"Retreive QwizbookComments failed."
                }, null);
            } else {
                callback(null, comments);
            }

        });

};
		
