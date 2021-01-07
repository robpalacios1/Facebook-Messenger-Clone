import React, {  useEffect, useState } from 'react'

/***** Component *****/
import Message from './components/Message'

/***** Material-ui  *****/
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'

/***** CSS *****/
import './App.css';


function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {username: 'Roberto', text: 'Hello'},
    {username: 'Alicia', text: 'Hi, how are you?'}
  ])
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please Enter Your Name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, text: input}]);
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
            username={message.username}
            text={message.text}
          />
        ))
      }
    </div>
  );
}

export default App;
