import { uploadData } from "aws-amplify/storage";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState();
  const [message, setMessage] = useState("");


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    let response = null
    try {
      if (file !== undefined) {
        response = uploadData({
          path: `picture-submissions/${file}`,
          data: file,
        })
      }
      console.log(response);
      setMessage("Upload successfully!!!")
    } catch (error) {
      console.error();
      setMessage("Upload failed!!!")
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
