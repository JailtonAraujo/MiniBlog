export interface Post {
    uid?:String,
    title:String,
    url:String,
    body:String,
    tags:Array<String>,
    createdBy:String,
    createdAt:Date
}