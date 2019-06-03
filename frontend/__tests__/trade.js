import { totalBalance } from 'common/trade';

// enzyme
describe('totalBalance', () => {
  it('should render correctly', () => {
    const exchangeRate = {
      BTC: {
        BTC: 1,
        ETH: 0.0000234,
        LTC: 0.12312312,
      },
      USD: {
        BTC: 16457,
        ETH: 1200,
        LTC: 235,
      },
    };

    const wallets = [
      {
        code: 'BTC',
        total: 1.2,
        onOrder: 0.5,
        address: '0x42afec540d1ec71de87cbb96c729842aaf543184',
      },
      {
        code: 'ETH',
        total: 16,
        onOrder: 0.1,
        address: '0x42afec540d1ec71de87cbb96c729842aaf543184',
      },
      {
        code: 'LTC',
        total: 9.999,
        onOrder: 0.0001,
        address: '0x42afec540d1ec71de87cbb96c729842aaf543184',
      },
    ];

    const balance = totalBalance(exchangeRate, wallets);
    console.log(balance);
    // expect(welcome.find('h1').text()).toEqual('Hello world');
  });
});
