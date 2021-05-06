const cassandra = require('cassandra-driver');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// doc: https://docs.datastax.com/en/developer/nodejs-driver/4.1/getting-started/

const client = new cassandra.Client({ 
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
  });
  
  client.connect(function (err) {
    console.error(err);
  });
  

app.get('/', (req, res) => {
    console.log("call")
    res.send("Hola mundo! :D")
})


app.get('/inst', (req, res) => {
    const query = "SELECT * FROM proyecto201602916.institucionesbancarias"
    client.execute(query, function (err, result) {
      //console.log(result.rows)
       
      res.send(result.rows)     
    });
})


app.get('/inst2', (req, res) => {
  const query = "SELECT institucionbancaria FROM proyecto201602916.institucionesbancarias"
  client.execute(query, function (err, result) {
    //console.log(result.rows)
     
    res.send(result.rows)     
  });
})




app.get('/users', (req, res) => {
    const query = "SELECT * FROM proyecto201602916.cuentahabientes;"
    client.execute(query, function (err, result) {
      //console.log(result.rows)
       
      res.send(result.rows)     
    });
})


app.get('/user', (req, res) => {
  let user = req.query.cui+""
  const query = "SELECT * FROM proyecto201602916.cuentahabientes where cui = ?; "
  client.execute(query, [user], function (err, result) {
    //console.log(result.rows)
     
    res.send(result.rows)     
  });
})

app.get('/getCuis', (req, res) => {
  let user = req.query.cui+""
  const query = "SELECT DISTINCT CUI FROM proyecto201602916.cuentahabientes; "
  client.execute(query, function (err, result) {
    //console.log(result.rows)
     
    res.send(result.rows)     
  });
})


app.get('/operaciones', (req, res) => {
    
    let user = req.query.cui+""
    const query = "SELECT * FROM proyecto201602916.operacionesCuentahabiente where cui = ?;";
    client.execute(query, [user],function (err, result) {
      //console.log(result.rows)
      res.send(result.rows)     
    });
})


app.post('/debfecha', (req, res) => {
  console.log(req.body)
  let user = req.body.cui+""
  let date1 = req.body.date1
  let date2 = req.body.date2
  const query = "SELECT * FROM proyecto201602916.operacionesCuentahabiente where cui = ? AND fechaTransferencia>= ? AND fechaTransferencia< ?;";
  const query2 = "SELECT * FROM proyecto201602916.creditosCuentahabiente where cui2 = ? AND fechaTransferencia>= ? AND fechaTransferencia< ?;";
  client.execute(query, [user,new Date(date1),new Date(date2)],function (err, result) {
    //console.log(result.rows)
    if(err){
      console.log(err)
      res.send([])
    }else{
      client.execute(query2, [user,new Date(date1),new Date(date2)],function (err2, result2) {
        if(err2){
          console.log(err2)
          res.send([])
        }
    res.send({cred:result.rows,deb:result2.rows})     
    
  });
}
})
})

app.post('/credfecha', (req, res) => {
    
  let user = req.body.cui+""
  const query = "SELECT * FROM proyecto201602916.operacionesCuentahabiente where cui = ?;";
  client.execute(query, [user],function (err, result) {
    //console.log(result.rows)
    res.send(result.rows)     
  });
})

app.get('/creditoInst', (req, res) => {
    
  let user = req.query.cui+""
  const query = "select SUM(montotransferencia) as deb from proyecto201602916.creditosinstituciones where institucionBancaria = ?;";
  const query2 = "select SUM(montotransferencia) as cred from proyecto201602916.debitosinstituciones where institucionBancaria2 = ?;";
  client.execute(query, [user],function (err, result) {
    if(err){console.log(err); res.send("error")}
    client.execute(query2, [user], function(err2,result2){
      console.log(result.rows[0].deb);
      console.log(result2.rows[0].cred);

      res.send({debitos:result.rows[0].deb,creditos: result2.rows[0].cred})
    })     
  });
})


