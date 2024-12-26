let agent;


function toggleChatView() {
  const messageListContainer = document.getElementById("chat-container-message");
  const messageList = document.getElementById("chat-container");
  const emptyBox = document.getElementById("predefinedmessages");

  if (messageList.children.length === 0) {
    messageListContainer.style.display = "none";
      emptyBox.style.display = "block";
  } else {
    messageListContainer.style.display = "block";
      emptyBox.style.display = "none";
  }
  if(messageListContainer){
    
  }
}

async function onPageLoad() {
  // Get the current URL
  const currentUrl = window.location.href;

  // Get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const paramsObject = Object.fromEntries(queryParams.entries());

  // Get the page name
  const pageName = window.location.pathname.split('/').pop();

  // Logging the results
  console.log("URL:", currentUrl);
  console.log("Query Parameters:", paramsObject);
  console.log("Page Name:", pageName);
  return{
    "url":currentUrl,
    "parameters":paramsObject,
    "pageName":pageName
  };
  // Example: Use the parameters or page name in your logic
  //document.querySelector('h1').textContent += ` - ${pageName}`;
}

// Attach the function to the window load event
window.onload = onPageLoad;

//redirect user to homepage
function homepageRedirect(url){
  window.location.href = url;
}

const firebaseConfig = {
  apiKey: "AIzaSyC2IDcJJsoZyA3I2kKmsceTRA8Gsos68-I",
  authDomain: "multiagent-8bb01.firebaseapp.com",
  projectId: "multiagent-8bb01",
  storageBucket: "multiagent-8bb01.firebasestorage.app",
  messagingSenderId: "774442657949",
  appId: "1:774442657949:web:f2c286b91c30e13bcd0c74",
  measurementId: "G-JH6HNVVBG1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the already initialized app
}
const auth = firebase.auth();
const db = firebase.firestore();
const itemsCollection = db.collection("agent2");
const provider = new firebase.auth.GoogleAuthProvider();




let page_url=""
let urlParameters={}
let current_page=""

function gettheBaseURL(fullURL) {
  const url = new URL(fullURL);
  console.log(`${url.protocol}//${url.hostname}`) // Create a URL object
  return `${url.protocol}//${url.hostname}`; // Combine protocol and hostname
}
// Function to create and append rows to the table
async function populateTable() {

  const pageloaded=await onPageLoad();
  page_url=(pageloaded.url)
  urlParameters=(pageloaded.parameters)
  current_page=(pageloaded.pageName)

  if (current_page=="playground"||current_page=="playground.html"){
    let agentString=localStorage.getItem("agentdata")
    console.log("ksris",agentString)
    agent=JSON.parse(agentString)
    let agentiDText=document.querySelector("#agent_id")
    agentiDText.innerHTML=agent.agentId
    console.log(agent)
    toggleChatView()
  }

  if(current_page=="dashboard"||current_page=="agents"||current_page=="dashboard.html"){
  const tableBody = document.querySelector("#tbodyagents");
  tableBody.innerHTML = "";
  }
  // Get the table's tbody element
  let Selector
  if(current_page=="dashboard"){
    Selector="navigateDiv"
  }

  if(current_page=="agents"){
    Selector="agent_page"
  }
  if(current_page=="analytics"){
    Selector="analytic_page"
  }
  if(current_page=="settings"){
    Selector="settings_page"
  }
 console.log(Selector)
  if(Selector!=null&&Selector!=undefined){
  changeBackgroundColor(Selector,"#161616")
  }

  let theUser=localStorage.getItem("siteUserName")
  let theKey=localStorage.getItem("theToken")
  let theUniqueId=localStorage.getItem("uniqueId")
  console.log("dashboard",theUser,theKey,theUniqueId)
  let TheNameDisplay=document.querySelector("#thesiteusername")
  if(TheNameDisplay){
  setInputValueById("thesiteusername",theUser)
  }
  let baseUrl=await gettheBaseURL(page_url)
  let thepagesLoggedIn=current_page=="dashboard"||current_page=="agents"||current_page=="analytics"||current_page=="settings"
  keyNull=theKey==null||theKey==undefined
  if(keyNull&&thepagesLoggedIn){
    homepageRedirect(`${baseUrl}/login`)
  }
 
}
// Run the function when the page loads
window.onload = () => populateTable();


function logOutUser(){
  localStorage.clear();
  console.log("user logged out")
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


//Navigate to aother page on click
function navigateOnClick(selector, targetUrl) {
  console.log(selector)
  if(selector!=null&&selector!=undefined){
  // Select the element using the provided selector
  const element = document.querySelector(`#${selector}`);

  // Check if the element exists
  if (element) {
   
    window.location.href = targetUrl; // Navigate to the target URL
     
}}}


//set background-color
function changeBackgroundColor(selector, color) {
  // Select the element using the provided selector
  const element = document.querySelector(`#${selector}`);

  // Check if the element exists
  if (element) {
      element.style.backgroundColor = color; // Change the background color
  } else {
      console.error(`No element found with selector: ${selector}`);
  }
}

//change textValue
function setInputValueById(id, value) {
  const element = document.getElementById(id);
  console.log("karis",value,element.innerHTML)
  
    element.innerHTML = value;
 
}

function checkCookie() {
  let user = getCookie("theagentnaviagatemove");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("theagentnaviagatemove", user, 365);
    }
  }
}

