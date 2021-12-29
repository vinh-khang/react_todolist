import React, { Component } from "react";

class TaskItem extends Component {
  onDelete=()=>{
    
    this.props.Delete(this.props.task.id);
  }
  render() {
    return (
     
      <tr>
      <td>{this.props.index +1}</td>
      <td>{this.props.task.name}</td>
      <td className="text-center">
          <span className={this.props.task.status? 'label label-success':'label label-danger'}>
          {this.props.task.status ? 'Kích hoạt':'Ẩn'}
                  </span>
      </td>
      <td className="text-center">
          <button type="button" className="btn btn-warning">
              <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
              <span className="fa fa-trash mr-5" ></span>Xóa
          </button>
      </td>
  </tr>
                                
    );
  }
}


export default TaskItem;