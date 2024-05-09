import {Entity, PrimaryGeneratedColumn,JoinTable ,Column, ManyToOne,ManyToMany} from "typeorm"
import {v4 as uuid} from 'uuid'
import { Category } from "./categories.entity"
import { OrderDetails } from "./orderDetails.entity"

@Entity({
    name:"products"
})
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string

    @Column({nullable:false})
    description: string

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number

    @Column({type:"int", nullable:false})
    stock: number

    @Column({type:"varchar", default:"https://upload.wikimedia.org/wikipedia/commons/6/64/Ejemplo.png"})
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.product)
    category: Category

    // Relación N:N con orderDetails.
    @ManyToMany(()=> OrderDetails, (orderDetail) => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetails[]
}

// @ManyToMany(() => Category)
// @JoinTable()
// categories: Category[]