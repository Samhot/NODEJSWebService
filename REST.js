var mysql   = require("mysql");

function REST_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

REST_ROUTER.prototype.handleRoutes = function(router) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/test",function(req,res){
        res.json("Salut");
    });


}

module.exports = REST_ROUTER;
