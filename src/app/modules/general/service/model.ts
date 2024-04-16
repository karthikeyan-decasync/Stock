
export interface User 
{
address_1: string
address_2: string
admission_no : string
amount : number
contact_no : string
createdAt : Date
date_of_joining : Date
final_pay_month : Date
id : number
index_no : number
login_count : number
name_of_user: string
occupation: string
parent_name_minor: string
password: string
plan_type: string
reciept_no: string
role_of_user: string
status:number
updatedAt:Date
user_name:string
}




export interface Book_list {
  id: number;
  cat_id: number;
  book_name: string;
  book_name_mal: string;
  book_author_name: string;
  book_category: Bookcategory;
}

interface Bookcategory {
  id: number;
  category_name: string;
  category_name_mal: string;
  cat_code: string;
  createdAt: string;
  updatedAt: string;
}












