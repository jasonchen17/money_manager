import mongoose from "mongoose";


const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxLength: 20,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

IncomeSchema.pre('save', function(next) {
    this.title = this.title.toUpperCase();
    next();
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

export {IncomeModel as Income}