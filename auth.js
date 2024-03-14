// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Customer} = require('./models/Customer'); // Adjust the path as needed

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
       
        const user = await Customer.findOne({ username });
        // console.log(username);
        // console.log(user);
        if (!user){
           
            return done(null, false, { message: 'Incorrect username.' });
        }
        ;
        const isMatch = await user.comparepassword(password);
        if (isMatch){
            
            return done(null, user);
        }  
        else{
            
            return done(null, false, { message: 'Incorrect password.' });
        }
           
    } catch (error) {
        console.log("auth error");
        return done(error);
    }
}));

module.exports = passport; // Export configured passport