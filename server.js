
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
    
    server.listen(3000, ()  => {
        console.log('Server is running on port 3000');
    });
}

handleRequest(req,res){
    const  queryObject = url.parse(req.url, true).query;

    if (req.url.startWith('/') && queryObject.name){
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