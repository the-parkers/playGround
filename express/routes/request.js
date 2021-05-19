const express = require('express');
const router = express.Router();

const user = require('../controller/user')

router.get('/parksData',user.parksData)
router.post('/login',user.login)
router.post('/signUp',user.signUp)
router.get('/basketball',user.basketball)
router.get('/parks',user.parks)
router.get('/handball',user.handball)
router.get('/indoor_pool',user.indoor_pool)
router.get('/outdoor_pool',user.outdoor_pool)
router.get('/running_track',user.running_track)
router.get('/bbqing_areas',user.bbqing_areas)
router.get('/dog_areas',user.dog_areas)
router.get('/park_events',user.park_events)
router.get('/favoritesList',user.favorites)
router.get('/', user.fillDb)

module.exports = router