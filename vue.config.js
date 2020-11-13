const { gitDescribeSync } = require("git-describe");

console.log(gitDescribeSync());
module.exports = {};
