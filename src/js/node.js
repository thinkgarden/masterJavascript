var url = require('url');
var qs = require('querystring');
var path = require("path") ;
var queryUrl = "http://localhost:8888/bb?name=bigbear&memo=helloworld";
console.log(typeof url.parse(queryUrl)) ;
// console.log(url.parse(queryUrl)) ;
//
var root = path.basename(queryUrl) ;

 var http = require("http");
 var fs = require('fs');
 var url = require('url');
 var path = require("path") ;
http.createServer(function(request，response) {
  var method = request.method ;
  method = method.toLowerCase() ;
  var fileName = path.basename(request.url) ;
  var extName = path.extname(fileName) ;
  var root = "./" ;
  if("get" == method){
    if(extName){
      fs.readFile("./" + fileName，"utf-8"，function (error，data){
       if(error)throw error ;
       response.writeHead(200，{
        "Content-Type": { ".css": "text/css" ， ".js" : "application/javascript" }[extName] }) ;
       response.write(data) ; response.end() ;
     });
    } else{
      fs.readFile(root + "index.html"，"utf-8"，function (error，data){
        if(error)throw error ;
        response.writeHead(200，{ "Content-Type" : "text/html" });
        response.write(data) ;
        response.end() ;
      });
    }
  } else if("post" == request.url){
  // handle post here } }).listen(8888) ; console.log("Web Server Running ， Port On ---> 8888")
  }
