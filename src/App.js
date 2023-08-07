import React, { useState, useEffect } from 'react'; // Import React and the necessary hooks
import './App.css';
function App() {
  const [username, setUsername] = useState("brijesh");
  const [data, setData] = useState({});

  const searchUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      const responseData = await response.json();
      setData(responseData.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    searchUser();
  } , [username]); // Empty dependency array to run the effect once on initial render

  return (
    <div className='page'>
    <center><h2>Search the Github Users with the user name</h2></center>
      <input className='input_field' type="text" placeholder='Search the user' name='user' value={username} onChange={(e)=>setUsername(e.target.value)}/>
     
      <div className='users'>
      {
        
        Array.isArray(data)&&data.map((elem ,index) => (
          <div className='user_box'>
           {/* <p>username : - {elem.login}</p> */}
           <img src={elem.avatar_url} width={80} height={80} alt='profile'/> <br />
           {elem.login} <br />
           {/* <p>followers: {elem.followers}</p> */}
          <button><a href={elem.html_url} style={{textDecoration:'none'}}>Visit Profile</a></button> 
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;
