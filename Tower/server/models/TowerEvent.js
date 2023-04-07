import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    creatorId:{type: Schema.Types.ObjectId, required: true, ref: "Account"},
    name: {type: String, required: true, minLength: 1, maxLength: 500},
    description: {type: String, required: true, minLength: 1, maxLength: 2000},
    coverImg: {type: String, required: true, maxLength: 1000},
    location: {type: String, required: true, minLength: 1, maxLength: 1000},
    capacity: {type: Number, required: true, min: 1, max: 100000},
    startDate: {type: Date, required: true},
    isCanceled: {type: Boolean, default: false},
    type: {type: String, enum:["concert", "sport", "convention", "digital"], default: "misc"},
},{ timestamps: true, toJSON: {virtuals: true}})

TowerEventSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

TowerEventSchema.virtual("ticketCount", {
    foreignField: "eventId",
    localField: "_id",
    count: true,
    ref: "Ticket"
})