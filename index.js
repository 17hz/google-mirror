const fs = require("fs");
const http = require("http");
const URL = require("url");
const request = require("request")

const port = 8090
function requestInstance(url,ua){
    return request({
        url,
        headers:{"User-Agent":ua}
    })
}
const Server = http.createServer((req,res) => {
    let url = URL.parse(req.url,true)
    if(url.pathname === "/") {
        fs.createReadStream("./home.html").pipe(res)
    }
    else if(url.pathname === "/bg"){
        req.pipe(requestInstance(`https://bing.ioliu.cn/v1?${url.search}`, req.headers['user-agent'])).pipe(res);
    }
    else{
        req.pipe(requestInstance(`https://www.google.com/${url.path}`, req.headers['user-agent'])).pipe(res);
    }
})


Server.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})