const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts =async (req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );

  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async (req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );
  // products.push(req.body);
  // fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  const newProduct = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      products : newProduct,
    },
  });
};

// PUT /api/v1/products/:id
// ProductFindByIdAndUpdate(id,body,{new:true})
exports.updateProduct = async (req, res) =>{
    const {id} = req.params;

    // const products = JSON.parse(
    //    fs.readFileSync(`${__dirname}/../data/products.json`)
    // );
    // const foundProduct = products.find((p) => p.id == id);
    
    const foundProduct = await Product.findByIdAndUpdate(id,req.body,{new : true});
    if (foundProduct) {

      // const listProduct = products.filter((p) => p.id != id);
      // listProduct.push({
      //    id,
      //    ...req.body
      // });
      // fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(listProduct));

      res.status(200).json({
        status: "success",
        data: {
          product: foundProduct,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }

};
// DELETE /api/v1/products/:id
//ProductFindByIdAndDelete(Id)
exports.deleteProduct =async (req,res) => {
    const {id} = req.params;

    // const products = JSON.parse(
    //   fs.readFileSync(`${__dirname}/../data/products.json`)
    // );
    // const foundProduct = products.find((p) => p.id == id);

    const foundProduct =await Product.findByIdAndDelete(id);
    if (foundProduct) {

      // const listProduct = products.filter((p) => p.id != id);
      // fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(listProduct));

      res.status(200).json({
        status: "success",
        data: {
          product: foundProduct,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
};

exports.getProductById = async(req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );
  // const foundProduct = products.find((p) => p.id == req.params.id);

  
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
