import React from 'react';
import cx from 'classnames';


class MentorTableRow extends React.Component {
  render() {
    const { task } = this.props;
    const columnsCount = task.studentsTaskInfo.length;
    const tdStyles = {
      'width': `${85/columnsCount}%`,
    }

    return (
      <tr>
        <td style={tdStyles}>{task.name}</td>
        {task.studentsTaskInfo.map((studentTaskInfo, id) => {
          const tdClass = cx({
            'done-task': studentTaskInfo.score,
            'todo-task': studentTaskInfo.status.toLowerCase() === 'in progress',
            'undone-task': studentTaskInfo.status.toLowerCase() === 'checked' && !studentTaskInfo.score,
            'needed-check-task': studentTaskInfo.status.toLowerCase() === 'checking',
            'in-development-task': studentTaskInfo.status.toLowerCase() === 'todo'
          });
          return <td style={tdStyles} className={tdClass} key={id}>{studentTaskInfo.score || 0}</td>
        })}
      </tr>
    )
  }
}

export default MentorTableRow;