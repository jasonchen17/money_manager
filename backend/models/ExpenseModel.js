import mongoose from "mongoose";


const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"expense"
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

ExpenseSchema.pre('save', function(next) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase();
    next();
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export {ExpenseModel as Expense}