import React, {ChangeEvent} from "react";
import p from "./avatarDescription.module.css";

type PropsType = {
    updateStatus: (newStatus:string) => void
    status: string
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        });

    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }
    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }
    render() {
        console.log("render");
        return (
            <div >
                {!this.state.editMode &&
                <div>
                    <span className={p.statusUser} onDoubleClick={this.activateEditMode}>{this.props.status || "no status..."}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                           value={this.state.status}/>
                </div>}
            </div>
        )
    }
}
export default ProfileStatus;