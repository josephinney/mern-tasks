import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    addTask(e) {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Saved'})
                this.setState({title: '', description: ''})
                this.fetchTasks()
            })
            .catch(err => console.log(err))

        e.preventDefault()
    }


    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks') //Por defecto asume GET
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data})
            })
    }

    deleteTask(id) {
        if(confirm('Are you sure you want to delete?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Deleted'})
                this.fetchTasks()
            })
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    render() {
        return (<div>
            {/* NAVIGATION */}
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/">MERN Stack</a>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.handleChange} name="title" type="text" placeholder="Task Title" value={this.state.title}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea onChange={this.handleChange} name="description" className="materialize-textarea" placeholder="Task Description" value={this.state.description}></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={()=>{this.deleteTask(task._id)}} className="btn light-blue darken-4">DEL</button>
                                                    <button style={{margin: '4px'}} onClick={()=>{this.editTask(task._id)}} className="btn light-blue darken-4">UPD</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            

        </div>)
    }
}

export default App