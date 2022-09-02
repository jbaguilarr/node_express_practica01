const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

// PUT /api/v1/products/:id
exports.updateProduct = (req, res) =>{
    const {id} = req.params;

    const products = JSON.parse(
       fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const foundProduct = products.find((p) => p.id == id);

    if (foundProduct) {

      const listProduct = products.filter((p) => p.id != id);
      listProduct.push({
         id,
         ...req.body
      });
      fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(listProduct));

      res.status(200).json({
        status: "success",
        data: {
          product: listProduct,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }

};
// DELETE /api/v1/products/:id
exports.deleteProduct = (req,res) => {
    const {id} = req.params;

    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const foundProduct = products.find((p) => p.id == id);
    if (foundProduct) {

      const listProduct = products.filter((p) => p.id != id);
      fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(listProduct));

      res.status(200).json({
        status: "success",
        data: {
          product: listProduct,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
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
