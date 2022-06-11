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

  addNote() { 
    var newId = 0;
    this.state.messages.forEach(el =>  { if(el.id > newId) newId = el.id } );    
    newId = newId + 1;
    console.log("Add id:",newId)
    this.state.messages.push({id: newId , content: this.state.textMess});
    this.setState({textMess : ''});
    fetch(process.env.REACT_APP_NOTES_URL, { 
      method: 'POST', 
         
      body:  {
          "id": newId,
          "content": this.state.textMess,
      }
        
    })
    .then(() => console.log('Post successful'));
  
  }
  
  outNotes() {
    let arr = this.state.messages.map(el=> 
      <div key={el.id}>       
        <p>{el.content}</p>    
        <button onClick={this.delete.bind(this, el)}>Del</button>
      </div>       
    );

//     console.log("Arr : ",arr) 
    return(
      <div>
        {arr}
      </div>
    )
  }
    

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button onClick={this.refreshButtonOnClick}>Обновить</button>
        <textarea type="text"  value={this.state.textMess} 
          onChange={this.messageChange}  />
        <button onClick={this.addButtonOnClick} value="Добавить" >Добавить</button>
        <div>
          {this.outNotes()}
        </div>
      </form>
  
    )
  }
}
  
export default CrudForm;
