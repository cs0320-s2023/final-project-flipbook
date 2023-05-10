
import axios from 'axios';

export default function Save(props) {


  /**

    Generates a random 8-digit string used as a PID (Process ID) to identify data.
    @returns {string} Randomly generated PID string.
  */
  function generateRandomPID() {
    const digits = '0123456789';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomString += digits[randomIndex];
    }
    return randomString;
  }

  /**

    Sends data to the server for storage.
    @async
    @returns {Promise<void>} Promise that resolves once the data is saved.
  */
  async function saveData(){
    let urlpid;
    if(!props.urlpid) {
      urlpid = generateRandomPID();
    }
    else {
      urlpid = props.urlpid;
    }
    let url = 'http://localhost:3001/data?pid='+urlpid;
     
    console.log(url);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the appropriate content type for your API
      },
      body: JSON.stringify(props) // Convert the data object to a JSON string
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(responseData => {
        // Process the response data
        console.log(responseData);
        if(responseData.message=="Data saved successfully") {
          window.location.search += '?pid='+urlpid;
        }else {
          alert("Error saving data");
        }
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }

  /**

    Retrieves data from the server using the provided PID.
    @async
    @param {string} pid - The Process ID (PID) used to identify the data.
    @returns {Promise<Object>} Promise that resolves with the retrieved data object.
  */
  async function getData(pid) {
    const url = `http://localhost:3001/data?pid=${pid}`; // Replace with your API endpoint URL
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' // Set the appropriate content type for your API
      }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
    
  return (<>
    <button onClick={saveData}>Save</button>
    <button onClick={()=>getData(props.urlpid)}>Get</button>
    </>
  );
}