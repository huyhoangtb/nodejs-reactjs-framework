import {Service} from "typedi";

@Service("testService")
export default class TestService {
    public getContext(): string {
        return 'this is context';
    }
}
