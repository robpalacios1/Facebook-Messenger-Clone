import React, {  useEffect, useState } from 'react'

/***** Firebase *****/
import db from './firebase';
import firebase from 'firebase'

/***** Component *****/
import Message from './components/Message'

/***** Material-ui  *****/
import { FormControl, Input } from '@material-ui/core'
import { IconButton } from '@material-ui/core'

/***** Icons *****/
import SendIcon from '@material-ui/icons/Send'

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
        setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
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
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt=""/>
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome: {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a mesage..."
            value={input}
            onChange={event => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message
              key={id}
              username={username}
              message={message}
            />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
