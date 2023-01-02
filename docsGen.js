const fs = require("fs");

const endPoints = fs.readdirSync("./server/routes");
for (let end of endPoints) {
    try {
        const file = fs.readFileSync(`./server/routes/${end}`, "utf8");
        const endpoint = /const path = "(.*?)" as const;/gm.exec(file)[1];
        const params = /const Input = Record\(({.*?})\);/gs.exec(file)[1];
        const getOrPost = /app.(get|post)/gs.exec(file)[1];

        console.log(`### \`${getOrPost.toUpperCase()} ${endpoint}\``);
        console.log("#### Params");
        console.log("```");
        console.log(params);
        console.log("```");
        console.log("");
    } catch (ex) {}
}
