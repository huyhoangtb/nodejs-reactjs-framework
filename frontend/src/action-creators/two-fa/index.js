export const twoFaActionTypes = {
  GENERATE_TWO_FA_SECRET: 'GENERATE_TWO_FA_SECRET',
  RECEIVED_TWO_FA_SECRET: 'RECEIVED_TWO_FA_SECRET',
  RECEIVED_QR_CODE: 'RECEIVED_QR_CODE',
  SAVE_TWO_FA_TO_SERVER: 'SAVE_TWO_FA_TO_SERVER',
  SAVE_TWO_FA_TO_SERVER_SUCCESS: 'SAVE_TWO_FA_TO_SERVER_SUCCESS',
  SET_2FA_STEP: 'SET_2FA_STEP'
};

export default {
  generateTwoFaSecret: () => ({
    type: twoFaActionTypes.GENERATE_TWO_FA_SECRET,
  }),
  receivedTwoFaSecret: (secretData) => ({
    type: twoFaActionTypes.RECEIVED_TWO_FA_SECRET,
    secretData
  }),
  receivedQrCode: (qaCode) => ({
    type: twoFaActionTypes.RECEIVED_QR_CODE,
    qaCode
  }),
  saveTwoFaToServer: (data, options) => ({
    type: twoFaActionTypes.SAVE_TWO_FA_TO_SERVER,
    data,
    options
  }),
  saveTwoFaToServerSuccess: (data) => ({
    type: twoFaActionTypes.SAVE_TWO_FA_TO_SERVER_SUCCESS,
    data
  }),
  setTwoFaStep: (stepNumber) => ({
    type: twoFaActionTypes.SET_2FA_STEP,
    stepNumber
  }),
};
