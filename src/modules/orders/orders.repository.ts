import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.orderRepository.save(newOrder);

    const products = [];
    let total = 0;
    const listaDeProductosEnDB = await this.productRepository.find();
    order.products.forEach((product) => {

      const productoBuscado = listaDeProductosEnDB.find(
        (productEnDB) => productEnDB.id === product.id && productEnDB.stock > 0,
      );

      if (productoBuscado) {
        productoBuscado.stock -= 1;
        
        total += Number(productoBuscado.price);
        this.descontarStock(productoBuscado);
        products.push(productoBuscado);
      }
    });
    
    const detalleDeCompra = new OrderDetails();
    detalleDeCompra.order = newOrder;
    
    detalleDeCompra.price = total;
    detalleDeCompra.products = [...products];
    await this.orderDetailsRepository.save(detalleDeCompra);

    return {
      ordenDecompra: newOrder,
      PrecioTotal: detalleDeCompra.price,
      IdDetalleDeCompra: detalleDeCompra.id,
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
