import React, {  useState } from 'react'

/***** Component *****/
import Message from './components/Message'

/***** Material-ui  *****/
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'

/***** CSS *****/
import './App.css';

function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  console.log(input)
  console.log(messages)

  const sendMessage = (event) => {
    event.preventDefault();
    // all the logic to send a message
    setMessages([...messages, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Facebook Messenger Clone</h1>

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
          <Message key={index} text={message} />
        ))
      }
    </div>
  );
}

export default App;
