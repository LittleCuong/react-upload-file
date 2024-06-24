import { useState } from 'react';
import { uploadData } from "aws-amplify/storage";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState("");


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
    
  };

  const handleUpload = () => {
    let response = null
    try {
      if (file !== undefined) {
        response = uploadData({
          path: `picture-submissions/${file.name}`,
          data: file,
        })
      }
      handleGetTrigger()
      console.log(response);
      setMessage("Upload successfully!!!")
    } catch (error) {
      console.error();
      setMessage("Upload failed!!!")
    }
  }

  const handleGetTrigger = async() => {
    let response = null
    try {
      response = await axios.get("https://k7pw3ppez0.execute-api.ap-southeast-1.amazonaws.com/firstState/uploadTriggerDemo")
      console.log(response);    
    } catch (error) {
      console.error();
    }
  }

  return ( 
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>Choose file</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          <p>{message}</p>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://next-release-dev.d1ywzrxfkb9wgg.amplifyapp.com/react/start/quickstart/vite-react-app/#step-2-add-delete-to-do-functionality">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