// Function to show an element
function showElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "flex"; // Makes the element visible
  }
}

// Function to hide an element
function hideElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none"; // Hides the element
  }
}

//the click events
document.addEventListener("DOMContentLoaded", async() => {
    // Select the login button
    const signUpButton = document.querySelector("#signup-button");
    const logInButton = document.querySelector("#login-button");
    const ResetButton = document.querySelector("#Reset-button");
    const idMain=getCookie("agentmultiagentwebide")
    const idTokenMain=getCookie("agentmultiagentwebtky")
    console.log(idMain,idTokenMain);
    const buttonDiv=document.querySelector(".div-block-4");
    const logOutButton=document.querySelector(".logoutbutton");
    const serviceButton=document.querySelector("#service_navigate");
    const agentButton=document.querySelector("#agents_navigate");
    const agentCreateButton=document.querySelector("#createagent");
    let theUser2=localStorage.getItem("siteUserName")
    let theKey2=localStorage.getItem("theToken")
    let theUniqueId2=localStorage.getItem("uniqueId")
    let linkedinButton=document.querySelector("#linkedinoauth");
    let loginGoogleButton=document.querySelector("#loginGoogleButton");
    let calendarButton=document.querySelector("#calendaroauth");
    let uberButton=document.querySelector("#uberoauth");
    let uber_eatsButton=document.querySelector("#uber-eatsoauth");
    let googleformsButton=document.querySelector("#google-formsoauth");
    let xoauthButton=document.querySelector("#Xoauth");
    let buttonSendMessage=document.querySelector("#send-message");
    let micButton=document.querySelector("#mic-message");

    if(linkedinButton){
      document.querySelector("#linkedinoauth").addEventListener("click", async (event) =>{
      window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=863iuogbciqxja&redirect_uri=http://127.0.0.1:3000/playground.html?debug_mode=true&state=foobar&scope=w_member_social,openid,profile,email"
      })
    }
    
    if(calendarButton){
      document.querySelector("#calendaroauth").addEventListener("click", async (event) =>{
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=142417176441-2f2g7mqv6fg7sd8avi9agqvt2comleg2.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/playground.html&response_type=code&scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.addons.execute&access_type=offline"
      })
    }

    if(xoauthButton){
      document.querySelector("#Xoauth").addEventListener("click", async (event) =>{
      window.location.href = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TVQyTzFpLUF0dGttU1pyaVVFZ2s6MTpjaQ&redirect_uri=http://127.0.0.1:3000/playground.html&scope=tweet.read%20users.read%20offline.access%20tweet.write%20follows.read%20follows.write&state=x&code_challenge=x56fdfdfgh&code_challenge_method=plain"
      })
    }

    if(loginGoogleButton){
      document.querySelector("#loginGoogleButton").addEventListener("click", async (event) =>{
      try {
        const result = await auth.signInWithPopup(provider);
        // The signed-in user info
        const user = result.user;
        console.log('User signed in:', user);
        console.log(user.email);
        cdn_getUserByEmail(user.email,user,user.displayName)
      } catch (error) {
        console.error('Error during Google Sign-In:', error.message);
        showElementById("warningDialog")
        setInputValueById("error-message",error.message)
      }
    })}
    console.log(agentCreateButton)

    if(agentCreateButton){

      agentCreateButton.addEventListener("click", (event) => {
      let descriptionInput=document.querySelector("textarea[id='agent-description']").value;
      let nameInput=document.querySelector("input[id='agent-name-input']").value;
      let typeInput=document.querySelector("select[id='agent-type-select']").value;
      let agentuuid = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
      console.log("tyyyytyyytyt",descriptionInput,nameInput,agentuuid)
        event.preventDefault();
        let cdnData={
          uuid: agentuuid,
          agentname: nameInput,
          status: "active",
          agentid:agentuuid,
          creator: theUniqueId2,
          accessToken:theKey2,
          description:descriptionInput,
          createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
        }
        cdn_createAgent("agents",cdnData);
        //cdn_listenForSnapshots()
       //createItems(thedatacreate)
       document.getElementById("agentcreatemodal").style.display = "none";
      })
      }


    if(buttonSendMessage){
      let agentString=localStorage.getItem("agentdata")
      agent=JSON.parse(agentString)
      let agentiDText=document.querySelector("#agent_id")
      let theAgentId=agent.agentId

    buttonSendMessage.addEventListener("click", async(event) => {
    
    let messageSent=document.querySelector("input[id='sendmessageinput']").value;
    
    let messageId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
    //console.log("tyyyytyyytyt",descriptionInput,nameInput,agentuuid)
      event.preventDefault();
      let cdnData={
        uuid: messageId,
        message: messageSent,
        agent:theAgentId,
        agent_type:"sent",
        creator: theUniqueId2,
        accessToken:theKey2,
        createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
      }
      sendQuery(messageSent)
      /*cdn_createAgent("messages",cdnData);
      //cdn_listenForSnapshots()
     //createItems(thedatacreate)
     let aiResponse=await Ask_ai(messageSent)
     let cdnData2={
      uuid: messageId,
      message: aiResponse.response,
      agent:theAgentId,
      agent_type:"received",
      creator: theUniqueId2,
      accessToken:theKey2,
      createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
    }
     cdn_createAgent("messages",cdnData2);*/
    })
    }

    /*{
      uuid: "12123323232",
      agent: "weewwreer",
      message: "Hello",
      creator: "weererdfdfdf",
      accessToken:
        "b'nPlXI7SskuiwerdSpOyNNazHr8agg1TrApy2yqRDAaI='+/AbCdk==/kk+-cj0==////=/b'gAAAAABnWry4JiWIQuXDRsZ9OIj_qa0JoYEIoMEnn4VczILhnJOddHvbTp6RsZpjP78Wa7krt3QgoKcpGUF-W_a9kgu9s97HWw=='",
    }*/

    if (logOutButton){
      document.querySelector(".logoutbutton").addEventListener("click", (event) =>{
        logOutUser()
        homepageRedirect("/authorizeapps")
      })}

    if (serviceButton){
      serviceButton.addEventListener("click", (event) =>{
        homepageRedirect("/authorizeapps.html")
      })}

      if (agentButton){
        agentButton.addEventListener("click", (event) =>{
          homepageRedirect("/agents")
        })}

    console.log("logout")
    if (buttonDiv){
    document.querySelectorAll(".div-block-4").forEach(div => {
      div.addEventListener("click", (event) => {
          console.log(`Button ID: ${event.target.classList}`); // Log the ID of the clicked button
          let url="https://multiagentbase-pro-93abd0.webflow.io/"
          let page=""
          let clicked
          if(event.target.classList.contains("navigatediv")){
           page="dashboard"
           clicked=event.target.id
          }
          if(event.target.classList.contains("agent_page")){
            page="agents"
            clicked=event.target.id
           }
           if(event.target.classList.contains("analytic_page")){
            page="analytics"
            clicked=event.target.id
           }
           if(event.target.classList.contains("settings_page")){
            page="settings"
            clicked=event.target.id
           }
           navigateOnClick(clicked,`${url}${page}`)
      });
  });
}
    //console.log(signUpButton.id,logInButton.id,ResetButton.id)

    // Add click event listener to the login button
    if(signUpButton!=null&&signUpButton!=undefined){
    signUpButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        // Get the values of email and password fields
        const fullName = document.querySelector("input[id='Full-Name-Signup']").value;
        const email = document.querySelector("input[id='Email-Signup']").value;
        const password = document.querySelector("input[id='Password-Signup']").value;
        const ConfirmPassword = document.querySelector("input[id='Confirm-Password-Signup']").value;
        console.log(ConfirmPassword)

        // Log the values to the console (you can replace this with your login logic)
        console.log("Email:", email);
        console.log("Password:", password);

        // Simulate login action
        let allFields=email && password&&fullName&&ConfirmPassword
        let confirmPasswordval=password==ConfirmPassword
        if (!allFields&&confirmPasswordval) {
          
          //action(email,password);
          showElementById("warningDialog")
          setInputValueById("error-message","All the fields should not be empty")
          
        } 
        
        if (!allFields&&!confirmPasswordval) {
          
          //action(email,password);
          showElementById("warningDialog")
          setInputValueById("error-message","All the fields should not be empty")
          
        } 

        if (allFields&&!confirmPasswordval) {
          showElementById("warningDialog")
          setInputValueById("error-message","Confirm password is not the same as the password") 
        } 

        if (allFields&&confirmPasswordval) {
          
          //action(email,password);
          cdn_signUp(email,password,fullName)
          //action(email,password,fullName);
          showElementById("loader")
          
        } 
    })};

  if(logInButton!=null&&logInButton!=undefined){
    // Add click event listener to the login button
  logInButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

  // Get the values of email and password fields
  const email = document.querySelector("input[id='Email-Signup']").value;
  const password = document.querySelector("input[id='Password-Signup']").value;

  // Log the values to the console (you can replace this with your login logic)
  console.log("Email:", email);
  console.log("Password:", password);

  // Simulate login action
  if (email && password) {
    console.log("testPage")
    //action(email,password);
    //signInUser(email,password);
    cdn_signIn(email,password);
    showElementById("loader")
    
  } else {
    showElementById("warningDialog")
    setInputValueById("error-message","Please fill all the fields")
  }
})};

