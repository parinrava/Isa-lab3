
//create server side code using http module

const http = require('http');
const url = require('url');
const {ServerUtils} = require('./modules/utils');
const greetingMessage = require('./lang/messages/en/en')

//create a server:

class Server{
    constructor(){
        this.serverUtils = new ServerUtils();

    }

    start(){
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);

    });
    
    const port = process.env.PORT || 3000; // Default to 3000 if process.env.PORT is not defined
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    
}

handleRequest(req,res){
    const  queryObject = url.parse(req.url, true).query;

    if (req.url.startsWith('/') && queryObject.name){
        const name = queryObject.name;
        const currentDateTime = this.serverUtils.getDate();
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<p style="color:blue;">${greetingMessage.hello} ${name}, ${greetingMessage.beautifulDay} ${currentDateTime}`);
        res.end(); //end the response
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Page not found</h1>');
        res.end();
    }
}

}

const app =  new Server();
app.start();