
const imageUpload = (req,res) => {
    if(req.files) {
        const {imageUpload} = req.files
        console.log(imageUpload.data)
    }
    res.sendStatus(200)
  }

module.exports = {
    imageUpload
}