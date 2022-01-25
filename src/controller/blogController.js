const getAllList=()=>{
    //mock data
    return[ {
        id:1,
        title:"111",
        createTime:"2020-20-20"
    }, {
        id:2,
        title:"221",
        createTime:"2023-20-20"
    }]
}

const updateList=(payload)=>{
    return payload.id+"update succeed"
}

const addList=(payload)=>{
    return payload.title+"add succeed"
}

const deleteList=(id)=>{
    return id+"deleteList succeed"
}

const getListDetail=(id)=>{
    console.log("getListDetail",id);
    return [ {
        id:1,
        title:"111",
        createTime:"2020-20-20"
    }]
}


module.exports={
    getAllList,
    updateList,
    addList,
    deleteList,
    getListDetail
}