app.get('/debitoInst', (req, res) => {
    
  let user = req.query.cui+""
  const query = "select SUM(montotransferencia) from debitosintituciones where institucionBancaria2 = ?;";
  client.execute(query, [user],function (err, result) {
    res.send(result.rows)     
  });
})

app.post('/insTrans', (req, res) => {
    
  var {cui, cui2, nombre, nombre2, apellido, apellido2, email, email2, fecharegistro, fecharegistro2, genero, genero2, institucionbancaria, institucionbancaria2, tipocuenta, tipocuenta2, saldoinicial, saldoinicial2, abreviacionbancaria, abreviacionbancaria2, valor} = req.body.values
  const querys = [
    {
      query: 'INSERT INTO proyecto201602916.operacionesCuentahabiente (nombre, apellido, cui, email, fecharegistro, genero, institucionbancaria, tipocuenta, saldoinicial, nombre2, apellido2, institucionbancaria2, tipocuenta2, montotransferencia, fechatransferencia) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,dateof(now()))',
      params: [nombre,apellido, cui+"", email, fecharegistro, genero, institucionbancaria,tipocuenta, saldoinicial, nombre2, apellido2, institucionbancaria2,tipocuenta2, valor]
    },
    {
      query: 'INSERT INTO proyecto201602916.creditosCuentahabiente (nombre, apellido, cui, email, fecharegistro, genero, institucionbancaria, tipocuenta, saldoinicial, nombre2, apellido2,cui2, institucionbancaria2, tipocuenta2, montotransferencia, fechatransferencia) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,dateof(now()))',
      params: [nombre,apellido, cui+"", email, fecharegistro, genero, institucionbancaria,tipocuenta, saldoinicial, nombre2, apellido2,cui2, institucionbancaria2,tipocuenta2, valor]
    },
    {
      query: 'INSERT INTO proyecto201602916.debitosinstituciones (institucionBancaria, abreviacionInstitucion, institucionBancaria2, abreviacionInstitucion2, montoTransferencia, fechaTransferencia) VALUES (?,?,?,?,?,dateof(now()))',
      params: [institucionbancaria, abreviacionbancaria,institucionbancaria2, abreviacionbancaria2 , valor]
    },
    {
      query: 'INSERT INTO proyecto201602916.creditosinstituciones (institucionBancaria, abreviacionInstitucion, institucionBancaria2, abreviacionInstitucion2, montoTransferencia, fechaTransferencia) VALUES (?,?,?,?,?,dateof(now()))',
      params: [institucionbancaria, abreviacionbancaria,institucionbancaria2, abreviacionbancaria2 , valor]
    },
    {
      query: 'INSERT INTO proyecto201602916.cuentaHabientes (nombre, apellido, cui, email, fecharegistro, genero, institucionbancaria,abreviacionInstitucion, tipocuenta, saldoinicial) VALUES (?,?,?,?,?,?,?,?,?,?)',
      params: [nombre,apellido, cui+"", email, fecharegistro, genero, institucionbancaria, abreviacionbancaria,tipocuenta, (saldoinicial) - valor]
    },
    {
      query: 'INSERT INTO proyecto201602916.cuentaHabientes (nombre, apellido, cui, email, fecharegistro, genero, institucionbancaria,abreviacionInstitucion, tipocuenta, saldoinicial) VALUES (?,?,?,?,?,?,?,?,?,?)',
      params: [nombre2,apellido2, cui2+"", email2, fecharegistro2, genero2, institucionbancaria2, abreviacionbancaria2,tipocuenta2, (saldoinicial2) + valor]
    }

  ]
  client.batch(querys, { prepare: true })
      .then(function() {
           res.json({mensaje : 1});
      })
      .catch(function(err) {
            console.log(err);
             res.json({mensaje : 0});
      }); 
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


