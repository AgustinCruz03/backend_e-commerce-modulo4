import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm"
import {v4 as uuid} from 'uuid'
import { Order } from "./orders.entity"
@Entity({
    name:"users"
})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({ length: 50, nullable: false })
    name: string

    @Column({length:50,unique:true,nullable:false})
    email:string

    @Column({nullable:false, length:150})
    password: string

    @Column({type:"integer"})
    phone: number

    @Column({length:50})
    country: string

    @Column({type:"varchar"})
    address: string

    @Column({length:50})
    city: string

    @Column({default:false})
    isAdmin:boolean

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn()
    orders: Order[]
}