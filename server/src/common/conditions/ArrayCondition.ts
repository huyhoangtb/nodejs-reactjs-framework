export class ArrayCondition {
    private condition: object[] = [];

    constructor(arr: object[] = []) {
        this.condition = arr;
    }

    add(data: any) {
        if(!data) {
            return this;
        }
        this.condition.push({data});
        return this;
    }

    addByObject(object: any = {}, field: string) {
        if(!object[field]) {
            return this;
        }
        this.condition.push({[field]: object[field]});
        return this;
    }

    toArray() {
        return this.condition;
    }
}