if(ResetButton!=null&&ResetButton!=undefined){
  // Add click event listener to the login button
  ResetButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting

// Get the values of email and password fields
const email = document.querySelector("input[id='Email-Reset']").value;

// Log the values to the console (you can replace this with your login logic)
console.log("Email:", email);

// Simulate login action
if (email) {
  console.log("testPage")
  //action(email,password);
  ResetPassword(email);
  
} else {
    alert("Please fill in both fields.");
}
})};
});





 // Convert makeRequest to async function
async function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP Error: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });
}

// Usage with async/await
async function useMakeRequest(email,password,name) {
  try {
    const response = await makeRequest("http://127.0.0.1:8000/signup", "POST", {
      "email": email,
      "password": password,
      "name": name,
      "accessToken": "emptyYes",
      "isOnline": true,
      "dateOfBirth": "12-12-12"
    });
    //console.log(response); // Process the response as needed
    return response; // Return the response if needed for further handling
  } catch (error) {
    //console.error("Error:", error); // Handle the error
    throw error; // Rethrow the error if you want to propagate it
  }
}


//call signup action
async function action(email,password,fullname){
  
  result=await useMakeRequest(email, password,fullname)
  jsonResult=JSON.parse(result);
  console.log(jsonResult);
  if (jsonResult.status==="200 ok"){
    console.log("200 Ok")
      hideElementById("loader")
      console.log(jsonResult)
      uniqueId=jsonResult.data.fields.uuid.stringValue
      siteUserName=jsonResult.data.fields.name.stringValue
      theToken=jsonResult.data.fields.refreshToken.stringValue
      console.log(uniqueId,siteUserName,theToken)
      localStorage.setItem("siteUserName", siteUserName);
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("theToken", theToken);
      setCookie("agentmultiagentwebtky",theToken,3)
      setCookie("agentmultiagentwebide",uniqueId,3)
      window.location.href = "/dashboard.html";
}
else{
  error=jsonResult.data.message;
  console.log(error);
  console.log(jsonResult);
  hideElementById("loader")
  showElementById("warningDialog")
  setInputValueById("error-message",error)
}
}

  // Wrap XMLHttpRequest in a Promise to use with async/await
  function sendRequest(data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/signupanonymous", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.withCredentials = false;
  
      // When request is complete
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText); // resolve on success
          } else {
            reject(`Error: ${xhr.status} - ${xhr.statusText}`); // reject on error
          }
        }
      };
  
      // Send the data
      xhr.send(data);
    });
  }


