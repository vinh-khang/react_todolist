import React, { Component } from "react";
class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name : '',
            status : false
        }
    }
    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
      
    }

    onCloseForm=()=>{
        this.props.closeForm();
    }

    onSubmit=(event)=>{
        event.preventDefault();
        
        this.props.Nop(this.state);
        this.props.closeForm();
        
        
    }

    render() {
    return (
        <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">Thêm Công Việc <span className="fa fa-times-circle" style={{float: 'right', cursor: 'pointer'}} onClick={this.props.closeForm}></span></h3>
        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" className="form-control" required="required" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning" name="them" >Thêm</button>&nbsp;
                    <button type="reset" className="btn btn-danger" name="huy">Hủy Bỏ</button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}


export default TaskForm;