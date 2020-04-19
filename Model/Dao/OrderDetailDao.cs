using Model.EF;

namespace Model.Dao
{
    public class OrderDetailDao
    {
        private OnlineShopDbContext db = null;

        public OrderDetailDao()
        {
            db = new OnlineShopDbContext();
        }

        public bool Insert(OrderDetail detail)
        {
            try
            {
                db.OrderDetails.Add(detail);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}