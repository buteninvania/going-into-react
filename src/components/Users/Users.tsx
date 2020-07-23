import React from "react";
import Paginator from "../commons/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../Types/types";
import {Field, Form, Formik} from "formik";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
    onPageChanged: (pageNumber: number) => void,
    currentPage: number,
    totalUsersCounts: number,
    pageSize: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    follow: (userId:number) => void,
    unFollow: (userId:number) => void
    onFilterChanged: (filter: FilterType) => void
}


const Users: React.FC<PropsType> = ({onPageChanged, currentPage, totalUsersCounts, pageSize, users, ...props}) => {

    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCounts={totalUsersCounts} pageSize={pageSize} />
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={props.followingInProgress}
                              follow={props.follow}
                              unFollow={props.unFollow}/>

        )}
    </div>
}

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = (props) => {
    const submit = (values: FilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Blue unFollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Users;

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}