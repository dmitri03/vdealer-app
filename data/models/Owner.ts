import mongoose, { Schema, Document } from "mongoose";

export interface IOwner extends Document{
    name: String,
    email:String,
    vehicles:mongoose.Types.ObjectId[]; 
}

const OwnerSchema: Schema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    vehicles:[
        {
        type: Schema.Types.ObjectId,
        ref: "Vehicle"
    }
    ]
}   
);

export default mongoose.models.Owner ||
mongoose.model<IOwner>("Owner",OwnerSchema);





