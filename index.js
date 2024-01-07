const server = require("./server.js");

const PORT = process.env.PORT || 3030;
server.listen(3030, () => console.log(`listening at http://localhost:${PORT}`));