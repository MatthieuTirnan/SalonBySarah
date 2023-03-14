const findToken = () => {

    const token = localStorage.getItem("jwt")
    if (token) {
        return token;
    } else {
        return ""
    }
}

export const token = findToken()

export async function postLogin(email, password) {
    let url = new Request("http://localhost:9010/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function postRegister(pseudo, email, password) {
    let url = new Request("http://localhost:9010/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            pseudo,
            email,
            password
        }),
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getAuth() {
    let url = new Request("http://localhost:9010/userprovider", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getAminUser() {
    let url = new Request("http://localhost:9010/list-user-admin", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getGalerie() {
    let url = new Request("http://localhost:9010/galerie", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getUser() {
    let url = new Request("http://localhost:9010/admin/list-user", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function deleteUser(id) {
    let url = new Request("http://localhost:9010/admin/delete-user", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})

    });
    let response = await fetch(url);
    let res = await response;
    return res;
}

export async function updateUser(id) {
    let url = new Request("http://localhost:9010/admin/putAdmin-user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})

    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}