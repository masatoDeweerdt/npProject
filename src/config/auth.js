module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (res.isAuthenticated()) {
            return next();
        }
        res.flash('error_msg', 'Please log in to the view this resource');
        res.redirect('/users/login')
    }
}