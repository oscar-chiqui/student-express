let express = require('express')
let db = require('../models')

let Student = db.Student

let router = express.Router ()

// Sort the student table by present and then by StarID

router.get('/students', function(req, res, next){
    Student.findAll({order: ['present','starID']}).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})

router.post('/students', function(req, res, next){
    Student.create( req.body ).then( data => {
        return res.status(201).send('ok')
    }).catch(err => {  // catch error as examples same starID
        
        // StarID or name
        if (err instanceof db.Sequelize.ValidationError){
            // respond with 400 Bad Request error code
            let messages = err.errors.map ( e => e.message)
            return res.status(400).json(messages)
        }

        // 500 error as server.js 

        return next(err)
    })
})

// Edit students
router.patch('/students/:id', function(req, res, next) {

    // Student ID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent , {where:{id: studentID }})
    .then( (rowsModified) => {
        let numberOfRowsModified = rowsModified[0]
        
        if (numberOfRowsModified == 1 ) {
            return res.send('ok')           // Modifying a student to a have a no name.
        }

        else {
            return res.status(404).json(['Student with that id not found'])
        }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.delete('/students/:id', function(req, res, next ){
    let studentID = req.params.id
    Student.destroy( { where: { id: studentID }})
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1){
                return res.send('ok')
            } else {
                return res.status(404).json(['Not found'])
            }
        })
        .catch ( err => next(err)) // unexpected errors
})
module.exports = router