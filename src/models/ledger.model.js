const { default: mongoose } = require("mongoose")
const moongose=require("mongoose")

const ledgerSchema =new moongose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"legder must be associated with an  account"],
        index:true,
        immutable:true,
    },
    amount:{
        type:Number,
        required:[true,"amount is requred for creating a ledger entry"],
        immutable:true
    },
    transaction:{
        typr:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"legder must be associated with an  account"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"],
            message:"type can be either CREDIT or DEBIT",
        },
        required:[true, "Ledger type is required"],
        immutable:true
    }
})

function preventLedgerModification(){
    throw new error("Ledger entries are immutable and can not modified")
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);




const legdermodel=mongoose.model("ledger",ledgerSchema);


module.exports=legdermodel;