const asyncHandler = require("express-async-handler");
const dbConnect = require("../config/db.config");
const ContactModel = require("../models/ContactModel");

const contact = new ContactModel();

// @desc Get all contacts
// @route GET /api/contacts
// @access public 
const getAllContacts = asyncHandler(async (req, res) => {

    try{
        const result = await contact.getContacts();

        if(result.length > 0){
            res.json({result})
        } else {
            res.json({message: "No resource found."})
        }
        
       

    } catch(e){
        console.log(e);
        process.exit(1);
    }

 
})

// @desc Get a single contact
// @route GET /api/contacts/:id
// @access public 
const getSingleContact = asyncHandler(async (req, res) => {

    try {

        const id = req.params.id;
        const result = await contact.getContact(id);


        if(result.length > 0){
            res.json({result})
        } else {
            res.json({message: "No resource found."})
        }
        

    }catch(e){
        console.log(e);
        process.exit(1);
    }
 
})

// @desc Create a New contact
// @route POST /api/contacts
// @access public 
const createContact = asyncHandler( async (req, res) => {

    const {name, email, phone, country, country_code} = req.body;

    if(!name || !email || !phone || !country){
        res.status(400);
        throw new Error("All Fields are required");
    }

    try{
        const result = await contact.createContact(req.body);
  
    }catch(e){
        console.log(e.message())
    }
       
})

// @desc Update Contents of contact
// @route PUT /api/contacts/:id
// @access public 
const updateContact = asyncHandler( async (req, res) => {

    const id = req.params.id;
    const data = Object.entries(req.body);
    const fromDatabase = await contact.getContact(id);

    let toUpdateValues = {};

    data.forEach((val) => {
        let fromBodyValue = val[1];
        let fromDBValue = fromDatabase[0][val[0]];

        if(fromBodyValue !== fromDBValue ){
            toUpdateValues[val[0]] = val[1];
        }
    })

    if(Object.keys(toUpdateValues).length === 0){
        res.status(400).json({
            message: "All Fields are the same"
        })
       return 
    } 

    await contact.update(id, toUpdateValues); 
    // last kay able to implement checks if fields kay dli na i update kay same ra ug values
    
   // to implement ugma kay tiwas sa update Contact

})

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public 
const deleteContact = asyncHandler( async(req, res) => {
    const id = req.params.id;

    const result = await contact.delete(id);

    if(!result){
        res.status(404).json({
            status: "Not Found",
            message: `Resource Not Found.`
        })
    } else {
        res.status(202).json({
            status: "OK",
            message: `Contact with id: ${id}, deleted successfully.`
        })
    }
})


const contactController = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
}
module.exports = contactController