const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req,res) => {
    Subscriber.find({}).exec().then((subscribers) => {
        res.render("Subscribers", {
            subscribers: subscribers
        });
    })
    .catch((error) => {
        console.log(error.message);
        return[];
    })
    .then(() => {
        console.log("promise complete");
    });

};

exports.saveSubscriber = (req,res) => {
    let newSubsscriber = new Subscriber ( {
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.email,
        password: req.body.password //TODO make sure this is safe to use in the future
    });

    newSubsscriber.save().then( () => {
        res.render("Thank you for registering");
    }).catch(error => {
        res.send(error);
    });
};