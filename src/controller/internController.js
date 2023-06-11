const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const postIntern = async function (req, res) {

    try {
        const { collegeName } = req.body
        const data = req.body
        const checkedClg = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 })
        if (checkedClg) {
            req.body.collegeId = checkedClg._id
            const SavedData = await internModel.create(data)
            const { isDeleted, name, email, mobile, collegeId } = SavedData
            return res.status(201).send({ status: true, data: { isDeleted, name, email, mobile, collegeId } })
        } else {
            return res.status(400).send({ status: false, msg: "ThisCollege Name Is Not Found" })
        }



    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, msg:err})

    }
}
module.exports.postIntern = postIntern

