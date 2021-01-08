import React, {  useEffect, useState } from 'react'
import db from './firebase';
import firebase from 'firebase'

/***** Component *****/
import Message from './components/Message'

/***** Material-ui  *****/
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'

/***** CSS *****/
import './App.css';


function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('');

  useEffect(() => {
     db.collection("messages").onSnapshot(snapshot => {
       setMessages(snapshot.docs.map(doc => doc.data()))
     })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please Enter Your Name'))
  }, [])

  console.log(messages)

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome: {username}</h2>

      <form>
        <FormControl>
          <InputLabel>Enter a mesage...</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}>Send Message
          </Button>
        </FormControl>
      </form>

      {
        messages.map((message, index) => (
          <Message
            key={index}
            username={username}
            message={message}
          />
        ))
      }
    </div>
  );
}

export default App;