async function CreateUserAnonymous(email){
  const data = JSON.stringify({
    "email": "anonymous34@gmail.com",
    "password": "12345",
    "name": "anonymous",
    "accessToken": "emptyYes",
    "isOnline": true,
    "dateOfBirth": "12-12-12"
  });
  try {
    myDATA = await sendRequest(data);
    DataJson=JSON.parse(myDATA);
    console.log(DataJson.fields);
    setCookie("agentmultiagentwebtky",DataJson.fields.refreshToken.stringValue,3)
    setCookie("agentmultiagentwebide",DataJson.fields.uuid.stringValue,3) // Await the response from sendRequest
    return(myDATA); // Output the response
  } catch (error) {
    return("Request failed:", error); // Handle errors
  }
}

// Prepare the data for the request

// Function to send the request
function sendRequest(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = false;

    // Handle state changes
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText); // Resolve on success
        } else {
          reject(`Error: ${xhr.status} - ${xhr.statusText}`); // Reject on error
        }
      }
    };

    // Send the request with the data
    xhr.send(data);
  });
}

// Function to use async/await
async function signInUser(email,password) {
  const data = JSON.stringify({
    "email": email,
    "password": password
  });
  try {
    const response = await sendRequest(data);// Await the promise from sendRequest
    let JsonResponse=JSON.parse(response)
    let status=JsonResponse.status
    console.log(status)
    if(status=="200 ok")
    {
      let accessToken=JsonResponse.data.idToken
      singleUser("users","email",email,accessToken)
      hideElementById("loader")
    }
    else{
      let errorMessage=JsonResponse.data.message
      console.log(errorMessage);
      console.log(JsonResponse);
      hideElementById("loader")
  
      showElementById("warningDialog")
      setInputValueById("error-message",errorMessage)
    }
    //setCookie("agentmultiagentwebide",JsonResponse.fields.uuid.stringValue,3)
    console.log(JsonResponse); // Log the response on success
  } catch (error) {
    console.error("Request failed:", error); // Log errors
  }
}


