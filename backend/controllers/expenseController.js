

const xlsx=require("xlsx");
const User=require("../models/User");
const Expense=require("../models/Expense");

//add expense for user
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{

        const {icon,category,amount,date}=req.body;

        //validation:Check for missing fields
        if(!category|| !amount || !date){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
};

//get expense sources of user
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error("Error fetching income sources:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//delete expense of user
exports.deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete({_id:req.params.id,userId});
        res.json({ message: "Expense deleted successfully" });
    }catch(error){
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    // Validate and process the expense deletion
    res.status(200).json({ message: "Expense deleted successfully" });
};


//download expense sources as excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId=req.user.id
    
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        //prepare data for excel
        const data=expense.map((item)=>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date,
        }));
        
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "ExpenseDetails.xlsx");
        res.download("ExpenseDetails.xlsx");
    }catch(error){
        console.error("Error downloading expense Excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};