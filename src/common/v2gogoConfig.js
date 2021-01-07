let v2config = {}
console.log(process.env.VUE_APP_ENV,'process.env.VUE_APP_ENV');
if (process.env.VUE_APP_ENV == 'development' ) {
  v2config = {
    apiPrefix: '',
    imgPrefix: 'http://test-images.v2gogo.com/',
    v2shopPagePrefix: 'https://mtshop.v2gogo.com/#',
    v2shopApiPrefix: 'https://mtshop.v2gogo.com',
    videoPrefix: 'http://test-images.v2gogo.com/',
    accessTokenDeadline: 6600,
    liveIdOfTwoChannel: '5f99d0ad0c5a4fecaad9c6f8dba602ca',
    goldCoinUrl: 'https://test-api.v2gogo.com/goldcoin/index.html#/',
    staticPrefix: ''
  }
}
if (process.env.VUE_APP_ENV == 'test'){
  v2config = {
    //  test,
    apiPrefix: 'https://test-api.v2gogo.com',
    imgPrefix: 'http://test-images.v2gogo.com/',
    v2shopPagePrefix: 'https://mtshop.v2gogo.com/#',
    v2shopApiPrefix: 'https://mtshop.v2gogo.com',
    videoPrefix: 'http://test-images.v2gogo.com/',
    accessTokenDeadline: 6600,
    liveIdOfTwoChannel: '5f99d0ad0c5a4fecaad9c6f8dba602ca',
    goldCoinUrl: 'https://test-api.v2gogo.com/goldcoin/index.html#/',
    staticPrefix: '/winter-tourism'
  }
}
if (process.env.VUE_APP_ENV == 'production') {
  v2config = {
    // production: environment,
    apiPrefix: 'https://app.v2gogo.com',
    imgPrefix: 'https://images.v2gogo.com/',
    // apiPrefix: 'https://test-api.v2gogo.com',
    // imgPrefix: 'http://test-images.v2gogo.com/',
    v2shopPagePrefix: 'https://mshop.v2gogo.com/#',
    v2shopApiPrefix: 'https://mshop.v2gogo.com',
    videoPrefix: 'http://video.v2gogo.com/',
    accessTokenDeadline: 6600,
    liveIdOfTwoChannel: 'd43bd55d731949e2bc1ebad65de1ba4a',
    goldCoinUrl: 'https://app.v2gogo.com/v2gogo/pages/goldcoin/index.html#/',
    staticPrefix: '/winter-tourism',
  }
}


// #enfif
module.exports = v2config;