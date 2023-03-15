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

export async function getPrestation() {
    let url = new Request("http://localhost:9010/prestation", {
        method: "GET",

    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function deletePrestation(id) {
    let url = new Request("http://localhost:9010/admin/delete-prestation", {
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

export async function updatePrestation(currentPrestation) {
    let url = new Request("http://localhost:9010/admin/update-prestation", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id: currentPrestation._id,
            genre: currentPrestation.genre,
            prestation: currentPrestation.prestation,
            price: currentPrestation.price
        })

    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function postImageGalerie(formData) {

    let url = new Request("http://localhost:9010/admin/add-image-galerie", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData

    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function deleteImage(id) {
    let url = new Request("http://localhost:9010/admin/delete-image-galerie", {
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