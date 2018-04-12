const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        '> 1%',
        'last 3 versions',
        'iOS > 6',
        'not ie < 10'
      ]
    })
  ]
};
