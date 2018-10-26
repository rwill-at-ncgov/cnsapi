const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
		version: "1.0",
		by: "Rick Williams",
		lastModDate: "20181023"		
	   })
})

module.exports = router
