var app       =     require("express")();
var mysql     =     require("mysql");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
app.set("view engine", "ejs") ;

/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      debug             :   false
});

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query("CREATE DATABASE IF NOT EXISTS cricket", function (error, results) {
    // And done with the connection.
    console.log(results)
    connection.query("use cricket", function (error, results) {
    // And done with the connection.
    console.log(results)
    console.log("99999999")
    connection.query("CREATE TABLE IF NOT EXISTS cricket_info(id INT AUTO_INCREMENT PRIMARY KEY,name text,batting_status text, bowling_status text,batsman1 text,batsman2 text, bowlsman1 text,bowlsman2 text, total_run_bat int,total_over_bat float, total_wicket_bat int, total_run_bowl int,total_over_bowl float, total_wicket_bowl int, comment text,t_status TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", function (error, results) 
    {
    	// console.log(results);

    });
    connection.query("CREATE TABLE IF NOT EXISTS batting_info(cricket_id INT,batsman text ,run int, ball int, four_s int, six_s int)", function (error, results) 
    {
    	// console.log(results);
    	
    });
    connection.query("CREATE TABLE IF NOT EXISTS bowling_info(cricket_id INT,bowlsman text ,over float, run int, wide int)", function (error, results) 
    {
    	// console.log(results);
    	
    });

    connection.query("select * from cricket_info", function (error, results) 
    {
    	console.log(results.length);
    	if(results.length==0)
    	{
    		connection.query("insert into cricket_info values(1,'SL vs BAN','SL','BAN','A','B','C','D',45,1,10,0,0,0,null,now())", function (error, results) 
		    {
		    	console.log(results);
		    	
		    });
		    connection.query("insert into cricket_info values(2,'AFG vs ZIM','ZIM','AFG','ABC','BCV','CAS','DWS',60,2,12,0,0,0,null,now())", function (error, results) 
		    {
		    	console.log(results);
		    	
		    });
		    connection.query("insert into cricket_info values(3,'ENG vs AUS','ENG','AUS','QWE','ERT','TYU','IUY',100,5,4,0,0,0,null,now())", function (error, results) 
		    {
		    	console.log(results);
		    	
		    });
		    connection.query("insert into cricket_info values(4,'IND vs SA','SA','IND','ASD','DFG','BNM','NBM',150,6,5,0,0,0,null,now())", function (error, results) 
		    {
		    	console.log(results);
		    	
		    });
		    
		    connection.query("insert into cricket_info values(5,'NZ vs PAK','PAK','NZ','QWER','WERT','GHJK','KJHH',250,5,50,0,0,0,null,now())", function (error, results) 
		    {
		    	console.log(results);
		    });
            connection.query("insert into cricket_info values(6,'WI vs KENYA','WI','KENYA','HJK','JKL','LOP','IUYT',145,2,5,0,0,0,null,now())", function (error, results) 
            {
                console.log(results);
                
            });
    	}

    	
    });
    connection.query("select * from batting_info", function (error, results) 
    {
        console.log(results.length);
        if(results.length==0)
        {
            connection.query("insert into batting_info values(1,'A',5,2,0,0),(1,'B',14,8,1,0)", function (error, results) 
            {
                console.log(results);
                
            });
            connection.query("insert into batting_info values(2,'ABC',20,8,1,0),(2,'BCV',30,8,1,1)", function (error, results) 
            {
                console.log(results);
                
            });
            connection.query("insert into batting_info values(3,'QWE',50,10,2,4),(3,'ERT',10,2,0,0)", function (error, results) 
            {
                console.log(results);
                
            });
            connection.query("insert into batting_info values(4,'ASD',100,20,4,4),(4,'DFG',50,10,2,0)", function (error, results) 
            {
                console.log(results);
                
            });
            
            connection.query("insert into batting_info values(5,'QWERT',150,40,7,2),(5,'WERT',45,12,3,2)", function (error, results) 
            {
                console.log(results);
                
            });
            connection.query("insert into batting_info values(6,'HJK',14,8,1,0),(6,'JKL',14,8,1,0)", function (error, results) 
            {
                console.log(results);
                
            });
           

        }

        
    });
    
    // connection.release();

    // Handle error after the release.
    if (error) throw error;

});
    // Don't use the connection here, it has been returned to the pool.
  });
});
app.get("/",function(req,res)
{
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("use cricket",function(err,result)
        {
            if (err) throw err;
        });
        connection.query("select * from cricket_info",function(err,result)
        {
            if (err) throw err;
            res.render("widget",{data : result})
        })
    });
	
});
app.get("/push",function(req,res)
{
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("use cricket",function(err,result)
        {
            if (err) throw err;
        });
        connection.query("select * from cricket_info",function(err,result)
        {
            if (err) throw err;
            res.render("push_data",{data : result})
        })
    });
    
});
app.get("/detailed_info/:id" , function(req,res)
{
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("use cricket",function(err,result)
        {
            if (err) throw err;
        });
        connection.query("select * from batting_info where cricket_id="+req.params.id.toString(),function(err,result)
        {
            if (err) throw err;
            res.render("detailed_info",{data : result})
        })
    });
    
})
app.get("/ajax_data",function(req,res){
    id=req.query.id;
    country=req.query.country;
    console.log(id);
    console.log(country);
     pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("use cricket",function(err,result)
        {
            if (err) throw err;
        });
        var a="select * from cricket_info where id="+id.toString();
        console.log(a);
        connection.query(a,function(err,result)
        {
            if (err) throw err;
            if(result[0].batting_status==country)
                res.send({'run' : result[0].total_run_bat,'wicket' : result[0].total_wicket_bat,'over' : result[0].total_over_bat})
            else
                res.send({'run' : result[0].total_run_bowl,'wicket' : result[0].total_wicket_bowl,'over' : result[0].total_over_bowl})
        });
    });

})

