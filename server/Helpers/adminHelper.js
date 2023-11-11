var db = require('../config/connection')
var collection = require('../config/collection')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    addEvent: (event) => {
        return new Promise((resolve, reject) => {
            event.slot = parseInt(event.slot)
            event.slotCap = parseInt(event.slotCap)
            event.slotMain = parseInt(event.slotMain)
            event.slotSuper = parseInt(event.slotSuper)
            const currentDateTime = new Date().toISOString();
            event.currentDateTime = currentDateTime;
            db.get().collection(collection.eventCollection).insertOne(event).then((data) => {
                resolve(data.insertedId);
            })
        })
    },
    getAllEvents: (req, res) => {
        db.get().collection(collection.eventCollection).find().toArray()
            .then((events) => {
                const updatedEvents = events.map((event) => {
                    if (event.slot === 0) {
                        return {
                            ...event,
                            slotStatus: "Slot is full",
                        };
                    }
                    return event;
                });
                res.json(updatedEvents); // Send updated events data as JSON response
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
            });
    }

    ,
    getAllEventsUser: (req, res) => {
        db.get().collection(collection.eventCollection)
            .find({ slot: { $gt: 0 } }) // Filter events with a slot greater than 0
            .toArray()
            .then((events) => {
                res.json(events); // Send filtered events data as JSON response
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
            });
    }

    ,
    deleteEvent: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.eventCollection).deleteOne({ _id: new ObjectId(proId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    ,
    deleteNotification: (proId) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.notificationCollection).deleteOne({ _id: new ObjectId(proId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    ,
    deleteverifiy: (userId) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.verifyCollection).deleteOne({ _id: new ObjectId(userId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    ,
    deleteemp: (userId) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.userCollection).deleteOne({ _id: new ObjectId(userId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    ,
    getEventDetails: (proId) => {
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(collection.eventCollection).findOne({ _id: new ObjectId(proId) }).then((event) => {
                    resolve(event);
                })

            } catch (error) {
                reject(error);
            }
        });
    }
    ,
    updateEvent: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.eventCollection).updateOne({ _id: new ObjectId(proId) }, {
                $set: {
                    location: proDetails.location,
                    time: proDetails.time,
                    date: proDetails.date,
                    event: proDetails.event,
                    slot: proDetails.slot,
                    slotCap: proDetails.slotCap,
                    slotMain: proDetails.slotMain,
                    slotSuper: proDetails.slotSuper,

                }
            }).then((response) => {
                resolve()
            })

        })
    },
    getEmpInfo: (req, res) => {
        db.get().collection(collection.userCollection).find().toArray()
            .then((users) => {
                res.json(users); // Send events data as JSON response
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
            });
    },
    getEmpveriInfo: (req, res) => {
        db.get().collection(collection.verifyCollection).find().toArray()
            .then((users) => {
                res.json(users); // Send events data as JSON response
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
            });
    },
    getcalander: (req, res) => {
        db.get().collection(collection.eventCollection).find().toArray().then((events) => {
            res.json({ events })
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
        });

    },
    getUserDetails: (proId) => {
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(collection.userCollection).findOne({ _id: new ObjectId(proId) }).then((user) => {
                    resolve(user);
                })

            } catch (error) {
                reject(error);
            }
        });
    },
    updateUser: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.userCollection).updateOne({ _id: new ObjectId(proId) }, {
                $set: {
                    role: proDetails.role,
                }
            }).then((response) => {
                resolve()
            })

        })
    },
    confirmedPdf: (proId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const bookingDetails = await db.get().collection(collection.bookCollection).find({
                    'events.item': new ObjectId(proId)
                }).toArray();
                if (bookingDetails && bookingDetails.length > 0) {
                    const userIds = bookingDetails.map((booking) => booking.user);

                    const users = await db.get().collection(collection.userCollection).find({
                        _id: { $in: userIds.map((userId) => new ObjectId(userId)) }
                    }).toArray();
                    resolve(users);
                } else {
                    reject("No booking details found for the provided proId");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    viewCaptains: (proId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const captainDetails = await db.get().collection(collection.captainCollection).find({
                    eventId: new ObjectId(proId)
                }).toArray();

                resolve(captainDetails);

            } catch (error) {
                reject(error);
            }
        });
    },
    isFine: (proId) => {
        return new Promise(async (resolve, reject) => {
            const bookingDetails = await db.get().collection(collection.bookCollection).find({
                'events.item': new ObjectId(proId)
            }).toArray();
            if (bookingDetails && bookingDetails.length > 0) {
                const userIds = bookingDetails.map((booking) => booking.user);

                const users = await db.get().collection(collection.userCollection).find({
                    _id: { $in: userIds.map((userId) => new ObjectId(userId)) }
                }).toArray();
                const userIdss = users.map(user => user._id);

                const usersWithFines = await db.get().collection(collection.fineCollection).find({
                    user: { $in: userIdss },
                    eventId: new ObjectId(proId)
                }).toArray();
                const Onsite = await db.get().collection(collection.salaryCollection).find({
                    user: { $in: userIdss },
                    event: new ObjectId(proId)
                }).toArray();
                const OtGiven = await db.get().collection(collection.otCollection).find({
                    user: { $in: userIdss },
                    eventId: new ObjectId(proId)
                }).toArray();
                const TeGiven = await db.get().collection(collection.teCollection).find({
                    user: { $in: userIdss },
                    eventId: new ObjectId(proId)
                }).toArray();

                resolve({ usersWithFines, Onsite, OtGiven, TeGiven });
            } else {
                resolve({
                    usersWithFines: [], Onsite: [], OtGiven: [], TeGiven: []
                });
            }
        });
    }

    ,
    addFine: (userId, userDetails) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if any of the required fields are null
                if (!new ObjectId(userDetails.eventId) || !userDetails.fineFor || !userDetails.fine) {
                    reject("Incomplete data provided");
                    return;
                }

                const currentDate = new Date();

                const existingFine = await db.get().collection(collection.fineCollection).findOne({
                    user: userId,
                    eventId: new ObjectId(userDetails.eventId)
                });

                if (existingFine) {
                    reject("Fine is already marked for this user and event");
                } else {
                    const eventdetails = await db.get().collection(collection.eventCollection).findOne({ _id: new ObjectId(userDetails.eventId) })

                    const fine = {
                        user: new ObjectId(userId),
                        eventId: new ObjectId(userDetails.eventId),
                        finefor: userDetails.fineFor,
                        fine: - parseInt(userDetails.fine, 10),
                        event: eventdetails.event,
                        location: eventdetails.location,
                        date: currentDate
                    };

                    const result = await db.get().collection(collection.fineCollection).insertOne(fine);
                    resolve("Fine added successfully");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    viewFine: (userId, userDetails) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.fineCollection).findOne({
                user: new ObjectId(userId),
                eventId: new ObjectId(userDetails)
            }).then((data) => {
                resolve(data)
            })
        })
    },
    viewOt: (userId, userDetails) => {

        return new Promise((resolve, reject) => {

            db.get().collection(collection.otCollection).findOne({
                user: new ObjectId(userId),
                eventId: new ObjectId(userDetails)
            }).then((data) => {
                resolve(data)
            })
        })
    },
    viewTe: (userId, userDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.teCollection).findOne({
                user: new ObjectId(userId),
                eventId: new ObjectId(userDetails)
            }).then((data) => {
                resolve(data)
            })
        })
    },
    viewSalary: (userId, userDetails) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.salaryCollection).findOne({
                user: new ObjectId(userId),
                event: new ObjectId(userDetails)
            }).then((data) => {
                resolve(data)
            })
        })
    },
    updateFine: (userId, eventId, fineDetails) => {
        return new Promise((resolve, reject) => {
            const fine = fineDetails.values.fine;

            // Ensure that the fine value is negative
            const updatedFine = -Math.abs(parseInt(fine, 10));

            db.get().collection(collection.fineCollection).updateOne({
                user: new ObjectId(userId),
                eventId: new ObjectId(eventId)
            }, {
                $set: {
                    fine: updatedFine,
                    finefor: fineDetails.values.finefor
                }
            }).then((response) => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    ,
    updateOt: (userId, eventId, fineDetails) => {
        return new Promise((resolve, reject) => {
            const ot = fineDetails.values.ot;

            // Ensure that the fine value is negative
            const updatedOt = Math.abs(parseInt(ot, 10));

            db.get().collection(collection.otCollection).updateOne({
                user: new ObjectId(userId),
                eventId: new ObjectId(eventId)
            }, {
                $set: {
                    ot: updatedOt,
                    otfor: fineDetails.values.otfor
                }
            }).then((response) => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    ,
    updateSalary: (userId, eventId, fineDetails) => {
        return new Promise((resolve, reject) => {
            const salary = fineDetails.salary;

            // Ensure that the fine value is negative
            const updatedSalary = Math.abs(parseInt(salary, 10));

            db.get().collection(collection.salaryCollection).updateOne({
                user: new ObjectId(userId),
                event: new ObjectId(eventId)
            }, {
                $set: {
                    salary: updatedSalary,

                }
            }).then((response) => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    ,
    updateTe: (userId, eventId, fineDetails) => {
        return new Promise((resolve, reject) => {
            const te = fineDetails.values.te;
            const updatedTe = Math.abs(parseInt(te, 10));

            const teCollection = db.get().collection(collection.teCollection);
            const withdrawCollection = db.get().collection(collection.withdrawCollection);
            teCollection.updateOne(
                {
                    user: new ObjectId(userId),
                    eventId: new ObjectId(eventId)
                },
                {
                    $set: {
                        te: updatedTe,
                        tefor: fineDetails.values.tefor
                    }
                }
            )
                .then((teResult) => {
                    if (teResult.modifiedCount === 1) {
                        withdrawCollection.updateOne(
                            {
                                userId: new ObjectId(userId),
                                eventId: new ObjectId(eventId)
                            },
                            {
                                $set: {
                                    amount: -updatedTe,
                                    tefor: fineDetails.values.tefor
                                }
                            }
                        )
                            .then(() => {
                                console.log("Both collections updated successfully.");
                                resolve();
                            })
                            .catch((withdrawErr) => {
                                console.error("Error updating withdrawCollection:", withdrawErr);
                                reject(withdrawErr);
                            });
                    } else {
                        console.error("Error updating teCollection: No matching document found.");
                        reject(new Error("No matching document found in teCollection."));
                    }
                })
                .catch((teErr) => {
                    console.error("Error updating teCollection:", teErr);
                    reject(teErr);
                });
        });
    }


    ,
    addTe: (userId, eventId, userDetails) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if any of the required fields are null
                if (!eventId || !userDetails.teFor || !userDetails.te) {
                    reject("Incomplete data provided");
                    return;
                }
                const currentDate = new Date();
                const existingTe = await db.get().collection(collection.teCollection).findOne({
                    user: new ObjectId(userId),
                    event: new ObjectId(eventId)
                });
                if (existingTe) {
                    reject("Ot is already marked for this user and event");
                } else {
                    const eventdetails = await db.get().collection(collection.eventCollection).findOne({ _id: new ObjectId(eventId) })

                    const te = {
                        user: new ObjectId(userId),
                        eventId: new ObjectId(eventId),
                        tefor: userDetails.teFor,
                        te: parseInt(userDetails.te, 10),
                        event: eventdetails.event,
                        location: eventdetails.location,
                        date: currentDate
                    };
                    const user = await db.get().collection(collection.userCollection).findOne({ _id: new ObjectId(userId) })
                    const teWithdraw = {
                        userId: new ObjectId(userId),
                        eventId: new ObjectId(eventId),
                        tefor: userDetails.teFor,
                        name: 'Travel Exp',
                        number: user.number,
                        amount: -parseInt(userDetails.te, 10),
                        date: currentDate
                    }
                    const result1 = await db.get().collection(collection.withdrawCollection).insertOne(teWithdraw);
                    const result = await db.get().collection(collection.teCollection).insertOne(te);
                    resolve("Ot added successfully");
                }

            } catch (error) {
                reject(error);
            }
        })
    }

    ,
    addOt: (userId, userDetails) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if any of the required fields are null
                if (!userDetails.eventId || !userDetails.otFor || !userDetails.ot) {
                    reject("Incomplete data provided");
                    return;
                }
                const currentDate = new Date();
                const existingOt = await db.get().collection(collection.otCollection).findOne({
                    user: new ObjectId(userId),
                    event: new ObjectId(userDetails.eventId)
                });
                if (existingOt) {
                    reject("Ot is already marked for this user and event");
                } else {
                    const eventdetails = await db.get().collection(collection.eventCollection).findOne({ _id: new ObjectId(userDetails.eventId) })

                    const ot = {
                        user: new ObjectId(userId),
                        eventId: new ObjectId(userDetails.eventId),
                        otfor: userDetails.otFor,
                        ot: parseInt(userDetails.ot, 10),
                        event: eventdetails.event,
                        location: eventdetails.location,
                        date: currentDate
                    };
                    const result = await db.get().collection(collection.otCollection).insertOne(ot);
                    resolve("Ot added successfully");
                }

            } catch (error) {
                reject(error);
            }
        })
    }

    ,
    addSalary: async (events, userId) => {
        try {
            const user = await db
                .get()
                .collection(collection.userCollection)
                .findOne({ _id: new ObjectId(userId) });
            const currentDate = new Date();
            if (user) {
                let salary;

                switch (user.role) {
                    case 'A5':
                        salary = 410;
                        break;
                    case 'A4':
                        salary = 420;
                        break;
                    case 'A3':
                        salary = 430;
                        break;
                    case 'A2':
                        salary = 440;
                        break;
                    case 'A1':
                        salary = 450;
                        break;
                    case 'supervisor':
                        salary = 470;
                        break;
                    case 'main-boy':
                        salary = 480;
                        break;
                    case 'captain':
                        salary = 500;
                        break;
                    default:
                        // Handle the case where the user's role is not recognized
                        throw new Error('Invalid role');
                }
                // Check if a salary record already exists for this event
                const existingSalary = await db
                    .get()
                    .collection(collection.salaryCollection)
                    .findOne({
                        user: user._id, event: new ObjectId(events)
                    });

                if (existingSalary) {
                    throw new Error('Salary record already exists for this event');
                } else {
                    // Create the salary record with property checks

                    const eventdetails = await db.get().collection(collection.eventCollection).findOne({ _id: new ObjectId(events) })
                    const salaryRecord = {
                        user: user._id,
                        event: new ObjectId(events),
                        role: user.role,
                        salary: salary,
                        events: eventdetails.event,
                        location: eventdetails.location,
                        date: currentDate,
                    };

                    // Check each property before inserting
                    for (const key in salaryRecord) {
                        if (salaryRecord[key] === undefined || salaryRecord[key] === '') {
                            throw new Error(`Invalid value for ${key}`);
                        }
                    }

                    const result = await db
                        .get()
                        .collection(collection.salaryCollection)
                        .insertOne(salaryRecord);

                    if (result.insertedId) {
                        return { status: 'success', message: 'Salary record added successfully' };
                    } else {
                        throw new Error('Failed to insert salary record');
                    }
                }
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            throw error;
        }
    },
    withDraw: async (userDetails) => {
        try {
            const currentDate = new Date();

            // Find the user in the database
            const numberToSearch = parseInt(userDetails.number, 10);
            let user = await db.get().collection(collection.userCollection).findOne({ number: numberToSearch });
            if (user) {

                const withdraw = {
                    userId: user._id,
                    name: user.name,
                    number: userDetails.number,
                    amount: -parseInt(userDetails.amount, 10),
                    date: currentDate,
                };
                const result = await db.get().collection(collection.withdrawCollection).insertOne(withdraw);

                return result.insertedId; // Return the inserted ID or perform necessary actions
            } else {
                throw new Error('User not found'); // Handle the case when the user is not found
            }
        } catch (error) {
            throw error;
        }
    }
    ,
    addCaptain: async (eventId, userId) => {
        try {
            const currentDate = new Date();

            // Validate if eventId and userId have values
            if (!eventId || !userId) {
                throw new Error("Invalid eventId or userId");
            }

            // Check if the user is already a captain
            let user = await db.get().collection(collection.captainCollection).findOne({ userId: new ObjectId(userId) });
            if (user) {
                return "user already a captain";
            } else {
                // If all validations pass, proceed with the insertion
                let userData = await db.get().collection(collection.userCollection).findOne({ _id: new ObjectId(userId) });

                const captain = {
                    userId: new ObjectId(userId),
                    name: userData.name,
                    eventId: new ObjectId(eventId),
                    role: 'captain',
                    date: currentDate,
                };
                const result = await db.get().collection(collection.captainCollection).insertOne(captain);

                return result.insertedId;
            }
        } catch (error) {
            throw error;
        }
    },


    viewWithraw: (req, res) => {
        db.get().collection(collection.withdrawCollection).find().toArray()
            .then((users) => {
                res.json(users); // Send events data as JSON response
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' }); // Handle errors and send an error response
            });
    },
    deleteWithdraw: (proId) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.withdrawCollection).deleteOne({ _id: new ObjectId(proId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    notification: (notification) => {
        return new Promise((resolve, reject) => {
            const currentDate = new Date();
            const notifications = {
                notification: notification,
                date: currentDate,
            };
            db.get().collection(collection.notificationCollection).insertOne(notifications)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },













}