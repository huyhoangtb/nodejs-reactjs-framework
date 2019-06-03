import {schema} from 'normalizr';

/*
http://stackoverflow.com/questions/41506533/how-to-define-schema-for-recursive-model-with-normalizr
    child = {
        id: 'childId',
        iid: 'childIid',
        duration: 'duration',
        children: [child]
    }
    node = {
        id : 'id',
        name: 'name',
        children: [
            child
        ]
    }


*/
const nestedNode = new schema.Entity('node', {}, {idAttribute: 'iid'});
const children = new schema.Array(nestedNode);
// let metadataRow = new schema.Entity('metadata', {}, {idAttribute:'iid'});
// let metadata = new schema.Array(metadataRow);
// nestedNode.define({metadata})

nestedNode.define({children});

export default {nestedNode};
// Define your node
// export const nodeSchema = new schema.Entity('node', { children }, {idAttribute: 'iid'});
