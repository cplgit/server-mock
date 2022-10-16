const http = require("http"); //创建服务器
const fs = require("fs"); //读取文件
const url = require("url"); //获取url

http.createServer((req, res) => {
    let pathObj = url.parse(req.url, true);

    switch (pathObj.pathname) {
      case "/getWeather":
        if (pathObj.query.city === "beijing") {
          res.end(
            JSON.stringify({
              city: "beijing",
              weather: "sunny",
            })
          );
        } else
          res.end(
            JSON.stringify({ city: pathObj.query.city, weather: "unknown" })
          );
        break;
      default:
        try {
          let pathname = pathObj.pathname === "/" ? "/index.html" : pathObj.pathname;
          res.end(fs.readFileSync(__dirname + pathname));
        } catch (e) {
          res.writeHead(404, "Not Found");
          res.end("<h1>404 Not Found<h1>");
        }
    }
  }).listen(8080);
