import { FeedPostEntity } from "src/feed/models/post.entity";
import { FeedPost } from "src/feed/models/post.interface";

export interface UserDetails {
    id?:number;
    username?:string;
    email?:string;
    password?:string;
    age?:number;
    posts?: FeedPost[];
    
}