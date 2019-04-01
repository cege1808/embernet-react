var moment = require('moment');
var {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore({
    projectId: 'embernet-api',
    keyFilename: './embernet-api-fb182c1905b3.json'
});


_createEnvironmentalDataObjectForStorage = (message, log) => {

    let obj = {
        node_id: message.data.attributes.node_id,
        temperature: message.data.attributes.temperature,
        pressure: message.data.attributes.pressure,
        humidity: message.data.attributes.humidity,
        eco2: message.data.attributes.eco2,
        tvoc: message.data.attributes.tvoc,
        created_at: message.data.attributes.created_at
    }
    return obj;
};

storeEnvironmentalData = async (message) => {
  console.log('storeenvdata start');
  let key = datastore.key('EnvironmentalData');
  await datastore
        .save({
            key: key,
            data: _createEnvironmentalDataObjectForStorage(message)
        })
        .then(() => {
            console.log('Environmental Data stored in Datastore!\r\n')
        })
        .catch(err => {
            console.log('There was an error storing the env data:', err);
        });
};


async function listNodes() {
  const query = datastore.createQuery('Node').order('node_id');

  const [tasks] = await datastore.runQuery(query);
  console.log('Nodes:');
  tasks.forEach(task => {
    const taskKey = task[datastore.KEY];
    console.log(taskKey.id, task.position, task);
  });
}

async function listEnvironmentalData(node_id) {
  const query = datastore.createQuery('EnvironmentalData').order('created_at');

  const [tasks] = await datastore.runQuery(query);
  console.log('EnvironmentalData:');
  tasks.forEach(task => {
    const taskKey = task[datastore.KEY];
    console.log(taskKey.id, task.node_id, task);
  });
}

sleep = (milliseconds) => {
  var start = new Date().getTime();
  for (var i = 0; i < 1e8; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

randominRange = (min, max) => {
  return Math.round(((Math.random() * (max - min + 1)) + min)*100)/100;
}

listNodes();
listEnvironmentalData();

// let amount = 100;
// let interval = setInterval(()=>{
//   let info = {
//   data: {
//       attributes: {
//         node_id: 1,
//         temperature: randominRange(8,12) ,
//         pressure: randominRange(1000,1100),
//         humidity: randominRange(30,35),
//         eco2: 0,
//         tvoc: 400,
//         created_at: moment().toISOString()
//       }
//     }
//   }
//   console.log(info);
//   amount--;
//   if(amount == 0){
//     clearInterval(interval);
//   }
//   storeEnvironmentalData(info);
// }, 60*1000)

// var message1 = {
//   data: {
//       attributes: {
//         node_id: 1,
//         temperature: randominRange(8,12) ,
//         pressure: randominRange(1000,1100),
//         humidity: randominRange(30,35),
//         eco2: 0,
//         tvoc: 400,
//         created_at: moment().toISOString()
//       }
//     }
//   }
// storeEnvironmentalData(message1);
