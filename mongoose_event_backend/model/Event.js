const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		timestamps: true,
		required: true,
	},
	maxNumberGuests: {
		type: Number,
		required: true,
		min: 1,
	},
}, { versionKey: false });

const Event = mongoose.model("Event", EventSchema);

async function create ({ title, date, maxNumberGuests }) {
	const event = new Event({
		title,
		date,
		maxNumberGuests,
	});

	return await event.save();
}

async function readAll () {
	return await Event.find();
}

async function readOne (id) {
	return (await Event.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(id),
			},
		},
		{
            $lookup: {
                from: "guests",
                localField: "_id",
                foreignField: "eventId",
                as: "guests",
            }
        }
	]))[0];
}

async function update (id, { title, date, maxNumberGuests }) {
	const event = await Event.findById(id);
	if (!event) throw new Error("event_not_found");

	event.title = title || event.title;
	event.date = date || event.date;
	event.maxNumberGuests = maxNumberGuests || event.maxNumberGuests;

	return await event.save();
}

async function deleteById (id){
	return await Event.findByIdAndDelete(id);
}

module.exports = {
	create,
	readAll,
    readOne,
	update,
	deleteById,
};
