import React, { Component } from "react";
import TaskForm  from "./components/TaskForm";
import Control  from "./components/Control";
import TaskList  from "./components/TaskList";
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            Task : [],
            isDisplayForm: true,
            EditValue: null,
            filter: {
                name: '',
                status: -1
            }
        }
    }
    onData=()=>{
        var Tasks = [
            {
                id: 1,
                name: 'Học Av kìa',
                status: true
            },
            {
                id: 2,
                name: 'Ăn',
                status: true
            },
            {
                id: 3,
                name: 'Ngủ á',
                status: false
            }

        ];

        this.setState({
            Task: Tasks
        });

        localStorage.setItem('Task', JSON.stringify(Tasks));

    }

    componentDidMount(){
        if(localStorage && localStorage.getItem('Task')){
            var Task = JSON.parse(localStorage.getItem('Task'));
            this.setState({
                Task: Task
            });
        }
    }

    openForm=()=>{
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    closeForm=()=>{
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }
   
    onSubmit=(data)=>{
        data.id = 4;
        this.state.Task.push(data);
        this.setState({
            Task: this.state.Task
        });

        localStorage.setItem('Task', JSON.stringify(this.state.Task));

    }

    findIndex=(id)=>{
        var { Task} = this.state;
        var result = -1;
        
        Task.forEach((Task, index)=>{
            
            if(Task.id === id){
                result = index;
                console.log(result);
            }
          

        });
        return result;
        
    }

    onDelete=(id)=>{
        var { Task} = this.state;
        var index = this.findIndex(id);
        
        if(index !== -1){
            Task.splice(index, 1);
            this.setState({
                Task: Task
            });
        
            localStorage.setItem('Task', JSON.stringify(this.state.Task));    
        }
  
    }

    onEdit=(id)=>{
        var { Task} = this.state;
        var index = this.findIndex(id);
        this.openForm();
        var EditValue = Task[index];
        console.log(EditValue);
        this.setState({
            Task: EditValue
        });
    }

    onFilter=(filterName, filterStatus)=>{
        this.setState({
            filter:{
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });

        
    }

  render() {
    var { Task, isDisplayForm , filter}= this.state;
    var elmForm = isDisplayForm ? <TaskForm closeForm={this.closeForm} Nop={this.onSubmit}  /> : '';
    
    if(filter){
        if(filter.name){
            Task = Task.filter((Tasks)=>{
                return Tasks.name.toLowerCase().indexOf(filter.name)!== -1;
            });
        }
            Task = Task.filter((Tasks)=>{
                if(filter.status === -1){
                    return Tasks;
                }else{
                    return Tasks.status=== false;
                }
             });
        
    }

    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
               { elmForm }
            </div>
            <div className={isDisplayForm? "col-xs-8 col-sm-8 col-md-8 col-lg-8": "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" className="btn btn-primary" style={{margin: '10px'}} onClick={this.openForm}>
                    <span className="fa fa-plus mr-5" ></span> Thêm Công Việc
                </button>
                <button
                type="button"
                className="btn btn-danger"
                onClick={this.onData}>
                Data
                </button>
                <br/><br/>
               <Control></Control>
               <br/>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList Tasks={Task} Delete={this.onDelete} Edit={this.onEdit} onFilter={this.onFilter}></TaskList>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}


export default App