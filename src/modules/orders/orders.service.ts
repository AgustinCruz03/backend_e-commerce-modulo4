import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "src/Dtos/CreateOrder.dto";

@Injectable()
export class OrdersService{
    constructor(private readonly ordersRepository:OrdersRepository){}
    addOrder(order:CreateOrderDto){
        return this.ordersRepository.addOrder(order)
    }

    getOrder(id:string){
        return this.ordersRepository.getOrder(id)
    }
}