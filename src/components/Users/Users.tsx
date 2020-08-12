import React, {useEffect} from "react";
import Paginator from "../commons/Paginator/Paginator";
import User from "./User";
import {Field, Form, Formik} from "formik";
import {FilterType, getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCounts,
    getUsersFilter,
    getUsersState
} from "../../redux/users-selectors";

type PropsType = {}


export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCounts = useSelector(getTotalUsersCounts)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersState)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const unFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const follow = (userId: number) => {
        dispatch(unFollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCounts={totalUsersCounts} pageSize={pageSize} />
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={followingInProgress}
                              follow={follow}
                              unFollow={unFollow}/>

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

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}