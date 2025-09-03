

const xlsx=require("xlsx");
const User=require("../models/User");
const Income=require("../models/Income");



//add income source user
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{

        const {icon,source,amount,date}=req.body;

        //validation:Check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
};

//get income sources of user
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        console.error("Error fetching income sources:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//delete income source of user
exports.deleteIncome = async (req, res) => {
  
    try{
        await Income.findByIdAndDelete({_id:req.params.id,userId});
        res.json({ message: "Income deleted successfully" });
    }catch(error){
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    // Validate and process the income deletion
    res.status(200).json({ message: "Income deleted successfully" });
};


//download income sources as excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId=req.user.id
    
    try{
        const income=await Income.find({userId}).sort({date:-1});
        //prepare data for excel
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date,
        }));
        
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "IncomeDetails.xlsx");
        res.download("IncomeDetails.xlsx");
    }catch(error){
        console.error("Error downloading income Excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};