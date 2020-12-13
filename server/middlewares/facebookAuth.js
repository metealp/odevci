const config = require('../configuration');
const User = require('../models/user');
const axios = require('axios');

module.exports = async (req, res, next) => {
    try {
        console.log("try block started");
    
        const { data, status } = await axios.get(`https://graph.facebook.com/v9.0/me?fields=id,email,name&access_token=${req.body.accessToken}`);
        // console.log(status);
        // console.log(data);

        if ( status == 200){
            const foundUser = await User.findOne({'facebook.id': data.id }).exec();
            if(!foundUser){
                const newUser = User.create({
                    method: 'facebook',
                    name: data.name ? data.name : "no name",
                    country: data.pages_user_locale ? data.pages_user_locale : "no locale",
                    facebook: {
                        id: data.id,
                        email: data.email ? data.email : "no email",
                    }
                });
                req.user = newUser;
                // console.log(newUser);

                next();

            } else {
                req.user = foundUser;
                // console.log(foundUser);
                next();

            }
            //     if(error){ 
            //         res.status(500).json({isSuccess: false, message: 'Server could not execute the user query.', error})
            //     } else {
            //     }
            // });

        }
        // .then( (response) => {
        //     console.log(response.status);
        // }).then( next() )
    }
    // .catch(err => console.log('error happens', err));
    catch{
        err => console.log('error happens', err)
        next();
    };

    
}