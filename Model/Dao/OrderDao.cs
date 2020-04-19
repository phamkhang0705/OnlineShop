using Model.EF;

namespace Model.Dao
{
    public class OrderDao
    {
        private OnlineShopDbContext db = null;

        public OrderDao()
        {
            db = new OnlineShopDbContext();
        }

        public long Insert(Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            return order.ID;
        }
    }
}