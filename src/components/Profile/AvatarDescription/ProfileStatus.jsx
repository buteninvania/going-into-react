import React from "react";
import p from "./avatarDescription.module.css";


class ProfileStatus extends React.Component {
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

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })

    }


    componentDidUpdate(prevProps, prevState) {
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