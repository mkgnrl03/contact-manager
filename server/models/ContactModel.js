const dbConnect = require("../config/db.config");

class ContactModel {
    constructor(){
       this.db_init();
       this.table = 'contacts';
    }

    // @desc General query function
    // @params sql_query = string, prepared_statement = array
    // @return any
    async query(sql_query, prepared_statement){
        const [result, fields] =  await this.conn.execute(
            sql_query,
            prepared_statement
        );
        return result;
    }

    // @desc initialize database connection
    // @param none
    // @return void
    async db_init(){
        this.conn = dbConnect;
    }

    // @desc Get all contacts
    // @param none
    // @return any
     async getContacts(){
       const [result, fields] =  await this.conn.query( `SELECT * FROM ${this.table}`);
       return result;
     }

     // @desc Get a single contact
     // @param id = number
     // @return any
     async getContact(id){
        const [result, fields] =  await this.conn.execute(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result;
     }

    // @desc Create a new contact
    // @params Object
    // @return any
    async createContact(fields){
            let column = '';
            let values = [];
            let prepared = ''; 
          
            // to replace data coming from params
            Object.entries(fields)
                    .forEach((value, index, array) => {
                        column += (index < (array.length - 1)) ? `${value[0]}, ` : `${value[0]}`;
                        prepared += (index < (array.length - 1)) ? `?, ` : `?`;
                        values.push(`${value[1]}`) ; });
            

            const [result] =  await this.conn.execute(
                    `INSERT INTO ${this.table} (${column}) VALUES (${prepared})`,
                    values);
            const res_id = result.insertId;
            return this.getContact(res_id);
    }


     // @desc Get a single contact
     // @param id = number
     // @return boolean
    async update(id, data){
        
        // Data Transformations
        let setValues = '';
        let prepared_statement = [];
        Object.entries(data).forEach((value, index, array) => {
            setValues += (index < (array.length - 1)) ? `${value[0]} = ?, ` : `${value[0]} = ?`;
            prepared_statement.push(value[1]);
        })
        prepared_statement.push(id);

        console.log(prepared_statement)

        const [result, fields] =  await this.conn.execute(
            `UPDATE ${this.table} SET ${setValues} WHERE id = ?`,
            prepared_statement
        )

        console.log(result);
    }


     // @desc Get a single contact
     // @param id = number
     // @return boolean
     async delete(id){
            const contact = await this.getContact(id);
            if(contact.length === 0){
                return false
            }

            const [result, fields] = await this.conn.execute(
                `DELETE FROM ${this.table} WHERE id = ? LIMIT 1`,
                [id]
            );
           return result;
     }


}

module.exports = ContactModel;