async function getUser(table,query,value,token) {
  var data = JSON.stringify({
    "tablename": table,
    "queryfield": query,
    "queryvalue": value,
    "refreshToken": token
  });

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.status}: ${this.statusText}`));
        }
      }
    });

    xhr.open("POST", "http://127.0.0.1:8000/getsingleuserdata");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });
}

async function singleUser(table,query,value,token){
  try {
    const response = await getUser(table,query,value,token);
    let JsonResponse=JSON.parse(response)
    console.log("test",JsonResponse);
    let theToken=JsonResponse.data[0].document.fields.refreshToken.stringValue
    let uniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    siteUserName=JsonResponse.data[0].document.fields.name.stringValue
    siteUniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    theSiteKey=JsonResponse.data[0].document.fields.refreshToken.stringValue

    localStorage.setItem("siteUserName", siteUserName);
    localStorage.setItem("uniqueId", uniqueId);
    localStorage.setItem("theToken", theToken);
    setCookie("agentmultiagentwebtky",theToken,3)
    setCookie("agentmultiagentwebide",uniqueId,3)
    console.log("200 Ok")
    window.location.href = `/dashboard.html`;
    
  } catch (error) {
    console.log(error);
  }
}

async function ResetPassword (email) {
  const data = JSON.stringify({
    userEmail: email
  });

  const url = "http://127.0.0.1:8000/resetpassword";

  const xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Network error occurred"));
      };

      xhr.send(data);
    });
  };

  try {
    const response = await xhrRequest();
    console.log(response);
  } catch (error) {
    console.error("Error during the request:", error);
  }
};


async function createItems(thedata){
  const data = JSON.stringify(thedata);

  try {
    const response = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "http://127.0.0.1:8000/createitems");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText); // Resolve with the response text
        } else {
          reject(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Network Error"));
      };

      xhr.ontimeout = function () {
        reject(new Error("Request Timed Out"));
      };

      xhr.send(data); // Send the JSON data
    });

    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

console.log("page is loaded")



// Signup Function cdn
async function cdn_signUp(email,password,name) {
 
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      let user=userCredential.user;
      let userSaved=saveUserToFirestore(user,name)
      firebasepersist()

      if(userSaved.status="200 ok"){
      alert("Sign up successful!");
      localStorage.setItem("siteUserName", name);
      localStorage.setItem("uniqueId", user.uid);
      localStorage.setItem("theToken", user.uid);
      setCookie("agentmultiagentwebtky",user.uid,3)
      setCookie("agentmultiagentwebide",user.uid,3)
      //cdn_listenForSnapshots()
      homepageRedirect("/dashboard")
      return("User signed up:", userCredential.user);
      }
      listenForSnapshots(); // Start Firestore listener after signup
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      showElementById("warningDialog")
      setInputValueById("error-message",error.message)
    });
}

// Sign In Function
function cdn_signIn(email,password) {

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
      firebasepersist()
      user=userCredential.user
      cdn_getUserByEmail(user.email)
      
      setCookie("agentmultiagentwebtky",user.uid,3)
      setCookie("agentmultiagentwebide",user.uid,3)
      cdn_listenForSnapshots()
      console.log("200 Ok")
      
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      hideElementById("loader")
      showElementById("warningDialog")
      setInputValueById("error-message",error.message)
    });
}

// Firestore Snapshot Listener
function cdn_listenForSnapshots() {
  const user = auth.currentUser;

  if (user) {
    const itemsCollection = db.collection("agents"); // Replace with your collection name

    itemsCollection.onSnapshot((snapshot) => {

      const tableBody = document.querySelector("#tbodyagents");
      if(current_page=="dashboard"||current_page=="agents"||current_page=="dashboard.html"){
      tableBody.innerHTML="";
      }
      //const output = document.getElementById("snapshot-output");
      //output.textContent = ""; // Clear previous data

      snapshot.forEach((doc) => {
        if(current_page=="dashboard"||current_page=="agents"||current_page=="dashboard.html"){
        toggleTable("agent-table-main","agent-table-empty","tbodyagents")
        console.log("Snapshot data:", doc.data());
        }
        console.log("Document ID:", doc.id)
        dateMillisecond=doc.data().createdAt.seconds
        theDate=new Date(dateMillisecond*1000);
        const month = theDate.getMonth() + 1; // Months are zero-based
        const day = theDate.getDate();
        const year = theDate.getFullYear() % 100;
        const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year.toString().padStart(2, "0")}`;
        let status=doc.data().status.charAt(0).toUpperCase() +doc.data().status.slice(1)
        let name
        let statusUse="recently used"
        let theUniqueId3=localStorage.getItem("uniqueId")
        if(doc.data().agentname==""){
          name="AgentNew"
        }
        else{
          name=doc.data().agentname
        }
        console.log(formattedDate,status,name);
        data={
          docId:doc.id,
          status:doc.data().status,
          date:formattedDate,
          name:name,
          agentId:doc.data().uuid
        }
        if(doc.data().creator==theUniqueId3){
        createAgent(data,formattedDate,status,name,statusUse)
        }
        //output.textContent += `${JSON.stringify(doc.data())}\n`;
      });
    }, (error) => {
      console.error("Error in snapshot listener:", error.message);
    });
  } else {
    console.error("No authenticated user for snapshot listener.");
    //alert("Please sign in to receive snapshots.");
  }
}

