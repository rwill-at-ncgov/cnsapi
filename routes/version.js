const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
		version: "1.2",
		by: "Rick Williams",
		lastModDate: "20181102"		
	   })
})

module.exports = router
