
import axios from 'axios';

export default function Save(props) {

  async function saveData(){
    const url = 'http://localhost:3001/data?pid=12345678'; // Replace with your API endpoint URL

    // const data = {
    //   key1: 'value1',
    //   key2: 'value2'
    // }; 
    console.log(props)
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
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }

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


  // async function saveData() {
  //   const data = "hello my name ben"
  //   try {
  //     const response = await axios.post('http://localhost:3001/data', data);
  //     console.log(response.data); 
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };
  
    
  return (<>
    <button onClick={saveData}>Save</button>
    <button onClick={()=>getData('12345678')}>Get</button>
    </>
  );
}