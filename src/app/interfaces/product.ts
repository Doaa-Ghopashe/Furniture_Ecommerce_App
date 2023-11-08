import { Category } from "./category";

export interface Product {
    "name":String,
    "category_Id":String|any,
    "details":String,
    "_id":String,
    
    "price":Number,
    "offer":Number,
    "quantity":Number,

    "colors":String,
    "images":String
}
