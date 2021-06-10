const { check,body,validationResult}=require('express-validator')
const userValidationRules=()=>{
    return[
        body('customer.email').isEmail().withMessage('Email is not valid.'),
        body('customer.firstname').exists().withMessage('firstname is required.'),
        body('customer.lastname').exists().withMessage('lastname is required.'),
        body('password').isLength({
            min: 5
        }).withMessage('Password should have minimum 5 characters'),
        body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/).withMessage('Password must atleast have one specialcharacter, one alphabet and a number')
    ]
}

const validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErros=[]
    errors.array().map(err=>extractedErros.push({[err.param]:err.msg}))
    return res.status(400).json({
        success:false,
        errors:extractedErros
        
    })
}
module.exports={
    userValidationRules,
    validate
}