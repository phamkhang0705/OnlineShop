using Model.EF;
using System.Linq;

namespace Model.Dao
{
    public class FooterDao
    {
        private OnlineShopDbContext db = null;

        public FooterDao()
        {
            db = new OnlineShopDbContext();
        }

        public Footer GetFooter()
        {
            return db.Footers.SingleOrDefault(x => x.Status == true);
        }
    }
}