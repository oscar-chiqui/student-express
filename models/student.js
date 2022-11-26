module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z]{2}\d{4}[a-z]{2}$/  // Validation for StartID to ensure they follow ab1234cd pattern //
            }
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // force specifies whether to drop the table or not.

    Student.sync( {force: false}).then( () => {
        console.log('Synced student table')
    })

    return Student
}

