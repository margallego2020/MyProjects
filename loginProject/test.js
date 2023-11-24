const bcryptjs = require('bcryptjs');

let hash = bcryptjs.hashSync("martin", 10);

console.log(bcryptjs.compareSync("martin", hash));