import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

import { Amplify, API, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);
const apiName = 'awsfwe';

var what = 'signals';
var method = "GET";

let config = {};
// config.Auth =  {
//   identityPoolId: 'us-east-1:4b410607-2fed-403e-9e54-e4d4c350cac4',
//   region: 'us-east-1', // REQUIRED - Amazon Cognito Region
//   userPoolId: 'us-east-1_s6j5RBF4g', // OPTIONAL - Amazon Cognito User Pool ID
//   userPoolWebClientId: '2lcabvjemk9svk35d6s8h88u07' // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
// };
config.API = {
  endpoints: [
    {
      name: "awsfwe",
      endpoint: "https://54obj70jc8.execute-api.us-east-1.amazonaws.com/v1",
      custom_header: async () => {
//       return { Authorization : 'token' }
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
//       return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
     }
    }
  ]
};
Amplify.configure(config);

function MethodDropDown() {
  const [selectedOption, setSelectedOption] = useState('GET');

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    method = event.target.value;
  }

  return (
      <>
      <label htmlFor="dropdown"></label>
      <select id="method" value={selectedOption} onChange={handleOptionChange}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      </>
  );
};

function resetMenu() {
  document.getElementById('bsignals').style.backgroundColor = "lightgrey";
  document.getElementById('bmodels').style.backgroundColor = "lightgrey";
  document.getElementById('bdecoders').style.backgroundColor = "lightgrey";
  document.getElementById('bvehicles').style.backgroundColor = "lightgrey";
  document.getElementById('bfleets').style.backgroundColor = "lightgrey";
  document.getElementById('bcampaigns').style.backgroundColor = "lightgrey";
  document.getElementById('EntityID').value = "";
}

function getFleets() {
  resetMenu();
  what = 'fleets';
  document.getElementById('b' + what).style.backgroundColor = "lightblue";
  getSomething();
}

function getVehicles() {
  resetMenu();
  what = 'vehicles';
  document.getElementById('b' + what).style.backgroundColor = "lightblue";
  getSomething();
}

function getSignals() {
  resetMenu();
  what = 'signals';
  document.getElementById('b' + what).style.backgroundColor = "lightblue";
  getSomething();
}

function getModels() {
  resetMenu();
  what = 'models';
  document.getElementById('b' + what).style.backgroundColor = "lightblue";
  getSomething();
}

function getDecoders() {
  resetMenu();
  what = 'models/decoders';
  document.getElementById('bdecoders').style.backgroundColor = "lightblue";
  getSomething();
}

function getCampaigns() {
  resetMenu();
  what = 'campaigns';
  document.getElementById('b' + what).style.backgroundColor = "lightblue";
  getSomething();
}

async function getSomething() {
  console.log('token: ' + (await Auth.currentSession())
  .getIdToken()
  .getJwtToken());
  let path = '/' + what;
  const entityID = document.getElementById('EntityID').value;
  console.log("entity id: " + entityID);

  if(entityID !== undefined && entityID.length > 0) {
    console.log("got entity id, checking what: " + what);
    if (["fleets", "vehicles", "models/decoders", "campaigns"].includes(what)) {
      console.log("adding entity id to path: ");
      path = path + "/" + entityID;
    }
  }
  console.log("path: " + path);
  let element = document.getElementById('APIResponse');
  API.get(apiName, path).then((result) => {
      console.log('result: ', JSON.stringify(result, null, 2));
      element.textContent = JSON.stringify(result, null, 2);
    })
    .catch((error) => {
      console.log('error: ', error.response);
      element.textContent = JSON.stringify(error.response, null, 2);
    });
}

function postSomething() {
  // post only supported for
  if (!["fleets", "campaigns"].includes(what)) {
    return;
  }

  let path = '/' + what;
  const entityID = document.getElementById('EntityID').value;
  const body = JSON.parse(document.getElementById('body').value);

  if(entityID !== undefined && entityID.length > 0) {
    path = path + "/" + entityID;
  }
  console.log("path: " + path);
  const req = {
    body: body
  }
  console.log("body: " + JSON.stringify(body));

  let element = document.getElementById('APIResponse');
  API.post(apiName, path, req).then((result) => {
      console.log('result: ', JSON.stringify(result, null, 2));
      element.textContent = JSON.stringify(result, null, 2);
    })
    .catch((error) => {
      console.log('error: ', error.response);
      element.textContent = JSON.stringify(error.response, null, 2);
    });
}

function putSomething() {
  // put only supported for
  if (!["fleets", "campaigns"].includes(what)) {
    return;
  }

  let path = '/' + what;
  const entityID = document.getElementById('EntityID').value;
  const body = JSON.parse(document.getElementById('body').value);

  if(entityID !== undefined && entityID.length > 0) {
    path = path + "/" + entityID;
  }
  console.log("path: " + path);
  const req = {
    body: body
  }
  console.log("body: " + JSON.stringify(body));

  let element = document.getElementById('APIResponse');
  API.put(apiName, path, req).then((result) => {
      console.log('result: ', JSON.stringify(result, null, 2));
      element.textContent = JSON.stringify(result, null, 2);
    })
    .catch((error) => {
      console.log('error: ', error.response);
      element.textContent = JSON.stringify(error.response, null, 2);
    });
}

function deleteSomething() {
  // delete only supported for
  if (!["fleets", "campaigns"].includes(what)) {
    return;
  }

  let path = '/' + what;
  const entityID = document.getElementById('EntityID').value;
  const body = JSON.parse(document.getElementById('body').value);

  if(entityID !== undefined && entityID.length > 0) {
    path = path + "/" + entityID;
  }
  console.log("path: " + path);
  const req = {
    body: body
  }
  console.log("body: " + JSON.stringify(body));

  let element = document.getElementById('APIResponse');
  API.del(apiName, path, req).then((result) => {
      console.log('result: ', JSON.stringify(result, null, 2));
      element.textContent = JSON.stringify(result, null, 2);
    })
    .catch((error) => {
      console.log('error: ', error.response);
      element.textContent = JSON.stringify(error.response, null, 2);
    });
};

function go() {

  switch(method) {
    case "GET" : getSomething(); break;
    case "POST" : postSomething(); break
    case "PUT" : putSomething(); break
    case "DELETE" : deleteSomething(); break
  }
}

function App({ signOut, user }) {
  return (
    <div className="App">
      <header >
        <h4>Hello {user.username} <button onClick={signOut}>Sign out</button></h4>
      </header>
      <div className="Menu">
        <button id="bsignals" onClick={getSignals}>Signals</button>
        <button id="bmodels" onClick={getModels}>Models</button>
        <button id="bdecoders" onClick={getDecoders}>Decoders</button>
        <button id="bvehicles" onClick={getVehicles}>Vehicles</button>
        <button id="bfleets" onClick={getFleets}>Fleets</button>
        <button id="bcampaigns" onClick={getCampaigns}>Campaigns</button>
      </div>
      <div className="Menu">
        <p>
          <input type="text" size="38" id="EntityID" defaultValue=""/>
          <MethodDropDown />
          <button id="bok" onClick={go}>Go!</button>
        </p><p>
          <textarea id="body" rows="14" cols="50"></textarea>
        </p>
      </div>
        <pre align="left" id="APIResponse">API response shows up here</pre>
      </div>
  );
}

export default withAuthenticator(App);
