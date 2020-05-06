import * as React from "react";
import "./list.css"
import { User } from "../../domains/user";

export interface ListPageSP {
    items: User[],
    loading: boolean,
    error: string
}
export interface ListPageDP {
    fetchUsers: () => void,
    addUser: (name: string, email: string, dob: string, gender: string) => void
    updateUser: (id: string, name: string, email: string, dob: string, gender: string) => void
    deleteUser: (id: string) => void
}
interface Props extends ListPageDP, ListPageSP { }

interface State {
    id: string,
    name: string,
    email: string,
    dob: string,
    gender: string,
    showRandomUser: boolean,
    showAddUser: boolean
}
export class ListPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            dob: "",
            gender: "male",
            showRandomUser: false,
            showAddUser: false
        };
        this.props.fetchUsers();
        localStorage.removeItem('randomitems');
    }

    changeName(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    changeEmail(event: any) {
        this.setState({
            email: event.target.value
        })
    }

    changeDob(event: any) {
        this.setState({
            dob: event.target.value
        })
    }

    changeGender(event: any) {
        this.setState({
            gender: event.target.value
        })
    }

    showAddUser(event: any) {
        this.setState({
            showAddUser: true
        })
    }

    showRandomUser(event: any) {
        this.setState({
            showRandomUser: true
        })
    }

    addUser() {
        const { id, name, email, dob, gender } = this.state;
        if (!name || !email || !dob || !gender) {
            alert("please fill some data!");
        }
        else {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)) {
                alert('Please enter valid email');
                return
            }
            if(id) {
                this.props.updateUser(id, name, email, dob, gender);
            }
            else {
                this.props.addUser(name, email, dob, gender);
            }
            
            this.setState({
                id: "",
                name: "",
                email: "",
                dob: "",
                gender: "male",
                showAddUser: false,
                showRandomUser: false
            })
        }
        let that = this;
        setTimeout(function() {
            that.props.fetchUsers();
        }, 500);
    }

    goToUser(id: string) {
        const selectedUser = this.props.items.filter((rec) => rec.id === id)[0];
        this.setState({
            id: selectedUser.id,
            name: selectedUser.name,
            email: selectedUser.email,
            dob: selectedUser.dob,
            gender: selectedUser.gender,
            showAddUser: true,
            showRandomUser: false
        })
    }

    goToDeleteUser(id: string) {
        this.props.deleteUser(id);
        let idx = -1;
        this.props.items.forEach((rec:User, i:number) => {
            if(rec.id == id) {
                idx = i;
            }
        });

        if(idx != -1) {
            this.props.items.splice(idx, 1);
        }
        let that = this;
        setTimeout(function() {
            that.props.fetchUsers();
        }, 500);
    }

    showAddUserE(event: any) {
        this.setState({
            id: "",
            name: "",
            email: "",
            dob: "",
            gender: "male",
            showAddUser: true,
            showRandomUser: false
        })
    }

    showrandomUser(event: any) {
        var allitems = JSON.parse(JSON.stringify(this.props.items));
        var ritems = [];
        ritems = JSON.parse(localStorage.getItem('randomitems'));
        
        if(ritems && ritems.length !== 0) {
            if(ritems.length == allitems.length) {
                ritems = [];
            }
            ritems.forEach((id: string) => {
                let idx = -1;
                allitems.forEach((rec:User, i:number) => {
                    if(rec.id == id) {
                        idx = i;
                    }
                });
    
                if(idx != -1) {
                    allitems.splice(idx, 1);
                }
            })
        }
        
        var item = allitems[Math.floor(Math.random() * allitems.length)];
        if(!ritems) {
            ritems = [];
        }
        ritems.push(item.id);

        localStorage.setItem('randomitems', JSON.stringify(ritems));
        this.setState({
            name: item.name,
            email: item.email,
            dob: item.dob,
            gender: item.gender,
            showAddUser: false,
            showRandomUser: true
        })
    }

    render() {
        const show = !this.props.loading && !this.props.error;
        var conditionView;
        if(this.state.showAddUser) {
            conditionView = <div className="width-400">
            {this.state.id == '' ? 'Add': 'Update'} User:
            <div className="form-group">Name: <input className="form-control" type="text" value={this.state.name} onChange={this.changeName.bind(this)} /></div>
            <div className="form-group">Email: <input className="form-control" type="text" value={this.state.email} onChange={this.changeEmail.bind(this)} /></div>
            <div className="form-group">DOB: <input className="form-control" type="date" value={this.state.dob} onChange={this.changeDob.bind(this)} /></div>
            <div className="form-group">Gender: <select className="form-control" value={this.state.gender} onChange={this.changeGender.bind(this)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select></div>
            <button className="btn btn-success" onClick={this.addUser.bind(this)}>{this.state.id == '' ? 'Add': 'Update'}</button>
        </div>;
        }
        if(this.state.showRandomUser) {
            conditionView = <div>
            <div>Name: {this.state.name}</div>
            <div>Email: {this.state.email}</div>
            <div>DOB: {this.state.dob}</div>
            <div>Gender: {this.state.gender}</div>
        </div>
        }
        return (
            <div className="list-page">
                {this.props.loading && <div>Loading...</div>}
                {this.props.error && <div>{this.props.error}</div>}
                {show &&
                    <React.Fragment>
                        <div className="navbar">
                            <div className="float-right">
                                <button type="button" className="btn btn-primary" onClick={this.showrandomUser.bind(this)}>Show Random User</button> 
                                <button type="button" className="btn btn-primary" onClick={this.showAddUserE.bind(this)}>Add User</button>
                            </div>
                        </div>
                        <div className="m-20">
                            {conditionView}
                        </div>
                        <div className="text-center"><h2>All Users</h2></div>
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.items.map((item: User, i: number) => {
                                    return <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td><button onClick={() => this.goToUser(item.id)} className="btn btn-success"><i className="fa fa-edit"></i></button> <button onClick={() => this.goToDeleteUser(item.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                })}
                            </tbody>
                            </table>
                                
                    </React.Fragment>

                }
            </div>
        );
    }

}