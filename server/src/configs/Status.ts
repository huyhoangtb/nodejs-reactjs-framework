export default class Status {
    static ACTIVE = 1;
    static INACTIVE = 0;
    static CANCEL = -1;

    static DEFAULT = {
        ACTIVE: {
            value: Status.ACTIVE,
            label: 'Active'
        },
        INACTIVE: {
            value: Status.INACTIVE,
            label: 'Inactive'
        },
        CANCEL: {
            value: Status.CANCEL,
            label: 'Cancel'
        },
    }


}
