const r = {
    _200 : (res, array) =>{
        res.status(200).json(array)
    },
    _500 : (res, array) =>{
        res.status(500).json(array);
    
    },
    _201 : (res, array) =>{
        res.status(201).json(array)
    },
    _400 : (res, array) =>{
        res.status(400).json(array)
    },
    _401 : (res, array) =>{
        res.status(401).json(array)
    },
}
module.exports = {r}