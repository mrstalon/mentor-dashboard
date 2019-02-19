import React from 'react';
import { connect } from 'react-redux';
import './mentor-table.scss';

import MentorTableRow from './components/mentor-table-row';


class MentorTable extends React.Component {

  render() {
    const { mentor } = this.props;

    if (!mentor) {
      return null;
    }

    const columnsCount = mentor.tasksInfo[0].studentsTaskInfo.length;
    const tdStyles = {
      width: `${85 / columnsCount}%`
    }

    return (
      <div className="table100 ver1 m-b-110">
        <div className="table100-head">
          <table>
            <thead>
              <tr className="row100 head">
                <th className="cell100" style={tdStyles}></th>
                {mentor.tasksInfo[0].studentsTaskInfo.map((studentObj, id) => {
                  return (
                    <th style={tdStyles} key={id}>
                      <a href={`https://github.com/${studentObj.github}`} target="_blank">
                        {studentObj.github}
                      </a>
                    </th>
                  )
                })}
              </tr>
            </thead>
          </table>
        </div>

        <div className="table100-body js-pscroll">
          <table>
            <tbody>
            {mentor.tasksInfo.map((task, id) => {
              if (!task) {
                return null;
              }
              return <MentorTableRow key={id} task={task} />
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mentors: state.mentors,
  mentor: state.choosedMentor,
})

export default connect(mapStateToProps)(MentorTable);