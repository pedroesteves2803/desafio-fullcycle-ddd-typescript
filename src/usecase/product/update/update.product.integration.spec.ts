import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from '../create/create.product.usecase';
import inputUpdateProductUseCase from './upadate.product.usecase';
import updateProductUseCase from './upadate.product.usecase';
import Product from '../../../domain/product/entity/product';

describe("Test update product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should update product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new updateProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product 1 Updated",
            price: 200,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });

})