import React, {  useEffect, useState } from 'react'

/***** Firebase *****/
import db from './firebase';
import firebase from 'firebase'

/***** Component *****/
import Message from './components/Message'

/***** Material-ui  *****/
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'

/***** Flip-Move *****/
import FlipMove from 'react-flip-move'

/***** CSS *****/
import './App.css';


function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('');

  useEffect(() => {
     db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
     })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please Enter Your Name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
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

      <FlipMove>
        {
          messages.map(({data}) => (
            <Message
              username={username}
              message={data}
            />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
