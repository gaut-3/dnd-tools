const db = require("../models");
const DnDDates = db.dates;

exports.getDates = async function (req, res) {
    try {
        const data = await DnDDates.findOne({"uuid": req.params.id})
        console.log("show doc", data, req.params.id)

        res.status(200).json({
            data
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.addDate = async function (req, res) {
    try {
        const dndDates = new DnDDates({
            dates: req.body.dndDates.dates,
            uuid: req.body.dndDates.uuid
        })
        await DnDDates.updateOne({"uuid": req.params.id}, {"dates": dndDates.dates})
            .then(function (result) {
                if(result.modifiedCount == 1) {
                   res.sendStatus(200).send();
                } else {
                    res.status(500).send({ message: "update was not successfull" })
                }
            });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}



