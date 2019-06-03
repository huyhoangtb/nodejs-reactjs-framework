import * as bcrypt from "bcrypt";

export const PASSWORD_SALT_OR_ROUND = 10;

export const hashPassword = async (password: string) => {
    return await bcrypt.hashSync(password, PASSWORD_SALT_OR_ROUND);
};

export const isCorrectPassword = async (password: string, hashString: string) => {
    return await bcrypt.compare(password, hashString);
};