io.on('connection',function(socket)
{  
    console.log("A user is connected");
    
    socket.on('update',function(id,comment,run,wicket,over,batting){
        console.log(id);
        console.log(comment);
        console.log(run);
        console.log(wicket);
        console.log(over);
      update_database(id,comment,run,wicket,over,batting,function(res){
        if(res){
             io.emit('refresh feed',id,comment,run,wicket,over,batting);
        } else {
            io.emit('error');
        }
      });
    });
});

var update_database = function (id,comment,run,wicket,over,batting,callback) {
    pool.getConnection(function(err,connection){
        if (err) {
          callback(false);
          return;
        }
        connection.query("use cricket",function(err,resu)
        {
            if (err) throw err;
        });
        var a="select * from cricket_info where id="+id.toString()
        console.log(a)
        connection.query(a,function(err,result)
        {
            console.log(result)
            console.log(result[0])
            if(batting==result[0].batting_status)
            {
                console.log("same")
                connection.query("update cricket_info set total_run_bat="+run+", total_wicket_bat="+wicket+",total_over_bat="+over+" where id="+id.toString(),function(err,res)
                {
                    if (err) {
                          callback(false);
                          return;
                        }
                        console.log("updated")
                        callback(res);
                });
            }
            else
            {
                console.log("different")
                total_run=result[0].total_run_bat;
                total_wicket=result[0].total_wicket_bat;
                total_over=result[0].total_over_bat;
                console.log(total_over)
                console.log(total_run)
                console.log(total_wicket)
               var b= "update cricket_info set total_run_bat=0, total_wicket_bat=0,total_over_bat=0,total_run_bowl="+total_run+",total_wicket_bowl="+total_wicket+",total_over_bowl="+total_over+",batting_status='"+batting+"',bowling_status='"+result[0].batting_status+"' where id="+id.toString()
                console.log(b);
                connection.query(b,function(err,res)
                {
                    if (err) {
                          callback(false);
                          return;
                        }
                        console.log("updated1");
                        callback(true);
                });
            }
            });
            connection.on('error', function(err) {
              callback(false);
              return;
        });
        })
    
    
    
}

http.listen(3001,function(){
    console.log("Listening on 3000");
});
