import {useEffect} from "react";
import {deleteUser, getUser, updateUser} from "../../helper/fetch";
import {useDispatch, useSelector} from "react-redux";
import {listUsers} from "../../store/slices/listUserSlice";



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
                        <th> Crée le</th>
                        <th>Statut</th>
                        <th>Changer de Statut</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.listUsers.user.map((e, i) => {
                        const id = e._id
                        function handleDeleteClick() {
                            deleteUser(id)
                                .then((res) => {
                                    console.log(res)
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
                                    alert(res.message)
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

                        return (
                            <tr key={i}>
                                <td>{e.pseudo}</td>
                                <td>{e.email}</td>
                                <td>{e.createdAt}</td>
                                <td>{e.isAdmin ? "Admin" : "Pas Admin"}</td>
                                <td>
                                    <button
                                        onClick={handleupdateClick}>{e.isAdmin ? "Enlever statut Admin" : "Passer Admin"}</button>
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