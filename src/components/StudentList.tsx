import React from 'react';
import axios from 'axios';

interface Student {
    id: number;
    name: string;
    age: number;
}

interface StudentListProps {
    reloadList: boolean;
}

interface StudentListState {
    students: Student[];
}

export default class StudentList extends React.Component<StudentListProps, StudentListState> {
    state: StudentListState = {
        students: []
    };

    url = "http://localhost:8080/";

    componentDidMount() {
        this.fetchStudentList();
    }

    componentDidUpdate(prevProps: StudentListProps) {
        if (this.props.reloadList !== prevProps.reloadList) {
            this.fetchStudentList();
        }
    }

    fetchStudentList = () => {
        axios.get(this.url).then((res) => {
           console.log(res);
            const students = res.data as Student[];
            this.setState({ students });
        });
    };

    render() {
        return (
            <div className="container text-center mt-3">
                <table className="table table-primary">
                    <thead>
                    <tr>
                        <th colSpan={4} className="h3 text text-danger bg-warning">STUDENT LIST</th>
                    </tr>
                    <tr>
                        <th className="h5 text text-success">Student Id</th>
                        <th>Student Name</th>
                        <th>Student Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}