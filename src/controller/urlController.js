const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const redis = require("redis");
const { promisify } = require("util");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++//
// connect redis
const client = redis.createClient(
  17873,
  "redis-17873.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
client.auth("PrvM94vLRCYizAnMvr5iiDXMupOxoxR3", function (err) {
  if (err) throw err;
});

client.on("connect", function () {
  console.log("connected to redis");
});

const SET_ASYNC = promisify(client.SET).bind(client);
const GET_ASYNC = promisify(client.GET).bind(client);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

const createUrl = async function (req, res) {
  const longUrl = req.body.longUrl;
  try {
    if (!longUrl)
      return res
        .status(400)
        .json({ status: false, msg: "please give longUrl" });
    if (longUrl == undefined || longUrl == "" || typeof longUrl !== "string")
      return res
        .status(400)
        .json({ status: false, msg: "please give  valid Url in string " });
    if (!validUrl.isWebUri(longUrl))
      return res.status(400).json({ status: false, msg: "Url is not valid" });

    //check in cache
    const urlInCache = await GET_ASYNC(`${longUrl}`);
    if (urlInCache) {
      const cacheUrl = JSON.parse(`${urlInCache}`);
      return res
        .status(200)
        .send({ status: true, msg: "found in cache 1", data: cacheUrl });
    }

    const presentUrl = await urlModel.findOne({ longUrl: longUrl });

    if (presentUrl) {
       await SET_ASYNC(
        `${longUrl}`,
        JSON.stringify({
          urlCode: presentUrl.urlCode,
          shortUrl: presentUrl.shortUrl,
          longUrl:presentUrl.longUrl
        })
      );

      return res.status(409).send({ status: true, data: presentUrl.shortUrl });
    }

    const urlCode = shortId.generate(longUrl);

    const LH = "http://localhost:3000/";
    const shortUrl = `${LH}${urlCode}`;
     await SET_ASYNC(
      `${longUrl}`,
      JSON.stringify({ urlCode, shortUrl,longUrl }),
      "Ex",
      24 * 60 * 60
    );
    const createdUrl = await urlModel.create({
      longUrl,
      urlCode,
      shortUrl,
    });

    res.status(201).send({ status: true, data: createdUrl });
  } catch (err) {
    res.status(500).send({ status: false, data: "server error" });
  }
};
module.exports.createUrl = createUrl

//+++++++++++++++++++++++  get url +++++++++++++++++++++++++++++++++//

const getUrl = async function (req, res) {
  let inputUrl = req.params.urlCode;
  console.log(inputUrl);
  try {

    // check in cache
    const urlInCache = await GET_ASYNC(`${inputUrl}`);
    if (urlInCache) {
      const url= JSON.parse(urlInCache)
     return res.status(302).redirect(url)
    }

    //
    const findUrl = await urlModel
      .findOne({ urlCode: inputUrl })
    if (!findUrl)
      return res.status(404).json({ status: false, msg: "no Url found" });
      const { longUrl, urlCode, shortUrl} = findUrl
 await SET_ASYNC(`${inputUrl}`,JSON.stringify({longUrl:longUrl}));
    res.status(302).redirect(findUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send({ stauts: false, msg: "server error" });
  }
};
module.exports.getUrl = getUrl;
