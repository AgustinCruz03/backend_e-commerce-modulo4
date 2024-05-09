import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm"
import {v4 as uuid} from 'uuid'
import { Product } from "./products.entity"

@Entity({
    name:"categories"
})
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({ length:50, nullable:false, unique:true})
    name:string

    @OneToMany(() => Product, (product)=>product.category)
    @JoinColumn()
    product: Product[]
}