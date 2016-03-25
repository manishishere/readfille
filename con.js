
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('d.csv')
});


  
mongoose.connect('mongodb://127.0.0.1:27017/manish',function(err,res)
  {
  if(err)console.log(err);
  });
var userSchema = new Schema({
  DOI:String,
  Date_Ingested:String,
  Portico_Article_ID:String,
  Portico_Article_bibCitation:String,
  Triggered:String   
 });
var b=['a'];
var app = require('express')();
app.listen(3000);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var Sam = mongoose.model('sam', userSchema);
module.exports = Sam;
lineReader.on('line', function (line) {
 // console.log('Line from file:', line);
  temp=line.split("\t");
  //var a=String(temp[3]);
  console.log("----------------------------------");
  a=temp[3].toString();
  // for(i=0;i<a.length;i++)
  // {
  //   b[i]=a[i];
  // }
  b=b.concat(a);
  console.log(b);
  var obj={DOI:temp[0],Date_Ingested:temp[1],Portico_Article_ID:temp[2],Portico_Article_bibCitation:b,Triggered:temp[4]}
 // var s = new Sam({DOI:temp[0],Date_Ingested:temp[1],Portico_Article_ID:temp[2],Portico_Article_bibCitation:temp[3],Triggered:temp[4]});
   // console.log(obj);
   var s = new Sam(obj);
   s.save(function(err,result){
     if(err)console.log(err);
 //    console.log("--------********************");
   //  console.log(result);
   }); 
});
Sam.find({},function(err,result){
 // console.log(result);
})


app.get('/get', function (req, res) {
  
    Sam.find({},function(err,result)
    {
       res.send(result)

    });
});

app.post('/post', function (req, res) {
 var obj = req.body;
    
     var user = new User({name:obj.name,mobile:obj.mobile}) 
     user.save(function(err, data){   
       if (err) return res.send(err);
       res.send("done");

   });
   /* User.save({},function(err,result)
    {
        console.log("in post")
       res.send(err)

    });
   */
   console.log("end");
});



app.delete('/delete', function (req, res) {
  var name = req.param('name');
  var mobile = req.param('mobile');
    if(name)
    {

          var query = User.findOne({ "name": name });
       /* User.remove({"name":name},function(err, data){   
          if (err) return res.send(err);
          res.send("deletion done by name");

          }); */
          resl.send(query.mobile);
      }
      else if(mobile)
        {
               User.remove({"mobile":mobile},function(err, data){   
          if (err) return res.send(err);
          res.send("deletion done by mobile");
          });
        }
        else
        {
            res.send("enter value in parameters")
        }
});

  app.get('/nerds', function (req, res) {
        User.findById('56973a3377427894d3f0f599').exec(function (err, nerd) {
            console.log(nerd);
            res.json(nerd);
        });
    });


app.put('/put', function (req, res) {
        var name = req.param('name');
        var mobile = req.param('mobile');
       
           User.findOneAndUpdate({"name":name},{$set: {"name":name,"mobile":mobile} }, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send(doc);
});

         /*User.update({"name":name},{$set: {"name":name,"mobile":mobile} },function(err, data){   
          if (err) return res.send(err);
          res.send(data);
          }); */
    
});

