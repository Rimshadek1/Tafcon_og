var db = require('../config/connection')
var collection = require('../config/collection')
const ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');
module.exports = {



    register: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.number = parseInt(userData.number);

            if (userData.number === 8714122257 || userData.number === 9567503268) {
                userData.number = parseInt(userData.number);
                userData.role = 'admin';
                userData.password = await bcrypt.hash(userData.password, 10);
                db.get().collection(collection.userCollection).insertOne(userData)
                    .then((data) => {
                        resolve(data.insertedId);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } else {
                userData.role = 'unknown';
                userData.number = parseInt(userData.number);

                const existingUser = await db.get()
                    .collection(collection.verifyCollection)
                    .findOne({ number: userData.number });
                if (existingUser) {
                    resolve('mobile_registered');
                } else {
                    const verified = await db.get()
                        .collection(collection.userCollection)
                        .findOne({ number: userData.number });
                    if (verified) {
                        resolve('mobile_registered_and_verified');
                    } else {

                        userData.password = await bcrypt.hash(userData.password, 10);
                        db.get()
                            .collection(collection.verifyCollection)
                            .insertOne(userData)
                            .then((data) => {
                                resolve(data.insertedId);

                            })
                    }
                }
            }

        })
    },
    doVerify: (userId) => {
        return new Promise(async (resolve, reject) => {
            const verify = await db.get().collection(collection.verifyCollection).findOne({ _id: new ObjectId(userId) });

            const currentDate = new Date();
            if (verify) {
                user = {
                    _id: verify._id,
                    name: verify.name,
                    place: verify.place,
                    adress: verify.adress,
                    email: verify.email,
                    age: verify.age,
                    height: verify.height,
                    number: verify.number,
                    xp: verify.xp,
                    xpi: verify.xpi,
                    currentStatus: verify.currentStatus,
                    password: verify.password,
                    role: verify.role,
                    registrationDate: verify.registrationDate,
                    verifydate: currentDate,
                };
                db.get()
                    .collection(collection.userCollection)
                    .insertOne(user)
                    .then((data) => {
                        // Data has been successfully added to the userCollection, now let's delete it from verifyCollection
                        db.get()
                            .collection(collection.verifyCollection)
                            .deleteOne({ _id: new ObjectId(userId) })
                            .then(() => {
                                resolve(data.insertedId);
                            })
                            .catch((deleteErr) => {
                                reject(deleteErr);
                            });
                    })
                    .catch((insertErr) => {
                        reject(insertErr);
                    });
            } else {
                reject(new Error("Verification data not found."));
            }
        });
    }
    ,
    doLogin: async (userData) => {
        userData.number = parseInt(userData.number);

        try {
            const user = await db.get().collection(collection.userCollection).findOne({ number: userData.number });

            if (user) {
                const match = await bcrypt.compare(userData.password, user.password);
                if (match) {

                    return {
                        user: user,
                        status: true,

                    };
                } else {
                    return {
                        status: false,
                        error: 'Wrong Mobile or Password'
                    };
                }
            } else {
                const verify = await db.get().collection(collection.verifyCollection).findOne({ number: userData.number });
                if (verify) {
                    const match = await bcrypt.compare(userData.password, verify.password);
                    if (match) {
                        return {
                            status: false,
                            error: 'User registered, On verification process, please wait until you are verified'
                        }
                    } else {
                        return {
                            status: false,
                            error: 'Wrong Mobile or Password'
                        };
                    }
                } else {

                    return {
                        status: false,
                        error: 'User not Found'
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    },
    Booking: (proId, userId) => {
        let proObj = {
            item: new ObjectId(proId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            try {
                const userCart = await db.get().collection(collection.bookCollection).findOne({ user: new ObjectId(userId) });

                if (userCart) {
                    let proExist = userCart.events.findIndex(product => product.item == proId);
                    if (proExist !== -1) {
                        // Event is already booked; resolve with an appropriate message
                        resolve('already booked');
                    } else {
                        // If user's cart already exists, add the new product id to the existing array
                        db.get().collection(collection.bookCollection).updateOne(
                            { user: new ObjectId(userId) },
                            { $push: { events: proObj } }
                        ).then(() => {
                            // After booking, decrease the slot in the eventCollection
                            db.get().collection(collection.eventCollection).updateOne(
                                { _id: new ObjectId(proId), slot: { $gte: 1 } },
                                { $inc: { slot: -1 } }
                            ).then(() => {
                                resolve('success');
                            }).catch((error) => {
                                reject(error);
                            });
                        });
                    }
                } else {
                    // If user's cart doesn't exist, create a new cart object with a single array for products
                    const cartObj = {
                        user: new ObjectId(userId),
                        events: [proObj]
                    };
                    db.get().collection(collection.bookCollection).insertOne(cartObj).then(() => {
                        // After booking, decrease the slot in the eventCollection
                        db.get().collection(collection.eventCollection).updateOne(
                            { _id: new ObjectId(proId), slot: { $gte: 1 } },
                            { $inc: { slot: -1 } }
                        ).then(() => {
                            resolve('success');
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    ,
    BookingMain: (proId, userId) => {
        let proObj = {
            item: new ObjectId(proId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            try {
                const userCart = await db.get().collection(collection.bookCollection).findOne({ user: new ObjectId(userId) });

                if (userCart) {
                    let proExist = userCart.events.findIndex(product => product.item == proId);
                    if (proExist !== -1) {
                        // Event is already booked; resolve with an appropriate message
                        resolve('already booked');
                    } else {
                        // If user's cart already exists, add the new product id to the existing array
                        db.get().collection(collection.bookCollection).updateOne(
                            { user: new ObjectId(userId) },
                            { $push: { events: proObj } }
                        ).then(() => {
                            // After booking, decrease the slot in the eventCollection
                            db.get().collection(collection.eventCollection).updateOne(
                                { _id: new ObjectId(proId), slotMain: { $gte: 1 } },
                                { $inc: { slotMain: -1 } }
                            ).then(() => {
                                resolve('success');
                            }).catch((error) => {
                                reject(error);
                            });
                        });
                    }
                } else {
                    // If user's cart doesn't exist, create a new cart object with a single array for products
                    const cartObj = {
                        user: new ObjectId(userId),
                        events: [proObj]
                    };
                    db.get().collection(collection.bookCollection).insertOne(cartObj).then(() => {
                        // After booking, decrease the slot in the eventCollection
                        db.get().collection(collection.eventCollection).updateOne(
                            { _id: new ObjectId(proId), slotMain: { $gte: 1 } },
                            { $inc: { slotMain: -1 } }
                        ).then(() => {
                            resolve('success');
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    ,
    BookingSuper: (proId, userId) => {
        let proObj = {
            item: new ObjectId(proId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            try {
                const userCart = await db.get().collection(collection.bookCollection).findOne({ user: new ObjectId(userId) });

                if (userCart) {
                    let proExist = userCart.events.findIndex(product => product.item == proId);
                    if (proExist !== -1) {
                        // Event is already booked; resolve with an appropriate message
                        resolve('already booked');
                    } else {
                        // If user's cart already exists, add the new product id to the existing array
                        db.get().collection(collection.bookCollection).updateOne(
                            { user: new ObjectId(userId) },
                            { $push: { events: proObj } }
                        ).then(() => {
                            // After booking, decrease the slot in the eventCollection
                            db.get().collection(collection.eventCollection).updateOne(
                                { _id: new ObjectId(proId), slotSuper: { $gte: 1 } },
                                { $inc: { slotSuper: -1 } }
                            ).then(() => {
                                resolve('success');
                            }).catch((error) => {
                                reject(error);
                            });
                        });
                    }
                } else {
                    // If user's cart doesn't exist, create a new cart object with a single array for products
                    const cartObj = {
                        user: new ObjectId(userId),
                        events: [proObj]
                    };
                    db.get().collection(collection.bookCollection).insertOne(cartObj).then(() => {
                        // After booking, decrease the slot in the eventCollection
                        db.get().collection(collection.eventCollection).updateOne(
                            { _id: new ObjectId(proId), slotSuper: { $gte: 1 } },
                            { $inc: { slotSuper: -1 } }
                        ).then(() => {
                            resolve('success');
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    ,
    getEventList: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.bookCollection).aggregate([
                {
                    $match: { user: new ObjectId(userId) }
                }, {
                    $unwind: '$events'
                }, {
                    $lookup: {
                        from: collection.eventCollection,
                        localField: 'events.item',
                        foreignField: '_id',
                        as: 'event'
                    }
                }, {
                    $addFields: {
                        item: '$events.item',
                        quantity: '$events.quantity',
                        event: { $arrayElemAt: ['$event', 0] }
                    }
                }, {
                    $addFields: {
                        'event.Slot_left': { $toInt: '$event.slot' }
                    }
                }, {
                    $project: {
                        item: 1,
                        quantity: 1,
                        event: 1
                    }
                }, {
                    $sort: { 'event.lastClickedTimestamp': -1 } // Sort by the last-clicked timestamp in descending order
                }
            ]).toArray();

            resolve(cartItems);
        });
    }
    ,

    getSalaryDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userSalaryDetails = await db
                    .get()
                    .collection(collection.salaryCollection)
                    .find({ user: new ObjectId(userId) })
                    .toArray();

                resolve(userSalaryDetails);
            } catch (error) {
                reject(error);
            }
        });
    },
    getFineDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userFineDetails = await db
                    .get()
                    .collection(collection.fineCollection)
                    .find({
                        user: new ObjectId(userId)
                    })
                    .toArray();

                resolve(userFineDetails);
            } catch (error) {
                reject(error);
            }
        })
    }
    ,
    getOtDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userOtDetails = await db
                    .get()
                    .collection(collection.otCollection)
                    .find({
                        user: new ObjectId(userId)
                    })
                    .toArray();

                resolve(userOtDetails);
            } catch (error) {
                reject(error);
            }
        })
    }
    ,
    getTeDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userTeDetails = await db
                    .get()
                    .collection(collection.teCollection)
                    .find({
                        user: new ObjectId(userId)
                    })
                    .toArray();

                resolve(userTeDetails);
            } catch (error) {
                reject(error);
            }
        })
    }
    ,
    getWithdrawDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userWithdrawDetails = await db
                    .get()
                    .collection(collection.withdrawCollection)
                    .find({
                        userId: new ObjectId(userId)
                    })
                    .toArray();

                resolve(userWithdrawDetails);
            } catch (error) {
                reject(error);
            }
        })
    }
    ,
    getFine: (userId) => {
        return new Promise(async (resolve, reject) => {
            const total = await db
                .get()
                .collection(collection.fineCollection)
                .aggregate([
                    {
                        $match: { user: new ObjectId(userId) }
                    },
                    {
                        $addFields: {
                            fine: { $toInt: '$fine' },
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalFine: { $sum: "$fine" }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalFine: 1,
                        }
                    }
                ])
                .toArray();



            if (total.length > 0) {

                resolve(total[0]);
            } else {
                console.log('No Results Found');
                resolve({ totalFine: 0 });
            }

        });
    },

    getIncome: (userId) => {
        return new Promise(async (resolve, reject) => {
            const salaryCollection = db.get().collection(collection.salaryCollection);
            const otCollection = db.get().collection(collection.otCollection);
            const teCollection = db.get().collection(collection.teCollection);

            // Define two aggregation pipelines for salary and OT
            const salaryPipeline = [
                {
                    $match: { user: new ObjectId(userId) }
                },
                {
                    $addFields: {
                        salary: { $toInt: '$salary' },
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSalary: { $sum: "$salary" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalSalary: 1,
                    }
                }
            ];

            const otPipeline = [
                {
                    $match: {
                        user: new ObjectId(userId)
                    }
                },
                {
                    $addFields: {
                        ot: { $toInt: '$ot' },
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalOT: { $sum: "$ot" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalOT: 1,
                    }
                }
            ];
            const tePipeline = [
                {
                    $match: {
                        user: new ObjectId(userId)
                    }
                },
                {
                    $addFields: {
                        te: { $toInt: '$te' },
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalTE: { $sum: "$te" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalTE: 1,
                    }
                }
            ];

            // Execute both pipelines in parallel
            const [salaryResult, otResult, teResult] = await Promise.all([
                salaryCollection.aggregate(salaryPipeline).toArray(),
                otCollection.aggregate(otPipeline).toArray(),
                teCollection.aggregate(tePipeline).toArray(),
            ]);



            // Calculate the total income by adding salary and OT
            const totalIncome = {
                totalSalary: salaryResult.length > 0 ? salaryResult[0].totalSalary : 0,
                totalOT: otResult.length > 0 ? otResult[0].totalOT : 0,
                totalTE: teResult.length > 0 ? teResult[0].totalTE : 0,
                total: (salaryResult.length > 0 ? salaryResult[0].totalSalary : 0) +
                    (otResult.length > 0 ? otResult[0].totalOT : 0) +
                    (teResult.length > 0 ? teResult[0].totalTE : 0),
            };



            resolve(totalIncome);
        });
    }
    , getWithdraw: (userId) => {
        return new Promise(async (resolve, reject) => {
            const total = await db
                .get()
                .collection(collection.withdrawCollection)
                .aggregate([
                    {
                        $match: { userId: new ObjectId(userId) }
                    },
                    {
                        $addFields: {
                            amount: { $toInt: '$amount' },
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalWithdraw: { $sum: "$amount" }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalWithdraw: 1,
                        }
                    }
                ])
                .toArray();


            if (total.length > 0) {

                resolve(total[0]);
            } else {
                console.log('No Results Found');
                resolve({ totalWithdraw: 0 });
            }

        });
    },
    notification: () => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.notificationCollection)
                .find()
                .sort({ date: -1 }) // Sort by notificationDate in descending order (latest date first)
                .toArray()
                .then((notifications) => {
                    resolve(notifications);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }










}