async function saveUserToFirestore(user,name="") {
  const userRef = db.collection("users").doc(user.uid);

  // Set user data in Firestore (you can add additional fields as needed)
  try {
  userRef.set({
    uuid:user.uid,
    name:name,
    linkedinToken:"",
    uber_Token:"",
    calendar_Token:"",
    openTable_Token:"",
    x_Token:"",
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Add timestamp
    lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
  })
  console.log("User data saved to Firestore!");

    // Fetch and return the saved document
    const doc = await userRef.get();
    if (doc.exists) {
      console.log(doc.data);
      return {status:"200 ok",response:doc.data()}; // Return the created item
    } else {
      hideElementById("loader")
      showElementById("warningDialog")
      setInputValueById("error-message","An error occurred, Please try again")
    }
  } catch (error) {
    console.error("Error saving user to Firestore:", error.message);
    hideElementById("loader")
    showElementById("warningDialog")
    setInputValueById("error-message",error.message) // Rethrow the error for the caller to handle
  }

}

async function cdn_getUserByEmail(email,user={},name) {
  
  // Query the 'users' collection where the 'email' field matches the input
  try {
    const querySnapshot = await db.collection("users").where("email", "==", email).get();

    if (querySnapshot.empty) {
      console.log("empty", email);

      const savedData = await saveUserToFirestore(user, name);
      console.log(savedData);

      if (savedData.status === "200 ok") {
        // Uncomment the following lines if needed
        
        localStorage.setItem("siteUserName", savedData.response.name);
        localStorage.setItem("uniqueId", savedData.response.uuid);
        localStorage.setItem("theToken", savedData.response.uuid);
        setCookie("agentmultiagentwebtky", savedData.response.uuid, 3);
        setCookie("agentmultiagentwebide", savedData.response.uuid, 3);
        window.location.href = `/dashboard`;
        
      } else {
        showElementById("warningDialog")
        setInputValueById("error-message","An error occurred. Please try again")
      }
      return; // Exit the function if no matching user is found
    }

    // Iterate over matching documents and display user data
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log("User Data:", userData);

      localStorage.setItem("siteUserName", userData.name);
      localStorage.setItem("uniqueId", user.uuid);
      localStorage.setItem("theToken", user.uuid);
      window.location.href = `/dashboard`;
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    showElementById("warningDialog")
    setInputValueById("error-message",error.message)
  }
}

function cdn_createAgent(table,data) {
  
  // Add a new document to 'agents' collection
  db.collection(table).add(data)
  .then((docRef) => {
    console.log("Agent created with ID:", docRef.id); 
  })
  .catch((error) => {
    console.error("Error creating agent:", error.message);
  });
}

function firebasepersist(){
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("Persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    cdn_listenForSnapshots()
    const chatBody = document.querySelector("#chat-container");
    if(current_page=="playground"||current_page=="playground.html"){
      
      chatBody.innerHTML="";
      }
    cdn_listenForSnapshots_messages("yes")
    
  } else {
    console.log("No user is signed in.");
    alert("Please sign in to access your data");
  }
});


