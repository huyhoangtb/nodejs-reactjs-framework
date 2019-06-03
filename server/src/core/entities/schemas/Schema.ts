import * as mongoose from "mongoose";
import Translate from "../../i18n";

const defaultSchema = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  iid: {
    type: Number,
    required: [true, Translate.use('iid is required!!')]
  },
  name: {
    type: String,
    required: [true, Translate.use('name is required!!')]
  },
  status: Number,
  createDate: {
    type: Date,
    required: [true, Translate.use('create date is required!!')]
  },
  updateDate: {
    type: Date,
    required: [true, Translate.use('update date is required!!')]
  },
};

export const SchemaCode = {
  ...defaultSchema,
  code: {
    type: String,
    required: [true, Translate.use('name is required!!')]
  },
};

export const SchemaWithRoleAndPermission = {
  ...defaultSchema,
  permissions: [Number],
  roles: [Number],
};


export const SchemaCodeWithRoleAndPermission = {
  ...SchemaCode,
  permissions: [Number],
  roles: [Number],
};


export default defaultSchema;
