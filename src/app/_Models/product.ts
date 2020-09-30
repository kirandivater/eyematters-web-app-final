export class Product {
    _id: Object
    ClientId: Object
    CategoryId: Object
    SubCategoryId: Object
    SellerId: Object
    ProductVerientsId: Object
    ProductVerientsValueId: Object
    BrandId: Object
    Color: String
    Name: String
    Description: String
    Cost: Number
    Discount: Number
    DiscountCost: Number
    TotalCount: Number
    TotalSaleCount: Number
    Image: String
    Count: Number
    TotalAmt: Number
    UpdatedDate: Date = new Date()
    UserCreateDate: Date = new Date()
    DeleteAddStatus: String = "A"
}
