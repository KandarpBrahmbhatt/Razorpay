import Course from "../models/course.model.js"

export const createCourse = async (req, res) => {
    try {
        const { title, price } = req.body
        console.log(req.body)
        if (!title || !price) {
            return res.status(400).json({ message: "all field are required" })
        }

        let existingcourse = await Course.findOne({title})

        if (existingcourse) {
            return res.status(400).json({message:"couse already exist crete new course"})
        }
        const course = await Course.create({
            title,
            price
        })

        return res.status(200).json({ message: "course created successfully", course })
    } catch (error) {
        console.log(`create course error ${error}`)
        return res.status(500).json({ message: "create course error", error })
    }
}