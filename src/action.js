//import register from "../registerServiceWorker";

export const fetchProjectlist = () => {
    return fetch('http://127.0.0.1:8000/getprojectlist', {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}

export const fetchSuitelist = (projectId) => {
    return fetch('http://127.0.0.1:8000/getsuitelist?projectId=' + projectId, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}

export const fetchGetSuiteDetail = (suiteId) => {
    return fetch('http://127.0.0.1:8000/getsuitedetail?suiteId=' + suiteId, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}

export const fetchGetCaseDetail = (caseId) => {
    return fetch('http://127.0.0.1:8000/getcasedetail?caseId=' + caseId, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}

export const fetchCaselist = (suiteId,index) => {
    return fetch('http://127.0.0.1:8000/getcaselist?suiteId=' + suiteId+'&index='+index, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}

export const fetchAddProject = (projectdata) => {
    return fetch('http://127.0.0.1:8000/addproject', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(projectdata)
    })
}

export const fetchAddSuite = (suitedata) => {
    return fetch('http://127.0.0.1:8000/addsuite', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(suitedata)
    })
}


export const fetchAddCase = (casedata) => {
    return fetch('http://127.0.0.1:8000/addcase', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(casedata)
    })
}

export const fetchUpdateSuite = (suitedata) => {
    return fetch('http://127.0.0.1:8000/updatesuite', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(suitedata)
    })
}

export const fetchUpdateCase = (casedata) => {
    return fetch('http://127.0.0.1:8000/updatecase', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(casedata)
    })
}

export const fetchDelSuite = (suiteId) => {
    return fetch('http://127.0.0.1:8000/delsuite', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(suiteId)
    })
}

export const fetchDelCase = (caseId) => {
    return fetch('http://127.0.0.1:8000/delcase', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(caseId)
    })
}

export const fetchRunSuite = (suiteData) => {
    return fetch('http://127.0.0.1:8000/runsuite', {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(suiteData)
    })
}

export const fetchGetReporstList = (index) => {
    return fetch('http://127.0.0.1:8000/getreportslist?index='+index, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json'
        },
    }).then((res) => {
        return res.json()
    })
}