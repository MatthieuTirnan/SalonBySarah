function findToken() {

    const token = localStorage.getItem("jwt")
    if (token) {
        return token;
    } else {
        return ""
    }
}

const token = findToken()

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

export async function postPrestation(addGenre, addprestation, addprice) {
    let url = new Request("http://localhost:9010/admin/create-prestation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            genre: addGenre,
            prestation: addprestation,
            price: addprice
        }),
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getArticle() {
    let url = new Request("http://localhost:9010/show-article", {
        method: "GET",
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function postArticle(formData) {
    let url = new Request("http://localhost:9010/admin/add-Article", {
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

export async function putArticle(formData) {
    let url = new Request("http://localhost:9010/admin/update-article", {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function deleteArticle(id) {
    let url = new Request("http://localhost:9010/admin/delete-article", {
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

export async function postMessageUser(formData) {
    let url = new Request("http://localhost:9010/add-message", {
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

export async function getUserMessage() {
    let url = new Request("http://localhost:9010/list-user-message", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${findToken()}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    return res;
}

export async function getlistUser() {
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

export async function getInboxAdmin() {
    console.log(token)
    let url = new Request("http://localhost:9010/admin/list-inbox", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${findToken()}`
        },
    });
    let response = await fetch(url);
    let res = await response.json();
    console.log(res)
    return res;
}

export async function postAnswerMessage(formData) {
    let url = new Request("http://localhost:9010/admin/create-answer-message", {
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

export async function deleteMessage(id) {
    let url = new Request("http://localhost:9010/delete-message", {
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
