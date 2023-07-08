const mongoose = require('mongoose')

const packageSchema = mongoose.Schema({
    region: String,
    category: String,
    title: String,
    reviews: Number,
    destinations: [String],
    age_range: String,
    travel_style: [String],
    tour_length: Number,
    price_per_day: Number,
    str_price: Number,
    act_price: Number,
    save_price: Number,
    addional_price: Number,
    off: Number,
    main_image: String,
    rating: Number,
    tour_id: Number,
    group_size: Number,
    top_crousel_img: [String],
    places_see_img: [String],
    places_see_name: [String],
    map_img: String
});

const PackageModel = mongoose.model('package', packageSchema)

module.exports = {PackageModel}