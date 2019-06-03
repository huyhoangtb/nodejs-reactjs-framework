import * as fs from 'fs';

class ConfigsReader {
    static SYSTEM_CONFIG: any = null;

    static getConfig(fileName: string) {
        return fs.readFileSync(fileName);
    }

    static readConfig() {
        if (ConfigsReader.SYSTEM_CONFIG === null) {
            ConfigsReader.SYSTEM_CONFIG = ConfigsReader.getConfig('configs.json');
        }

        return JSON.parse(ConfigsReader.SYSTEM_CONFIG);
    }
}

export default ConfigsReader;