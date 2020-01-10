var Mongoose = require('mongoose');

const events = [
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'tristique',
		description: 'amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam',
		date: '1/27/2018',
		imgUrl: [ 'http://dummyimage.com/205x223.jpg/5fa2dd/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'music',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000004',
		planId: '5e148aadfc13ae1216000001'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'et',
		description:
			'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar',
		date: '3/30/2018',
		imgUrl: [ 'http://dummyimage.com/185x240.jpg/5fa2dd/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'it',
		cost: '2,99$',
		organizerId: '5e148bf8fc13ae0c40000004',
		planId: '5e148aadfc13ae1216000003'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'pede morbi',
		description: 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed',
		date: '5/10/2018',
		imgUrl: [ 'http://dummyimage.com/239x231.jpg/ff4444/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'music',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000006',
		planId: '5e148aadfc13ae1216000005'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'tristique tortor',
		description:
			'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur',
		date: '3/8/2018',
		imgUrl: [ 'http://dummyimage.com/233x226.jpg/ff4444/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'education',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000006',
		planId: '5e148aadfc13ae1216000007'
	}
];

module.exports.events = events;
