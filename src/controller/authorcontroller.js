const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')
//====================author creation===============//
const author = async function (req, res) {
  const authorData = req.body
  const authorEmail = req.body.email
  const validEmail = /^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/.test(authorEmail)

  try {
    if (validEmail == true) {
      const createAuthor = await authorModel.create(authorData)
      res.status(201).send({ status: true, data: createAuthor })
    }
    else {
      res.status(400).send({ status: false, msg: "invalid email" })
    }

  } catch (err) {
    res.status(500).send({ status: false, msg: err })
  }

}
module.exports.author = author

//======================  get author =============================//


//=============================================================//

