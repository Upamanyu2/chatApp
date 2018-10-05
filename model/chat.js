var mongoose    =   require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/userData', { useNewUrlParser: true });
var chatSchema = ({
    "Userid":String,
    "Name":String,
    "Message":String,
    "Time":String
});
module.exports = mongoose.model('chatdatas',chatSchema);