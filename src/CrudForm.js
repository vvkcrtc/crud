import React from 'react';



class CrudForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      idMess: 0,
      textMess: '',
      messages: [],
    }
  
    this.messageChange = this.messageChange.bind(this)
    this.addButtonOnClick = this.addButtonOnClick.bind(this)    
    this.refreshButtonOnClick = this.refreshButtonOnClick.bind(this)
    this.addNote = this.addNote.bind(this)
    this.loadNotes = this.loadNotes.bind(this)
    this.delete = this.delete.bind(this);
    this.loadNotes();
  }
  
  messageChange(event) {
    this.setState({ textMess: event.target.value })
  }

  addButtonOnClick(event) {
    this.addNote();
  }

  refreshButtonOnClick(event) {
    this.loadNotes();
  }
//github.com/larchanka/netology_example_lifecycle
  
  handleSubmit(event) {
    event.preventDefault();
  }

  loadNotes() {
    this.setState({ messages: [] })
    fetch(process.env.REACT_APP_NOTES_URL)
      .then(response => response.json())
      .then(data => { 
        this.setState({ messages: data })
      })
  };
  
  delete(value) {
    let messages = this.state.messages.slice();  
    messages.splice(messages.indexOf(value), 1);
    this.setState({messages});  
    fetch(process.env.REACT_APP_NOTES_URL+"/"+value.id, { method: 'DELETE' })
    .then(() => console.log('Delete successful, id :',value.id));
  }

  async addNote() { 
    let response = await fetch(process.env.REACT_APP_NOTES_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({content: this.state.textMess})
    });
    console.log("response:",response)
    this.loadNotes();
    this.setState({textMess : ''});
  }
  
  outNotes() {
    let arr = this.state.messages.map(el=> 
      <div className="shopcard" key={el.id}>  
        <div className="messtext">     
          <p>{el.content}</p> 
        </div>   
        <div className="messbtn">
          <button onClick={this.delete.bind(this, el)}>Удалить</button>
        </div>
      </div>       
    );
    return(
      <div>
        {arr}
      </div>
    )
  }
    

  render() {
    return (
      <div>
        <form className="mainform"  onSubmit={this.handleSubmit}>
          <div className="refreshbtn">
            <button onClick={this.refreshButtonOnClick}>Обновить</button>
          </div>
          <textarea className="txtarea" type="text"  value={this.state.textMess} 
          onChange={this.messageChange}  />
          <div className="messbtn">
            <button onClick={this.addButtonOnClick} value="Добавить" >Добавить</button>
          </div>
        </form>
        <div>
          {this.outNotes()}
        </div>
      </div>
    )
  }
}
  
export default CrudForm;
