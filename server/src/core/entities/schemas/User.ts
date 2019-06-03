import Entity from './Entity';
import Translate from "../../i18n";
import * as mongoose from "mongoose";

export default  {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    ...Entity,
    firstName: {
        type: mongoose.Schema.Types.String,
        required: [true, Translate.use('clientId is required!!')]
    },
    lastName: mongoose.Schema.Types.String,
    username: {
        unique : true,
        type: mongoose.Schema.Types.String,
    },
    jobPositions: {
        type: [mongoose.Schema.Types.Number]
    },
    password: mongoose.Schema.Types.String,
    email: {
        type: mongoose.Schema.Types.String,
        validate: {
            validator: function (v: string) {
                return /^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)+$/.test(v);
            },
            message: (props: any) => Translate.use('%s is not a valid phone number!!', props.value)
        },
    },
    phone: mongoose.Schema.Types.String,
    address: mongoose.Schema.Types.String,
    accountStatus: mongoose.Schema.Types.Number,
    status: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'status is required!...']
    },
    notes: mongoose.Schema.Types.String,
    orgIids: [mongoose.Schema.Types.Number],
    paths: [mongoose.Schema.Types.String]
};