function createAgent(data,date,status,name,statustouse){
  if(current_page=="dashboard"||current_page=="agents"||current_page=="dashboard.html"){
  console.log("new item created")
    const tableBody = document.querySelector("#tbodyagents");
    let theUser=localStorage.getItem("siteUserName")
    let theKey=localStorage.getItem("theToken")
    let theUniqueId=localStorage.getItem("uniqueId")
    console.log("dashboard",theUser,theKey,theUniqueId)
    setInputValueById("thesiteusername",theUser)
    // Clear existing rows (if any)
    
    console.log(data)
    
        let item=data
        // Create a new table row
        const row = document.createElement("tr");
  
        // Checkbox cell
        const checkboxCell = document.createElement("td");
        checkboxCell.classList.add("checkbox-cell");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false;
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);
  
        // Task name cell
        const taskNameCell = document.createElement("td");
        taskNameCell.classList.add("task-name-cell");
        const taskNameDiv = document.createElement("div");
        taskNameDiv.classList.add("task-name");
        const taskTitle = document.createElement("span");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = name;
        const statusText = document.createElement("span");
        statusText.classList.add("status-text");
        statusText.textContent = statustouse;
        taskNameDiv.appendChild(taskTitle);
        taskNameDiv.appendChild(statusText);
        taskNameCell.appendChild(taskNameDiv);
  
        // Store object data in the dataset
        taskNameCell.dataset.details = JSON.stringify(item);
         
        // Add a click event to display the object data
        checkboxCell.addEventListener("click", () => {
          event.stopPropagation(); // Prevent row click
          const details = JSON.parse(taskNameCell.dataset.details);
          console.log("Details:", "details");
      });
  
        // Add a click event to display the object data
        row.addEventListener("click", () => {
            const details = JSON.parse(taskNameCell.dataset.details);
            console.log("Details:", details);
            let agent_data=JSON.stringify(details);
            localStorage.setItem('agentdata', agent_data);
            window.location.href = '/playground';
        });
  
   
        row.appendChild(taskNameCell);
  
        // Status cell
        const statusCell = document.createElement("td");
        statusCell.classList.add("status-cell");
        const statusBox = document.createElement("div");
        statusBox.classList.add("status-box", `status-${item.status}`);
        const statusIcon = document.createElement("span");
        statusIcon.classList.add("status-icon");
        statusBox.appendChild(statusIcon);
        statusBox.append(" " + status);
        statusCell.appendChild(statusBox);
        row.appendChild(statusCell);
  
        // Date cell
        const dateCell = document.createElement("td");
        dateCell.classList.add("date-cell");
        dateCell.textContent = date;
        row.appendChild(dateCell);
  
        // Delete cell
        const deleteCell = document.createElement("td");
        deleteCell.classList.add("delete-cell");
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = "&#128465;"; // Trash can emoji
        deleteIcon.addEventListener("click", () => {
          event.stopPropagation();
          const details = JSON.parse(taskNameCell.dataset.details);
            console.log("Details:", details);
            row.remove(); // Delete the row on click
        });
        deleteCell.appendChild(deleteIcon);
        row.appendChild(deleteCell);
  
        // Append the row to the table body
        tableBody.appendChild(row);
    
  }
}


