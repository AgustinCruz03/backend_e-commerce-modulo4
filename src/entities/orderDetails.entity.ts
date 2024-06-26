import {Entity, PrimaryGeneratedColumn, Column,OneToOne, ManyToMany, JoinColumn} from "typeorm"
import {v4 as uuid} from 'uuid'
import { Order } from "./orders.entity"
import { Product } from "./products.entity"


@Entity({
    name:"ordersDetails"
})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order

    @ManyToMany(()=> Product, (product)=> product.orderDetails)
    products: Product[]

}

