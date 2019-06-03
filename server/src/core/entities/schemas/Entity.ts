import * as mongoose from "mongoose";

const Entity = {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    iid: {
        type: mongoose.Schema.Types.Number
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    code: {
        type: mongoose.Schema.Types.String
    },
    status: {
        type: mongoose.Schema.Types.Number
    },
    createdDate: {
        type: mongoose.Schema.Types.Date
    },
    updatedDate: {
        type: mongoose.Schema.Types.Date
    },
    createUserIid: {
        type: mongoose.Schema.Types.Number
    },
    updatedUserIid: {
        type: mongoose.Schema.Types.Number
    },
    createOrgIid: {
        type: mongoose.Schema.Types.Number
    },
    updatedOrgIid: {
        type: mongoose.Schema.Types.Number
    },
    orgRootIid: mongoose.Schema.Types.Number,
    notes: {
        type: mongoose.Schema.Types.String
    },
}

export default Entity;