const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  p_data = req.body
  console.log(p_data)
  if (p_data.age<=0){
    res.status(404).send('Age is invalid.');
  }
  firstname = p_data.firstName
  lastname = p_data.lastName
  set=new Set()

  firstname = firstname.toLowerCase()
  lastname = lastname.toLowerCase()
  for (const c of firstname+lastname) {
    //console.log(c)
    set.add(c)
  }
  console.log(set)
  array = Array.from(set)
  k = array.length%parseInt(p_data.age)
  array = arrayRotate(array,k)
  console.log(array)

  const jsonData= require('./data.json')
  analysis_data = []
  if(array.length>6){
    array = array.slice(0,6)
  }
  for(x of array){
    analysis_data.push(jsonData[x])
  }
  console.log(analysis_data)
  res.send(renderAnalysis(analysis_data));
});

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

function renderAnalysis(analysis_data){
  var render = "<html><title>Name Analysis</title> <head></head><body><ul>" 
  for(x of analysis_data){
    render = render + "<li>" + x+"</li>"
  }
  
  render = render + "</ul></body></html>"
  return render
}

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });