const mongoose = require('mongoose');
const UserSchema = require('./schemas/User');

const CONNECTION_URL = 'mongodb+srv://tunh:NHTmongodb13101997@cluster0-yn5vf.mongodb.net/test?retryWrites=true&w=majority';
const CONNECTION_OPTIONS = {
    useNewUrlParser: true,
    dbName: 'my-api',
    useUnifiedTopology: true
};

const connectDatabase = async () => {
    mongoose
        .connect(CONNECTION_URL, CONNECTION_OPTIONS)
        .catch(err => {
            console.log(err);
        });
};

connectDatabase();

module.exports = {
    UserModel: mongoose.model('User', UserSchema)
}