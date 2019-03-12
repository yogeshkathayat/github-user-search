const User = require('../../models/nosql/user.model');


exports.findAll = async (reqData) => {
    try {
        const user = await User.findOne(reqData).lean().exec();
        return user;
    } catch (error) {
        throw error;
    }
};


exports.findUserByEmail = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail }).lean().exec();
        return user;
    } catch (error) {
        throw error;
    }
};
