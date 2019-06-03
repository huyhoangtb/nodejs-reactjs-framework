import * as mongoose from "mongoose";

export default class Utils {
    static async doAttachDataToDocument(document: any = undefined, attachedNodesString?: string) {
      const data = await Utils.doAttachDataToDocuments([document], attachedNodesString);
      if(!data || data.length === 0) {
          return null;
      }

      return data[0];
    }

    static async doAttachDataToDocuments(documents: any = [], attachedNodesString?: string) {
        const attachedConditions = Utils.getAttachedConditions(documents, attachedNodesString);
        if (attachedConditions === null) {
            return documents;
        }
        const fields = Object.keys(attachedConditions);
        const result: any = {};
        let haveAttactedDocument = false;
        for (let i = 0; i < fields.length; i++) {
            let field: string = fields[i];

            let attachedCondition: any = attachedConditions[field];
            if (!attachedCondition.data || attachedCondition.data.length === 0) {
                continue;
            }
            const model = mongoose.model(attachedCondition.node);
            let attachedObjects = await model.find({[attachedCondition.field]: {$in: attachedCondition.data}});
            if (attachedObjects.length === 0) {
                continue;
            }
            haveAttactedDocument = true;
            const newAttachedFieldName = attachedCondition.name ? attachedCondition.name : `${attachedCondition.node}Of${field}`;
            for (let j = 0; j < documents.length; j++) {
                let document: any = {...documents[j], password: undefined};
                const key = document.iid || document.id;

                if (!document[field]) {
                    result[key] = document;
                    // result.push(document);
                    continue
                }
                const documentFieldValues: any = document[field];

                let attd = null;
                if (Array.isArray(documentFieldValues)) {
                    document[newAttachedFieldName] = [];
                    documentFieldValues.map(value => {
                        attd = this.getDocumentByProperty(attachedObjects, attachedCondition.field, value);
                        if (attd) {
                            document[newAttachedFieldName].push(attd)
                        }

                    });
                    // result.push(document);
                    result[key] = document;
                } else {
                    document[newAttachedFieldName] = this.getDocumentByProperty(attachedObjects, attachedCondition.field, documentFieldValues);
                }

                // result.push(document);
                result[key] = document;
            }
        }
        if (haveAttactedDocument) {
            return Object.keys(result).map(function(key) {
                return result[key];
            });
        }
        return documents;
    }

    /**
     * Find document by the attached data that send from client
     * The structure of attachedData is:
     * {
     *     field: {node: 'node name', field: 'field of node'}
     * }
     * @param documents
     * @param attachedNodesString
     * @return { orgIid: { node: 'organization', data: [ 1 ], field: 'iid' }
     */
    static getAttachedConditions(documents: any[] = [], attachedNodesString?: string) {
        if (!attachedNodesString) {
            return null;
        }
        const attachedNodes = JSON.parse(attachedNodesString);
        const fields = Object.keys(attachedNodes);
        if (fields.length === 0) {
            return null;
        }
        const result: any = {}
        fields.map((field: string) => {
            result[field] = {
                node: attachedNodes[field].node,
                data: [],
                name: attachedNodes[field].name,
                field: attachedNodes[field].field
            };
            documents.map((document: any) => {
                const documentFields: any = document[field];

                if (!documentFields) {
                    return;
                }
                if (Array.isArray(documentFields)) {
                    result[field].data = result[field].data.concat(documentFields).unique();

                    return;
                }
                if (!result[field].data.includes(documentFields)) {
                    result[field].data.push(document[field]);
                }
            })
        });
        //{ orgIid: { node: 'organization', data: [ 1 ], field: 'iid' },
        return result;
    }

    /**
     *
     * @param documents
     * @param field
     * @param value
     */
    static getDocumentByProperty(documents: any[], field: string, value: any) {
        for (let i = 0; i < documents.length; i++) {
            if (documents[i][field] === value) {
                return documents[i];
            }
        }

    }
}
