import { generalfield } from "../../middleware/validtion.js"

export const addReportVal=joi.object({
    percentage:generalfield.name.required()
    , TumorFound:generalfield.name.required()
})