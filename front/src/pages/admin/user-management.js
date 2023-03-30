import {useEffect} from "react";
import {deleteUser, getUser, updateUser} from "../../helper/fetch";
import {useDispatch, useSelector} from "react-redux";
import {listUsers} from "../../store/slices/listUserSlice";
import "../../asset/style/management.scss"
import {toastError, toastSuccess} from "../../components/toast/toast";


export const UserManagement = () => {

    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        getUser()
            .then((res) => {
                dispatch(listUsers(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <main>
            {state.listUsers.user ? (
                <table>
                    <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Statut</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.listUsers.user.map((e, i) => {
                        const id = e._id

                        function handleDeleteClick() {
                            deleteUser(id)
                                .then((res) => {
                                    toastSuccess("utilisateur supprimé")
                                    getUser()
                                        .then((res) => {
                                            dispatch(listUsers(res))
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }

                        function handleupdateClick() {

                            updateUser(id)
                                .then((res) => {
                                    console.log(res)
                                    if (res.message == 'Something went wrong') {
                                        toastError('Something went wrong')
                                    } else {
                                        toastSuccess(res.message)
                                    }
                                    getUser()
                                        .then((res) => {
                                            console.log(res)
                                            dispatch(listUsers(res))
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }

                        return (
                            <tr key={i}>
                                <td>{e.pseudo}</td>
                                <td>{e.email}</td>
                                <td>{e.isAdmin ? "Admin" : "Pas Admin"}</td>
                                <td>
                                    <button
                                        onClick={handleupdateClick}>{e.isAdmin ? "Enlever Admin" : "Passer Admin"}</button>
                                </td>
                                <td>
                                    <button onClick={handleDeleteClick}>supprimer</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            ) : (
                <div>aucun utilisateur existant</div>
            )}
        </main>
    )
}