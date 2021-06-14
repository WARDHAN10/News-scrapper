const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cheerio = require("cheerio");
const request = require("request");
require("dotenv").config();
app.use(cors());
const News = require("./model");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.get("/", (req, res) => {
  const url =
    "https://news.google.com/search?q=nri&hl=en-IN&gl=IN&ceid=IN%3Aen";

  request(url, (err, res, html) => {
    // console.log(html);
    var $ = cheerio.load(html);
    let i = 1;

    setInterval(function () {
      const titleSelector =
        "#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc.Haq2Hf.bWfURe > div.ajwQHc.BL5WZb.RELBvb > div > main > c-wiz > div.lBwEZb.BL5WZb.xP6mwf > div:nth-child(" +
        i +
        ") > div > article > h3 > a";
      console.log(titleSelector);
      const descriptionSelector =
        "#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc.Haq2Hf.bWfURe > div.ajwQHc.BL5WZb.RELBvb > div > main > c-wiz > div.lBwEZb.BL5WZb.xP6mwf > div:nth-child(" +
        i +
        ") > div > article > div.Da10Tb.Rai5ob > span";
      const dateSelector =
        "#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc.Haq2Hf.bWfURe > div.ajwQHc.BL5WZb.RELBvb > div > main > c-wiz > div.lBwEZb.BL5WZb.xP6mwf > div:nth-child(" +
        i +
        ") > div > article > div.QmrVtf.RD0gLb.kybdz > div > time";
      const ImageSelector =
        "#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc.Haq2Hf.bWfURe > div.ajwQHc.BL5WZb.RELBvb > div > main > c-wiz > div.lBwEZb.BL5WZb.xP6mwf > div:nth-child(" +
        i +
        ") > a > figure > img";
      const news = {
        title: $(titleSelector).text(),
        description: $(descriptionSelector).text(),
        date: $(dateSelector).attr().datetime,

        image: $(ImageSelector).attr("src"),
      };

      const newNews = new News(news);

      newNews.save((err, data) => {
        if (err) {
          console.log("error in saving news");
        }

        console.log({
          message: "the news has been saved",
          data,
        });
      });
    }, "3600000"); //
  });

  res.send("its working");
});

app.listen(8080, () => {
  console.log("its working");
});

{
}
