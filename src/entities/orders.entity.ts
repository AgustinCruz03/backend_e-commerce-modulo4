import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {v4 as uuid} from 'uuid'
import { User } from "./users.entity"

@Entity({
    name:"orders"
})
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @Column()
    date:Date
    
}

