import {Dispatch} from "redux";
import { connect } from 'react-redux';
import {ICombinedReducers} from "../../reducers/reducers";
import {ListPage, ListPageDP, ListPageSP} from "./list.page";
import {addUser, fetchUsers, updateUser, UAction, deleteUser} from "../../actions/user.actions";

function mapStateToProps(reducers: ICombinedReducers): ListPageSP {
    return {
        items: reducers.user.users,
        loading: reducers.user.loading,
        error: reducers.user.error
    }
}
function mapDispatchToProps(dispatch: Dispatch<UAction>): ListPageDP {
    return {
        fetchUsers: ()=>{
            fetchUsers(dispatch)
                .then(dispatch);
        },
        addUser: (name: string, email: string, dob: string, gender: string)=>{
            addUser(name, email, dob, gender)
                .then(dispatch)
        },
        updateUser: (id: string, name: string, email: string, dob: string, gender: string)=>{
            updateUser(id, name, email, dob, gender)
                .then(dispatch)
        },
        deleteUser: (id: string)=>{
            deleteUser(id)
            .then(dispatch)
        }
    }
}

export const ListContainer = connect(mapStateToProps, mapDispatchToProps)(ListPage);


