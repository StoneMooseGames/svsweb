exports.showLogin =  (req, res) => {
    res.render("login");
};
exports.showRegister = (req,res) => {
    res.render("register");
};
exports.showContact = (req,res) => {
res.render("contact");
};

exports.showIndex = (req,res) => {
    res.render("index");
};

exports.showWelcome = (req,res) => {
    res.render("welcome");
};
exports.showUserInfo = (req,res) => {
    
     
        if (req.session.loggedin) {
            res.render("userinfo");        
        } else {
            res.render("usernotlogged");
        }
        res.end();
        
}