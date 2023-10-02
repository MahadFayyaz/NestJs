import { UserDetailsEntity } from "src/user/entities/user.entity";
import { UserDetails } from "src/user/entities/user.interface";

export interface FeedPost {
    id?:number;
    body?:string;
    createdAt?:Date;
    createdBy?: UserDetailsEntity;
}