//Deleting item in firestore database
async function deleteDocument(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    console.log(`Document with ID '${docId}' deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

//update an item in firestore
async function updateDocument(collectionName, docId, updateData) {
  try {
    await db.collection(collectionName).doc(docId).update(updateData);
    console.log(`Document with ID '${docId}' updated successfully.`);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

//toggle and hide elements by ids
function toggleTable(tableId,emptyId,tableBodyId) {
  console.log(tableId,emptyId,tableBodyId)
  const table = document.getElementById(tableId);
  const noDataMessage = document.getElementById(emptyId);
  const tableBody = document.getElementById(tableBodyId);

  // Check if table body has rows
  const hasData = tableBody.children.length > 0;

  if (hasData) {
    console.log("hasdata")
    table.style.display = "block";
    noDataMessage.style.display = "none";
  } else {
    console.log("hasnodata")
    table.style.display = "none";
    noDataMessage.style.display = "flex";
  }
}

function addMessage(text, type = "sent", timestamp = new Date()) {
  const messageList = document.getElementById("chat-container");

  // Create message container
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  // Create message bubble
  const bubbleDiv = document.createElement("div");
  bubbleDiv.classList.add("bubble", type);
  bubbleDiv.textContent = text;

  // Create timestamp
  const timestampDiv = document.createElement("div");
  timestampDiv.classList.add("timestamp");
  timestampDiv.textContent = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Append bubble and timestamp to message
  messageDiv.appendChild(bubbleDiv);
  //messageDiv.appendChild(timestampDiv);

  // Add message to the message list
  messageList.append(messageDiv);

  messageList.scrollTop = messageList.scrollHeight;
  // Toggle visibility of chat and empty box
  toggleChatView();
}

function cdn_listenForSnapshots_messages(isFirst="no") {
  const user = auth.currentUser;
   
  //const output = document.getElementById("snapshot-output");
  //output.textContent = ""; // Clear previous data
 
  const messageList = document.getElementById("chat-container");
  
  let first
  if (messageList.children.length === 0) {
    first="yes"
  } else {
   first="no"
  }
   let messagesObj=[]
  if (user) {
    /*let lastItemQuery;
    let itemsCollection
    if(first=="yes"){
      itemsCollection = db.collection("messages").orderBy("createdAt", "desc");
      lastItemQuery = itemsCollection
    }
    else{*/
    const itemsCollection = db.collection("messages"); // Replace with your collection name
    const lastItemQuery = itemsCollection.orderBy("createdAt", "desc").limit(1);
    //}
    lastItemQuery.onSnapshot((snapshot) => {
      if(current_page=="playground"||current_page=="playground.html"){
        toggleChatView()
        }
      let agentString=localStorage.getItem("agentdata")
      agent=JSON.parse(agentString)
      let theAgentId=agent.agentId
      
      
      snapshot.forEach((doc) => {
        let newMessageObj={
          id:doc.id
        }
        let moveNext=false
        if(!messagesObj.includes(newMessageObj)){
          moveNext=true
          messagesObj.push(newMessageObj)
        }

        if(current_page=="playground"||current_page=="playground.html"){
        console.log("Snapshot data:", doc);
        }
        console.log("Document ID:", doc.id)

        if(doc.data().createdAt!=null||doc.data().createdAt!=undefined){
        dateMillisecond=doc.data().createdAt.seconds
        }
        else{
          dateMillisecond=Math.floor(Date.now() / 1000);
        }

        let message=doc.data().message
        let type=doc.data().type
        let timeNotEmpty=doc.data().createdAt!=null||doc.data().createdAt!=undefined

        if(doc.data().agent==theAgentId&&timeNotEmpty&&moveNext==true){
          console.log("themosty",theAgentId)
          addMessage(message, type = doc.data().agent_type, timestamp = new Date(dateMillisecond*1000))
          // Scroll to the bottom of the container
          const container = document.querySelector('#chat-container-message');

          // Scroll to the bottom of the container
          container.scrollTop = container.scrollHeight;
        }
        //output.textContent += `${JSON.stringify(doc.data())}\n`;
      });
    }, (error) => {
      console.error("Error in snapshot listener:", error.message);
    });
  } else {
    console.error("No authenticated user for snapshot listener.");
    //alert("Please sign in to receive snapshots.");
  }
}


async function Ask_ai(quiz){
  const data = JSON.stringify({
    query: quiz
  });

  const xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.open("POST", "http://127.0.0.1:8000");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText); // Resolve with the response text
        } else {
          reject(new Error(`HTTP error! Status: ${xhr.status}`)); // Reject on error
        }
      };

      xhr.onerror = () => reject(new Error("Network error")); // Reject on network error

      xhr.send(data);
    });
  };

  try {
    const response = await xhrRequest(); // Wait for the XMLHttpRequest to complete
    return{"status":"200 ok","response":response}
  } catch (error) {
    return{"status":"200 ok","response":error}
  }
};


//websocket test

const websocket = new WebSocket("ws://localhost:8000/ws");
         let agentString=localStorage.getItem("agentdata")
         agent=JSON.parse(agentString)
         let agentiDText=document.querySelector("#agent_id")
         let theAgentId=agent.agentId
         let messageId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
         let theKey2=localStorage.getItem("theToken")
         let theUniqueId2=localStorage.getItem("uniqueId")
         
         
        websocket.onmessage = function(event) {
            //const data = JSON.parse(event.data);
            //const updatesDiv = document.getElementById("updates");
            console.log(event)
            //data=JSON.parse(event.data)
            if (event.startsWith("Message received: ")) {
              event = response.replace("Message received: ", "");
          }
            
              let cdnData2={
                uuid: messageId,
                message: `${event}`,
                agent:theAgentId,
                agent_type:"received",
                creator: theUniqueId2,
                accessToken:theKey2,
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
              }
              cdn_createAgent("messages",cdnData2);
                //const action = document.createElement("p");
                //action.textContent = `Action: ${data.tool}, Input: ${data.tool_input}`;
                console.log(`${event}`)
            }


        function sendQuery(quiz) {
          let agentString=localStorage.getItem("agentdata")
          agent=JSON.parse(agentString)
          let agentiDText=document.querySelector("#agent_id")
          let theAgentId=agent.agentId
          let messageId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
          let theKey2=localStorage.getItem("theToken")
          let theUniqueId2=localStorage.getItem("uniqueId")
          let cdnData={
            uuid: messageId,
            message: quiz,
            agent:theAgentId,
            agent_type:"sent",
            creator: theUniqueId2,
            accessToken:theKey2,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
          }
          cdn_createAgent("messages",cdnData);
          createWebSocket(quiz)
            
        }
      

async function createWebSocket(quiz) {

        let agentString=localStorage.getItem("agentdata")
         agent=JSON.parse(agentString)
         let agentiDText=document.querySelector("#agent_id")
         let theAgentId=agent.agentId
         let messageId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
         let theKey2=localStorage.getItem("theToken")
         let theUniqueId2=localStorage.getItem("uniqueId")
    // Create a new WebSocket connection
    socket = new WebSocket("ws://localhost:8000/ws");
    
    socket.onopen = function() {

      
      if(quiz!=null||quiz!=null){
        console.log("WebSocket connection established.");
        socket.send(quiz);
      }
    };

    socket.onmessage = function(event) {
        //console.log("Message received:", event.data);
        //const data = JSON.parse(event.data);
        //const updatesDiv = document.getElementById("updates");
        console.log(event.data)
        //data=JSON.parse(event.data)
        
            
              let cdnData2={
                uuid: messageId,
                message: `${event.data}`,
                agent:theAgentId,
                agent_type:"received",
                creator: theUniqueId2,
                accessToken:theKey2,
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
              }
              cdn_createAgent("messages",cdnData2);
                //const action = document.createElement("p");
                //action.textContent = `Action: ${data.tool}, Input: ${data.tool_input}`;
                console.log(`${event}`)
        
        // Handle incoming message (parse JSON, etc.)
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };}