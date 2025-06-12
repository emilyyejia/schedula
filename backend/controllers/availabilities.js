
const Availability = require('../models/availability');
;
module.exports = {
    index,
    create,
};

async function index(req, res) {
  try {
    const availabilities = await Availability.find({});
    // below would return all availabilitys for just the logged in user
    res.json(availabilities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch availabilitys' });
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const availability = await Availability.create(req.body);
    res.json(availability);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create availability' });
  }
}

