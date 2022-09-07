const mongoosex = require('mongoose');
const app = require("./app");
const Product = require('./models/Product');
const port = process.env.PORT;
const dbDatabase = process.env.DATABASE;
mongoosex.connect(dbDatabase,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((con)=>{
  console.log("conected.....");
  // const p = new Product({
  //       productName : "Producto 1",
  //       price : 10
  // });

  // p.save().then(()=>{
  //   console.log('saved !!!');
  // });
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
