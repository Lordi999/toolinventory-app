import { Type } from "../enum/type.enum";

export interface XTool{
    id: number
    name: String
    type: Type
    serialnumber: String
    purchaseDate: Date
    warranty: number
    notes: String
    imageUrl: String
}