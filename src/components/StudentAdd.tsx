import React from 'react';
import axios from 'axios';

interface StudentAddProps {
    reloadStudentList: () => void;
}

interface StudentAddState {
    name: string;
    age: string;
}

export default class StudentAdd extends React.Component<StudentAddProps, StudentAddState> {
    state: StudentAddState = {
        name: '',
        age: ''
    };

    url = "http://localhost:8080/";

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.id]: event.target.value
        } as Pick<StudentAddState, keyof StudentAddState>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.currentTarget.reset();
        this.setState({
            name: '',
            age: ''
        });

        const student = {
            name: this.state.name,
            age: parseInt(this.state.age)
        };

        axios.post(this.url + 'add', student)
            .then(res => {
                console.log(res);
                this.props.reloadStudentList();
            });
    };

    render() {
        return (
            <div className="container text-center mt-3 mb-5">
                <h3 className="bg-warning text-primary p-2">ADD NEW STUDENT</h3>
                <form className="form card p-3 bg-light" onSubmit={this.handleSubmit}>
                    <label className="form-label h5 text-success">Student Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        minLength={3}
                        maxLength={20}
                        required
                        onChange={this.handleChange}
                    />

                    <label className="form-label h5 text-success">Student Age</label>
                    <input
                        className="form-control"
                        type="number"
                        id="age"
                        min={18}
                        max={25}
                        required
                        onChange={this.handleChange}
                    />

                    <div className="text-center">
                        <button className="btn btn-primary mt-3 col-md-3" type="submit">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}