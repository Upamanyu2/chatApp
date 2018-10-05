var mongoose    =   require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/userData', { useNewUrlParser: true });
// create instance of Schema
// var regSchema = mongoose.Schema;
// create schema
var usersSchema  = ({
     "Full_name":String,
     "mobile":String,
     "Email":String,
     "Password" : String
});
// create model if not exists.
module.exports = mongoose.model('userdatas',usersSchema);