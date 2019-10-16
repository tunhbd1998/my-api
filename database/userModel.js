const conn = require('./connection');

const findOne = async conditions => {
    const result = {
        err: null,
        data: null
    }

    console.log('conditions', conditions);
    await conn('user')
        .where(conditions)
        .select()
        .then(users => users.length > 0 && (result.data = Object.assign({}, users[0])));

    return result;
}

const addNew = async dataObj => {
    const result = {
        err: null,
        data: null
    }

    await conn('user')
        .insert(dataObj)
        .then(res => result.err = null)
        .catch(err => result.err = err);

    return result;
}

module.exports = {
    findOne,
    addNew
}