const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    fish: {
        type: Schema.Types.ObjectId,
        ref: 'fish'
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'plant'
    }]
})

const Portfolio = mongoose.model('portfolio', PortfolioSchema);

module.exports = Portfolio;