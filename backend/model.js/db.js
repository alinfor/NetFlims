const mongoose =require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ali:Opluffy92@cluster0.hkuyuum.mongodb.net/netflim-node",
{ useNewUrlParser: true, useUnifiedTopology: true },
(err)=>{
    if(err) return console.log("pas connecter a mpngodb"+err);
    console.log("mongodb connect");
}
)