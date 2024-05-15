import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/Dtos/CreateOrder.dto';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(order: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: order.userId },
    });
    if (!user) throw new NotFoundException("User no encontrado")
    const newOrder = new Order();
    newOrder.user = user;
    newOrder.date = new Date();
    const newOrderInDB = await this.orderRepository.save(newOrder);

    const products = [];
    let total = 0;
    const listaDeProductosEnDB = await this.productRepository.find();
    order.products.forEach((product) => {

      const productoBuscado = listaDeProductosEnDB.find(
        (productEnDB) => productEnDB.id === product.id
      );

      if (productoBuscado) {
        if(productoBuscado.stock === 0){
          throw new BadRequestException("El producto tiene stock insuficiente")
        }
        productoBuscado.stock -= 1;
        
        total += Number(productoBuscado.price);
        this.descontarStock(productoBuscado);
        for(const pro of products){
          if(productoBuscado.id === pro.id) throw new BadRequestException("No se puede mandar dos veces el mismo producto")
        }
        products.push(productoBuscado);
      }
    });
    
    const detalleDeCompra = new OrderDetails();
    detalleDeCompra.order = newOrderInDB;
    
    detalleDeCompra.price = total;
    detalleDeCompra.products = [...products];
    const detalleDeCompraInDb = await this.orderDetailsRepository.save(detalleDeCompra);

    return {
      ordenDecompra: newOrderInDB,
      PrecioTotal: detalleDeCompraInDb.price,
      IdDetalleDeCompra: detalleDeCompraInDb.id,
    };
  }

  async descontarStock(producto:Product) {
    await this.productRepository.save(producto);
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      
    });
    if(!order)throw new NotFoundException("Order no encontrada")
    const orderDetail = await this.orderDetailsRepository.findOne({where:{order}, relations:{products:true}})

    return {order, orderDetail};
  }
}
