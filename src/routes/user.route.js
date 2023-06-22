const express = require("express");
const path = require("path");
const fs = require("fs");
const route = express.Router();

const userJson = path.join(__dirname, "../user-post-api/users.json");

route
  .route("/")
  .get((req, res) => {
    fs.readFile(userJson, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Data Not Found" });
        return;
      }
      const dataConvert = JSON.parse(data);
      res.status(200).json(dataConvert);
    });
  })
  .post((req, res) => {
    fs.readFile(userJson, (err, data) => {
      if (err) {
        res.status(404).json({ message: "NOT FOUND DATA" });
        return;
      }
      const dataConvert = JSON.parse(data);
      dataConvert.push(req.body);
      console.log(123, dataConvert);
      fs.writeFile(userJson, JSON.stringify(dataConvert), () => {
        res.status(200).json({ message: "Create Success" });
      });
    });
  });

route
  .route("/:id")
  .get((req, res) => {
    const idPath = req.params.id;
    fs.readFile(userJson, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Data Not Found" });
        return;
      }
      const dataConvert = JSON.parse(data);
      const checkIdUser = dataConvert.find((user) => user.id == idPath);
      if (!checkIdUser) {
        res.status(500).json({ message: "Not Found User" });
      } else {
        res.status(200).json(checkIdUser);
      }
    });
  })
  .put((req, res) => {
    const idParams = req.params.id;
    fs.readFile(userJson, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Data Not Found" });
        return;
      }
      const convertData = JSON.parse(data);
      const checkDataPut = convertData.findIndex((obj) => obj.id == idParams);
      console.log(12345, checkDataPut);
      if (checkDataPut === -1) {
        return res.status(500).json({ message: "User Not Found" });
      }
      convertData[checkDataPut] = { ...convertData[checkDataPut], ...req.body };
      // console.log(convertData[checkDataPut]);
      fs.writeFile(userJson, JSON.stringify(convertData), () => {
        res.status(200).json({ message: "Update Successfully" });
      });
    });
  })
  .delete((req, res) => {
    const contentID = req.params.id;
    fs.readFile(userJson, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Data Not Found" });
      }
      const convertData = JSON.parse(data);
      const filterData = convertData.filter((obj) => obj.id !== Number(contentID));

      if (filterData.length === convertData.length) {
        res.status(500).json({ message: "User Not Found" });
        return;
      }
      fs.writeFileSync(userJson, JSON.stringify(filterData));
      res.status(200).json(filterData);
    });
  });
module.exports = route;
